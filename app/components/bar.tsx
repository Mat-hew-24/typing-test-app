type Barprop = {changeTime: (x:number)=> void,setIsValid: (x:boolean)=>void}

export default function Bar({changeTime,setIsValid}:Barprop){
    
   
    function handleclick(x:number){
        changeTime(x);
        setIsValid(false)
        setTimeout(()=>{
            setIsValid(true);    
        },1000);
        
    }
    
    return (
    <div className="bg-blue-950 flex justify-start gap-4 w-[500px] mt-4 mb-12 rounded-3xl p-2 px-6">
        <button onClick={()=>{handleclick(15)}} className="barbtn">15</button>
        <button onClick={()=>{handleclick(30)}} className="barbtn">30</button>
        <button onClick={()=>{handleclick(60)}} className="barbtn">60</button>
    </div>
    );
}