type Resultsprop={accuracy:number}

export default function Results({accuracy}:Resultsprop) {
    
    
    return (
        <div className=" bg-red-400 p-6 mt-3 rounded-lg shadow-lg mr-10">
            <div className="text-black text-2xl m-auto mb-4">wpm
                <div className="text-5xl">
                    56
                </div>
            </div>
            <div className="text-black text-2xl m-auto">acc
                <div className="text-5xl">
                    {accuracy.toFixed(0)}%
                </div>
            </div>
        </div>
    )
}