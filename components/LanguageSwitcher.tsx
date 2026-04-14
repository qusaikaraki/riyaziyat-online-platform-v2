"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher({
  locale,
}: {
  locale: "tr" | "ar";
}) {
  const pathname = usePathname();
  const other = locale === "tr" ? "ar" : "tr";

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && (segments[0] === "tr" || segments[0] === "ar")) {
    segments[0] = other;
  } else {
    segments.unshift(other);
  }

  const nextPath = "/" + segments.join("/");

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => {
        window.location.href = nextPath;
      }}
    >
      <Globe className="h-4 w-4" />
      {other.toUpperCase()}
    </Button>
  );
}