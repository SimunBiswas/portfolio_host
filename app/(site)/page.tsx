"use client"
// Make sure the file exists at ../components/IntroBg.tsx or adjust the path accordingly
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import StickyNav from '../components/Header';
import Carousel_1 from '../components/Carousel_1';
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
      <AnimatePresence>
        {show && (
          <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <IntroBg />
          </div>
        )}
      </AnimatePresence>

      <div className='z-2 font-orbitron tracking-wide bg-[#fff]'>
        {show ? null : 
         <>
           <StickyNav />
           <div className='w-screen h-full flex justify-center items-center'>
              <Carousel_1 />
           </div>
         </>}
      </div>
      
    </div>
  );
}
