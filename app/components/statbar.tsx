type Statbarprop = { raw: number; accuracy: number; mode: number; consistency:number };

export default function Statbar({ raw, accuracy, mode,consistency }: Statbarprop) {
  
  let consistencyVal=0;
  if (isNaN(consistency)==false){
    consistencyVal=consistency;
  }
  
  return (
    <div className="text-blue-600 text-2xl flex w-300 text-center justify-center gap-[240px] mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-200 rounded-lg pt-4 pb-4 shadow-lg mt-4">
      <div>
        raw
        <div className = "text-indigo-700 font-semibold">{raw.toFixed(0)}</div>
      </div>
      <div>
        accuracy
        <div className = "text-indigo-700 font-semibold">{accuracy.toFixed(0)}%</div>
      </div>
      <div>
        mode
        <div className = "text-indigo-700 font-semibold">{mode}s</div>
      </div>
      <div>
        consistency
        <div className = "text-indigo-700 font-semibold">{
        consistencyVal.toFixed(0)
        }%</div>
      </div>
    </div>
  );
}
