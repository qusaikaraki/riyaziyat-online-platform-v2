"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({ locale }: { locale: "tr" | "ar" }) {
  const pathname = usePathname();
  const other = locale === "tr" ? "ar" : "tr";
  const nextPath = pathname.replace(`/${locale}`, `/${other}`);

  return (
    <Link href={nextPath}>
      <Button variant="outline" className="gap-2">
        <Globe className="h-4 w-4" />
        {other.toUpperCase()}
      </Button>
    </Link>
  );
}
