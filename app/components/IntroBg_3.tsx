import React from "react";
import { motion } from "framer-motion";

export default function RotatingTextCube({
    size = 200,
    duration = 2,
    delay = 1,
}) {
    const half = size / 2;
    const translateZ = half;
    const faceBase = `absolute inset-0 flex items-center justify-center backface-hidden`;

    return (
        <div className="flex items-center justify-center h-screen">
            <div
                className="relative"
                style={{
                    width: size,
                    height: size,
                    perspective: 900,
                }}
            >
                <motion.div
                    className="absolute inset-0 mx-auto my-auto"
                    style={{
                        width: size,
                        height: size,
                        transformStyle: "preserve-3d",
                    }}
                    animate={{ rotateX: [0, 180] }}
                    transition={{
                        repeat: 0,
                        duration,
                        ease: "linear",
                        delay,
                    }}
                >
                    {/* Front face */}
                    <div
                        className={faceBase + " text-xl font-semibold text-white"}
                        style={{
                            transform: `translateZ(${translateZ}px)`,
                        }}
                    >
                        avinash
                    </div>
                    {/* Back face */}
                    <div
                        className={faceBase + " text-xl font-semibold text-white"}
                        style={{
                            transform: `rotateX(180deg) translateZ(${translateZ}px)`,
                        }}
                    >
                        
                    </div>
                    {/* Left face */}
                    <div
                        className={faceBase}
                        style={{
                            transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    />
                    {/* Right face */}
                    <div
                        className={faceBase}
                        style={{
                            transform: `rotateX(90deg) translateZ(${translateZ}px)`,
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    />
                    {/* Top face */}
                    <div
                        className={faceBase}
                        style={{
                            transform: `rotateX(90deg) translateZ(${translateZ}px)`,
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    />
                    {/* Bottom face */}
                    <div
                        className={faceBase}
                        style={{
                            transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
                        }}
                    >masih</div>
                </motion.div>
            </div>
            <style jsx>{`
                .backface-hidden {
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                }
            `}</style>
        </div>
    );
}
