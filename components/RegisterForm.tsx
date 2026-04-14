"use client";

import { useState, useTransition } from "react";
import { submitRegistration } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RegisterForm({
  labels
}: {
  labels: {
    studentName: string;
    parentName: string;
    email: string;
    phone: string;
    grade: string;
    preferredLanguage: string;
    notes: string;
    submitRegister: string;
  };
}) {
  const [message, setMessage] = useState<string>("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      action={(formData) => {
        startTransition(async () => {
          const result = await submitRegistration(formData);
          setMessage(result.message);
        });
      }}
    >
      <Input name="studentName" placeholder={labels.studentName} />
      <Input name="parentName" placeholder={labels.parentName} />
      <Input name="email" type="email" placeholder={labels.email} />
      <Input name="phone" placeholder={labels.phone} />
      <Input name="grade" placeholder={labels.grade} />
      <Input name="preferredLanguage" placeholder={labels.preferredLanguage} />
      <div className="md:col-span-2">
        <Textarea name="notes" placeholder={labels.notes} />
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <Button disabled={pending}>{pending ? "..." : labels.submitRegister}</Button>
        {message ? <p className="text-sm text-slate-500">{message}</p> : null}
      </div>
    </form>
  );
}
