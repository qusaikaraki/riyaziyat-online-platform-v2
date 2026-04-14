export function SectionTitle({
  title,
  subtitle,
  align = "left"
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
