type Statbarprop={raw:number,
  accuracy:number,mode:number};

export default function Statbar({raw,accuracy,mode}:Statbarprop) {
  return (
    <div className="bg-amber-400 rounded-lg pt-4 pb-4 shadow-lg mt-4">
      <div className="text-black flex w-270 ml-20 gap-[270px]">
        <div>
            raw
            <div>
                {raw.toFixed(0)}
            </div>
        </div>
        <div>
            accuracy
            <div>
                {accuracy.toFixed(0)}%
            </div>
        </div>
        <div>
            mode
            <div>
                {mode}s
            </div>
        </div>
      </div>
    </div>
  );
}