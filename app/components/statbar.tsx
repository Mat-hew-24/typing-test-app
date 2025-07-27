type Statbarprop = { raw: number; accuracy: number; mode: number; consistency:number };

export default function Statbar({ raw, accuracy, mode,consistency }: Statbarprop) {
  return (
    <div className="text-[var(--text-color)] flex w-270 gap-[240px] pl-10 bg-amber-400 rounded-lg pt-4 pb-4 shadow-lg mt-4">
      <div>
        raw
        <div>{raw.toFixed(0)}</div>
      </div>
      <div>
        accuracy
        <div>{accuracy.toFixed(0)}%</div>
      </div>
      <div>
        mode
        <div>{mode}s</div>
      </div>
      <div>
        consistency
        <div>{consistency.toFixed(0)}%</div>
      </div>
    </div>
  );
}
