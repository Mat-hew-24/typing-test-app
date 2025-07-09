const Spinner =<div className="w-12 h-12 m-auto border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>



export default function Loading(){
    return (
        <div className="w-full h-full m-auto pt-75">
            {Spinner}
        </div>
    )
}