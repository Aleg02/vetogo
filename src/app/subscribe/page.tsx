import { Suspense } from "react";
import SubscribePageClient from "@/components/SubscribePageClient";

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SubscribePageClient />
    </Suspense>
  );
}
