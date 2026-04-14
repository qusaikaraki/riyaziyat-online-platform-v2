"use client";

import { useState, useTransition } from "react";
import { loginStudent } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({
  labels
}: {
  labels: { email: string; password: string; submitLogin: string };
}) {
  const [message, setMessage] = useState<string>("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        startTransition(async () => {
          const result = await loginStudent(formData);
          setMessage(result.message);
          if (result.success) {
            window.location.href = "/tr/dashboard";
          }
        });
      }}
    >
      <Input name="email" type="email" placeholder={labels.email} />
      <Input name="password" type="password" placeholder={labels.password} />
      <Button disabled={pending} className="w-full">
        {pending ? "..." : labels.submitLogin}
      </Button>
      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
    </form>
  );
}
