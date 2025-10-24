"use client";

import FadingFromEdge from "./FadingFromEdge";
import { Introtags } from "../../types";

const IntroBg = () => {
  return (
    <div className="absolute h-full w-screen bg-black">
      <div className="bg-black bg-cover bg-center h-screen w-screen flex justify-center items-center p-7">
        <div className="relative overflow-hidden h-[30%] lg:h-[40%] w-[60%] lg:w-[40%] flex justify-between flex-col gap-2 p-4">
          <div className="justify-start">        
            <FadingFromEdge text={Introtags[0]} animation={-100} delay={0.25}/>
          </div>
          <div className="flex justify-end">
            <FadingFromEdge text={Introtags[1]} animation={200} delay={0.30}/>
          </div>
          <div className="justify-start">        
            <FadingFromEdge text={Introtags[2]} animation={-100} delay={0.45}/>
          </div>

        </div>         
      </div>
     </div>
  )
}

export default IntroBg;
