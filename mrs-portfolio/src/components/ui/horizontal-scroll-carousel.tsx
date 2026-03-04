"use client"

import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"

interface HorizontalScrollCarouselProps {
  images: string[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  // Adjust the transform range if needed to control scroll speed and distance
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"])

  return (
    <section
      ref={targetRef}
      className="relative h-[200vh] w-full" 
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {images.map((src, index) => (
            <Card
              src={src}
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const Card: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="group relative h-[450px] w-[450px] overflow-hidden rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-8">
      <div className="relative w-full h-full">
         <Image
          src={src}
          fill
          style={{ objectFit: "contain" }}
          alt="Tech stack skill"
        />
      </div>
    </div>
  )
}

export { HorizontalScrollCarousel };
