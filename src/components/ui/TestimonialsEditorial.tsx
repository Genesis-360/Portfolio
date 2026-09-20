"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"

const testimonials = [
  {
    id: 1,
    quote: "The attention to detail and creative vision transformed our brand identity completely.",
    author: "Sarah Chen",
    role: "Creative Director",
    company: "Studio Forma",
    image: "/team/siddhartha.avif",
  },
  {
    id: 2,
    quote: "Working with them felt like a true creative partnership from day one.",
    author: "Marcus Webb",
    role: "Head of Design",
    company: "Minimal Co",
    image: "/team/janvi.avif",
  },
  {
    id: 3,
    quote: "They understand that great design is invisible yet unforgettable.",
    author: "Elena Voss",
    role: "Art Director",
    company: "Pixel & Co",
    image: "/team/gunjan.avif",
  },
]

export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Large index number + Quote */}
      <div className="flex items-start gap-6 md:gap-10">
        <span
          className="font-anton text-[80px] md:text-[120px] leading-none text-cream/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-4 md:pt-8">
          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl font-light leading-relaxed text-cream tracking-tight"
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          {/* Author info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-8 md:mt-10 group cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-cream/10 group-hover:ring-accent/50 transition-all duration-300">
                  <Image
                    src={current.image}
                    alt={current.author}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="font-medium text-cream">{current.author}</p>
                  <p className="text-sm text-cream/50">
                    {current.role}
                    <span className="mx-2 text-cream/20">/</span>
                    <span className="group-hover:text-cream transition-colors duration-300">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Line selector */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4">
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-accent"
                      : "w-6 bg-cream/20 group-hover:w-8 group-hover:bg-cream/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-cream/40 tracking-widest uppercase font-mono">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full text-cream/40 hover:text-cream hover:bg-cream/5 transition-all duration-300"
          >
            <PiCaretLeftBold className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full text-cream/40 hover:text-cream hover:bg-cream/5 transition-all duration-300"
          >
            <PiCaretRightBold className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
