'use client'

import Link from 'next/link'

const Button = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href}>
      <div className="relative inline-block w-60 h-12 px-2 overflow-hidden border-[#EC682D] rounded-xl border-2 group cursor-pointer ">
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
