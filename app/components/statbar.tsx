type Statbarprop = { raw: number; accuracy: number; mode: number; consistency:number };

export default function Statbar({ raw, accuracy, mode,consistency }: Statbarprop) {
  
  let consistencyVal=0;
  if (isNaN(consistency)==false){
    consistencyVal=consistency;
  }
  
  return (
    <div className="text-[var(--text-color)] text-xl flex w-270 text-center justify-center gap-[240px] mx-auto bg-purple-900 rounded-lg pt-4 pb-4 shadow-lg mt-4">
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
        <div>{
        consistencyVal.toFixed(0)
        }%</div>
      </div>
    </div>
  );
}
