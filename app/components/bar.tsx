'use client';
import Image from "next/image";

type Barprop = {changeTime: (x:number)=> void,setIsToggle: (x:boolean)=>void
    ,setTimeVal: (x:number)=>void,setTimeRunner: (x:boolean)=>void,
    setLoader:(x:boolean)=>void,loader:boolean}

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

       {loader && <Image src="https://media.tenor.com/2BLI5EO7yVAAAAAm/loading-image.webp" alt="" width={40} height={40} className="mt-28" />}
        </>
    );
}