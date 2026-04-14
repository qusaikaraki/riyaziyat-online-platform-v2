"use client";

import { useTransition } from "react";
import { approveStudent, rejectStudent } from "@/lib/actions";
import { Button } from "@/components/ui/button";

type StudentRow = {
  user_id: string;
  student_name: string;
  parent_name: string;
  phone: string;
  grade: string;
  preferred_language: string;
  status: string;
};

export function AdminReviewTable({ rows }: { rows: StudentRow[] }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3">Öğrenci</th>
            <th className="px-4 py-3">Veli</th>
            <th className="px-4 py-3">Telefon</th>
            <th className="px-4 py-3">Sınıf</th>
            <th className="px-4 py-3">Dil</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.user_id} className="border-t border-slate-100">
              <td className="px-4 py-3">{row.student_name}</td>
              <td className="px-4 py-3">{row.parent_name}</td>
              <td className="px-4 py-3">{row.phone}</td>
              <td className="px-4 py-3">{row.grade}</td>
              <td className="px-4 py-3">{row.preferred_language}</td>
              <td className="px-4 py-3">{row.status}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button
                    disabled={pending}
                    onClick={() =>
                      startTransition(async () => {
                        await approveStudent(row.user_id);
                        window.location.reload();
                      })
                    }
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Onayla
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    onClick={() =>
                      startTransition(async () => {
                        await rejectStudent(row.user_id);
                        window.location.reload();
                      })
                    }
                  >
                    Reddet
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
