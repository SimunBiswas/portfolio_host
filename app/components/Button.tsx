'use client'

import Link from 'next/link'

const Button = ({ text, href }: { text: string; href: string }) => {
  return (
    // <Link href={href}>
    //   <div className="relative inline-block w-32 h-10 text-sm overflow-hidden cursor-pointer tracking-wide "
    //   style={{
    //     fontSize: "clamp(0.6rem, 2vw, 0.6rem)", // Responsive font size
    //   }}
    // >
    //   <div className=' scale-90 rounded-2xl absolute bg-gradient-to-b from-[#FFFFFF] to-[#8D8D8D]'>
    //     <div className="w-30 h-full scale-95 rounded-3xl flex items-center justify-center bg-black">
    //       {text}
    //     </div>
    //   </div>
    //   {/* <span className="absolute inset-0 border-[#EC682D] bg-black text-white flex items-center justify-center font-bold uppercase transition-transform duration-300 ">
    //     {text}
    //   </span> */}

    //     {/* <span className="absolute inset-0 bg-[#EC682D] text-white flex items-center justify-center font-bold uppercase border-[#EC682D] transition-transform duration-300 translate-y-full group-hover:translate-y-0">
    //       {text}
    //     </span> */}
    //   </div>
    // </Link>
    <Link
  href={href}
  className="relative inline-block rounded-xl p-[2px] bg-gradient-to-b from-[#FFFFFF] to-[#8D8D8D]"
>
  <div className="block rounded-xl bg-black px-4 md:px-6 py-1.5 md:py-2">
    <span className="bg-gradient-to-b from-[#FFFFFF] to-[#8D8D8D] 
                   bg-clip-text text-transparent font-semibold 
                   text-[clamp(0.65rem,1.2vw,0.9rem)]">
      {text}
    </span>
  </div>
</Link>

  )
}

export default Button
