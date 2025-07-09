'use client';

type Barprop = {changeTime: (x:number)=> void,setIsToggle: (x:boolean)=>void
    ,setTimeVal: (x:number)=>void,setTimeRunner: (x:boolean)=>void,
    setLoader:(x:boolean)=>void,loader:boolean}

const Spinner = <div className="w-12 h-12 m-auto border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>

export default function Bar({changeTime,setIsToggle,setTimeVal,
    setTimeRunner,setLoader,loader}:Barprop){
    
    function handleclick(x:number){
        setLoader(true);
        changeTime(x);
        setIsToggle(true);
        setTimeVal(x);
        setTimeRunner(false); 
        setTimeout(()=>{  
            setLoader(false)
        },500);
    }
    
    return (
        <>
            <div className="bg-black flex justify-start gap-4 w-[500px] mt-4 mb-12 rounded-3xl p-2 px-6 shadow-[1px_1px_2px_rgba(0,0,0,1)]">
                <button onClick={()=>{handleclick(15)}} className="barbtn">15</button>
                <button onClick={()=>{handleclick(30)}} className="barbtn">30</button>
                <button onClick={()=>{handleclick(60)}} className="barbtn">60</button>
            </div>

       {loader &&
        <div className="w-full h-full pt-30">
            {Spinner}
        </div>
       }
        </>
    );
}