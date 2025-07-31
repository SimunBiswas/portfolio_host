"use client"
// Make sure the file exists at ../components/IntroBg.tsx or adjust the path accordingly
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import StickyNav from '../components/Header';
import Carousel from '../components/Carousel';
import IntroBg from '../components/IntroBg';

export default function Home() {
  const [show, setShow] = useState(true);

  useEffect(() =>{
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000); 

    return () => clearTimeout(timer);
  })


  return (
    <div className='relative h-screen w-screen bg-black font-orbitron tracking-wide'>
      <div className="z-500">
        <AnimatePresence>
          {show && <IntroBg />}
        </AnimatePresence>
        
      </div>
      <div className='z-2 p-2 font-orbitron tracking-wide bg-[#fff]'>
        {show ? null : 
         <>
           <StickyNav />
           <div className='width-full my-11 h-full flex justify-center items-center'>
              <Carousel />
           </div>
         </>}
      </div>
      
    </div>
  );
}
