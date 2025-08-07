'use client'

import Link from 'next/link'

const Button = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href}>
      <div className="relative inline-block w-32 h-10 text-sm overflow-hidden border-[#fdfcfc] rounded-3xl border-2 group cursor-pointer tracking-wide "
      style={{
        fontSize: "clamp(0.6rem, 2vw, 0.6rem)", // Responsive font size
      }}
    >
      <span className="absolute inset-0 border-[#EC682D] bg-black text-white flex items-center justify-center font-bold uppercase transition-transform duration-300 group-hover:-translate-y-full ">
        {text}
      </span>

        <span className="absolute inset-0 bg-[#EC682D] text-white flex items-center justify-center font-bold uppercase border-[#EC682D] transition-transform duration-300 translate-y-full group-hover:translate-y-0">
          {text}
        </span>
      </div>
    </Link>
  )
}

export default Button
