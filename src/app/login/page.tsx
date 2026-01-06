import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion | VetoGo",
  description: "Connexion sécurisée à VetoGo.",
};

export default function LoginPage() {
  return (
    <main className="bg-white">
      <LoginForm />
    </main>
  );
}
