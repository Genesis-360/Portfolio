export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-sm border border-cream/10 bg-cream/[0.03] p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
        Key Takeaways
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-sm leading-relaxed text-cream/70">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
