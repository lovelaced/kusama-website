"use client"

import { useState, useEffect, useRef } from "react"

export function TerminalOutput() {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const lines = [
    ">> INITIALIZING KUSAMA NETWORK INTERFACE...",
    ">> CONNECTING TO DECENTRALIZED NODES...",
    ">> EXECUTION LAYER ENABLED",
    ">> NODE CLOCK DESYNCED [VARIANCE: 0.0042s]",
    ">> METADATA ENCRYPTED [CIPHER: AES-256]",
    ">> COUNTERSTATE RUNNING",
    ">> CONSENSUS MECHANISM: ACTIVE",
    ">> PARACHAIN SLOTS: 12/100 ACTIVE",
    ">> NETWORK SECURITY: OPTIMAL",
    ">> AWAITING COMMAND INPUT...",
  ]

  useEffect(() => {
    // Blinking cursor effect
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current)
    }
  }, [])

  useEffect(() => {
    // Start typing animation
    let charIndex = 0
    const currentLineText = lines[currentLine] || ""

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (charIndex <= currentLineText.length) {
        setText(currentLineText.substring(0, charIndex))
        charIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)

        // Move to next line after a delay
        setTimeout(() => {
          setText(currentLineText)
          if (currentLine < lines.length - 1) {
            setCurrentLine((prev) => prev + 1)
          }
        }, 500)
      }
    }, 30)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentLine])

  return (
    <div className="font-mono text-xs md:text-sm text-[#ff0066]/90 leading-relaxed">
      {lines.slice(0, currentLine).map((line, index) => (
        <div key={index} className="mb-2">
          {line}
        </div>
      ))}
      <div>
        {text}
        {showCursor && <span className="inline-block w-2 h-4 bg-[#ff0066] ml-0.5 animate-pulse"></span>}
      </div>
    </div>
  )
}
