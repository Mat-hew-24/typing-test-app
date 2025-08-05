type Statbarprop = { raw: number; accuracy: number; mode: number; consistency:number };

export default function Statbar({ raw, accuracy, mode,consistency }: Statbarprop) {
  
  let consistencyVal=0;
  if (isNaN(consistency)==false){
    consistencyVal=consistency;
  }
  
  return (
    <div className="text-[var(--resStatTextColor)] border border-[var(--border-color)] text-2xl flex w-300 text-center justify-center gap-[240px] mx-auto bg-[var(--resStatBoxColor)] rounded-lg pt-4 pb-4 shadow-lg mt-4">
      <div>
        raw
        <div className = "text-[var(--resStatTextColor)] font-semibold">{raw.toFixed(0)}</div>
      </div>
      <div>
        accuracy
        <div className = "text-[var(--resStatTextColor)] font-semibold">{accuracy.toFixed(0)}%</div>
      </div>
      <div>
        mode
        <div className = "text-[var(--resStatTextColor)] font-semibold">{mode}s</div>
      </div>
      <div>
        consistency
        <div className = "text-[var(--resStatTextColor)] font-semibold">{
        consistencyVal.toFixed(0)
        }%</div>
      </div>
    </div>
  );
}
