'use client';

type Barprop = {changeTime: (x:number)=> void,setIsToggle: (x:boolean)=>void,setTimeVal: (x:number)=>void,setTimeRunner: (x:boolean)=>void}

export default function Bar({changeTime,setIsToggle,setTimeVal,setTimeRunner}:Barprop){
    
   
    function handleclick(x:number){
        changeTime(x);
        setIsToggle(true);
        setTimeVal(x);
        setTimeRunner(false);
        setTimeout(()=>{   
        },250);
    }
    
    return (
    <div className="bg-black flex justify-start gap-4 w-[500px] mt-4 mb-12 rounded-3xl p-2 px-6 shadow-[1px_1px_2px_rgba(0,0,0,1)]">
        <button onClick={()=>{handleclick(15)}} className="barbtn">15</button>
        <button onClick={()=>{handleclick(30)}} className="barbtn">30</button>
        <button onClick={()=>{handleclick(60)}} className="barbtn">60</button>
    </div>
    );
}