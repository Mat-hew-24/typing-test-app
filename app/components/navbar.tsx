"use client"
import Image from "next/image"



export default function Navbar(){
    
    return (
    <div className="text-black right-0 left-0 flex p-4">
        
            <Image src="/euro.png" width={25} alt="" height={20} className="h-6 mr-4 ml-5"></Image>
            <span className="mr-220">Typemonkey</span>
            
        
            <span className="mr-5">Login</span>
            <span className="mr-5 ml-3">Signup</span>
            <Image src="/euro.png" alt="" width={25} height={20} className="h-6 mr-5 ml-3"></Image>
    </div>
    )
}