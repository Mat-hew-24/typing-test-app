type Statbarprop = { raw: number; accuracy: number; mode: number; consistency:number };

export default function Statbar({ raw, accuracy, mode,consistency }: Statbarprop) {
  
  let consistencyVal=0;
  if (isNaN(consistency)==false){
    consistencyVal=consistency;
  }
  
  return (
    <div className="text-[var(--timer-color)] text-2xl flex w-300 text-center justify-center gap-[240px] mx-auto bg-[var(--box-color)] rounded-lg pt-4 pb-4 shadow-lg mt-4">
      <div>
        raw
        <div className = "text-[var(--result-color)]">{raw.toFixed(0)}</div>
      </div>
      <div>
        accuracy
        <div className = "text-[var(--result-color)]">{accuracy.toFixed(0)}%</div>
      </div>
      <div>
        mode
        <div className = "text-[var(--result-color)]">{mode}s</div>
      </div>
      <div>
        consistency
        <div className = "text-[var(--result-color)]">{
        consistencyVal.toFixed(0)
        }%</div>
      </div>
    </div>
  );
}
