'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  light?: boolean
  className?: string
}

export default function StatCounter({ value, suffix = '', prefix = '', label, description, light = false, className }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const steps = 60; const increment = value / steps; let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setCount(value); clearInterval(timer) } 
      else { setCount(Math.floor(current)) }
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className={cn('text-4xl md:text-5xl font-bold mb-2', light ? 'text-white' : 'text-[#ED1C24]')}>
        {prefix}{count.toLocaleString('fr-FR')}{suffix}
      </div>
      <div className={cn('font-semibold text-lg mb-1', light ? 'text-white' : 'text-[#2D2D2D]')}>{label}</div>
      {description && <p className={cn('text-sm', light ? 'text-white/70' : 'text-gray-500')}>{description}</p>}
    </div>
  )
}
