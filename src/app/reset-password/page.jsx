"use client";
import { ResetPasswordInner } from "@/components/utils/reset-password-inner";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <ResetPasswordInner />
        </Suspense>
    );
}
