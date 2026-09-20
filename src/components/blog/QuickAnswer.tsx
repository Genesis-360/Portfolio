export function QuickAnswer({ answer }: { answer: string }) {
  if (!answer) return null;

  return (
    <div className="border-l-2 border-accent pl-5 py-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">
        Quick Answer
      </p>
      <p className="text-base leading-relaxed text-cream/80 lg:text-lg">
        {answer}
      </p>
    </div>
  );
}
