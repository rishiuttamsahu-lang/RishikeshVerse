"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  className?: string
}

export default function RotatingEarth({ className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d", { alpha: false })
    if (!context) return

    // Core state
    let currentSize = 0
    let landFeatures: any = null
    const allDots: { lng: number; lat: number }[] = []
    const rotation: [number, number] = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5

    const projection = d3.geoOrthographic().clipAngle(90)
    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 24) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) dots.push(point)
        }
      }
      return dots
    }

    const render = () => {
      if (currentSize === 0) return

      context.fillStyle = "#000000"
      context.fillRect(0, 0, currentSize, currentSize)

      const scaleFactor = projection.scale() / (currentSize / 2.2)

      // Ocean Background
      context.beginPath()
      context.arc(currentSize / 2, currentSize / 2, projection.scale(), 0, 2 * Math.PI)
      context.fillStyle = "#000000"
      context.fill()
      
      // Globe Border
      context.strokeStyle = "rgba(158, 0, 255, 0.4)"
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(255, 255, 255, 0.15)"
        context.lineWidth = 0.5 * scaleFactor
        context.stroke()

        // Land Outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => path(feature))
        context.strokeStyle = "rgba(255, 255, 255, 0.3)"
        context.lineWidth = 0.5 * scaleFactor
        context.stroke()

        // Halftone Dots (Optimized with fillRect)
        context.fillStyle = "rgba(255, 255, 255, 0.8)"
        const dotSize = 2.2 * scaleFactor

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 && projected[0] <= currentSize &&
            projected[1] >= 0 && projected[1] <= currentSize
          ) {
            context.fillRect(projected[0] - dotSize/2, projected[1] - dotSize/2, dotSize, dotSize)
          }
        })
      }
    }

    // THIS IS THE FIX: ResizeObserver keeps the canvas strictly 1:1 Square
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return
      
      const { width, height } = entries[0].contentRect
      // Pick the smaller dimension to enforce a perfect square
      const newSize = Math.floor(Math.min(width, height))
      
      if (newSize === 0 || newSize === currentSize) return
      currentSize = newSize
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = currentSize * dpr
      canvas.height = currentSize * dpr
      
      canvas.style.width = `${currentSize}px`
      canvas.style.height = `${currentSize}px`
      
      context.resetTransform()
      context.scale(dpr, dpr)
      
      projection.scale(currentSize / 2.2).translate([currentSize / 2, currentSize / 2])
      render()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
        if (!response.ok) throw new Error("Failed to load data")
        landFeatures = await response.json()
        
        landFeatures.features.forEach((feature: any) => {
          generateDotsInPolygon(feature, 24).forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })
        
        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load map data")
        setIsLoading(false)
      }
    }

    const rotate = () => {
      if (autoRotate && currentSize > 0) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }
    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        rotation[0] = startRotation[0] + (moveEvent.clientX - startX) * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (moveEvent.clientY - startY) * sensitivity))
        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (currentSize === 0) return
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const currentScale = projection.scale()
      const baseRadius = currentSize / 2.2
      projection.scale(Math.max(baseRadius * 0.5, Math.min(baseRadius * 3, currentScale * scaleFactor)))
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel, { passive: false })

    loadWorldData()

    return () => {
      rotationTimer.stop()
      resizeObserver.disconnect()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [])

  if (error) return null

  return (
    // FIX: aspect-square aur mx-auto lagaya hai taaki parent container hamesha square rahe
    <div ref={containerRef} className={`relative flex items-center justify-center w-full aspect-square max-w-[500px] max-h-[500px] mx-auto ${className}`}>
      {isLoading && <div className="absolute text-purple-500 animate-pulse z-10">Loading Earth...</div>}
      
      <canvas
        ref={canvasRef}
        className="rounded-full bg-black cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />
      
      <div className="absolute bottom-2 text-xs text-gray-400 px-3 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}