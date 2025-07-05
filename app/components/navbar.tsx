import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-black z-50 fixed top-0 right-0 left-0 p-4 shadow-2xl flex justify-between">
      <div className="flex gap-5 bg-yellow-200 flex-1 p-2">
        <Image
          src="/euro.png"
          width={25}
          alt=""
          height={20}
          className="h-6"
        ></Image>
        <span>Typemonkey</span>
      </div>
      <div className="flex gap-12 flex-1 p-2 justify-end">
        <span>Login</span>
        <span>Signup</span>
        <Image
          src="/euro.png"
          alt=""
          width={25}
          height={20}
          className="h-6"
        ></Image>
      </div>
    </nav>
  );
}
