"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export type ForgotPasswordState =
    | { status: "idle" }
    | { status: "success"; message: string }
    | { status: "error"; message: string };

export const initialForgotPasswordState: ForgotPasswordState = { status: "idle" };

export async function forgotPasswordAction(
    _prevState: ForgotPasswordState,
    formData: FormData
): Promise<ForgotPasswordState> {
    const email = formData.get("email");

    if (typeof email !== "string" || !email) {
        return { status: "error", message: "Veuillez entrer une adresse email valide." };
    }

    const supabase = await createServerSupabaseClient();
    const origin = (await headers()).get("origin");

    // The redirectTo should point to a route that handles the code exchange
    // and then redirects the user to a page where they can set a new password.
    // For VetoGo, we'll direct them to the callback which should handle session establishment,
    // then we ideally want to go to a profile/password update page.
    // For now, let's redirect to /mon-compte which is protected, so if they click the link they get logged in.
    const redirectTo = `${origin}/auth/callback?next=/mon-compte`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
    });

    if (error) {
        console.error("Forgot Password Error:", error);
        // For security reasons, we might not want to reveal if the email exists or not,
        // but typically Supabase handles rate limits etc.
        // We'll return a generic error or the specific one depending on policy.
        // For better UX let's show the error message for now.
        return { status: "error", message: error.message };
    }

    return {
        status: "success",
        message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
    };
}
