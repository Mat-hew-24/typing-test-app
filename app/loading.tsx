import Image from "next/image"
export default function Loading(){
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Image src="https://media.tenor.com/2BLI5EO7yVAAAAAm/loading-image.webp" alt="" width={40} height={40} />
        </div>
    )
}