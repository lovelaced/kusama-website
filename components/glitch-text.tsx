"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________"
    let interval: NodeJS.Timeout

    const applyGlitchEffect = () => {
      // Random chance to apply glitch effect
      if (Math.random() < 0.05) {
        const textArray = text.split("")
        const randomIndex = Math.floor(Math.random() * text.length)
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]

        textArray[randomIndex] = randomChar
        setGlitchText(textArray.join(""))

        // Reset after a short delay
        setTimeout(() => {
          setGlitchText(text)
        }, 100)
      }
    }

    interval = setInterval(applyGlitchEffect, 150)

    return () => clearInterval(interval)
  }, [text])

  return (
    <div className={cn("relative", className)}>
      <span className="relative z-10">{glitchText}</span>
      <span className="absolute left-0 top-0 z-0 text-[#ff0066] opacity-50 blur-[2px] transform translate-x-[2px] translate-y-[2px]">
        {glitchText}
      </span>
      <span className="absolute left-0 top-0 z-0 text-[#00ffff] opacity-50 blur-[2px] transform -translate-x-[2px] -translate-y-[2px]">
        {glitchText}
      </span>
    </div>
  )
}
