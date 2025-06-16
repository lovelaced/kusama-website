"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HoverGlowButtonProps {
  children: React.ReactNode
  href: string
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function HoverGlowButton({
  children,
  href,
  className,
  variant = "default",
  size = "default",
}: HoverGlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const variantClasses = {
    default: "bg-[#ff0066] text-black hover:bg-[#ff0066]/90",
    outline: "bg-transparent border border-[#ff0066] text-[#ff0066] hover:bg-[#ff0066]/10 hover:text-white",
  }

  return (
    <div className="relative inline-block">
      {isHovered && <div className="absolute inset-0 bg-[#ff0066] blur-lg opacity-75 rounded-md pointer-events-none" />}
      <Link
        href={href}
        className={cn(
          "relative font-mono font-medium tracking-wider transition-all duration-200 inline-flex items-center justify-center rounded-md",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    </div>
  )
}
