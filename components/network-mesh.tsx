"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export function NetworkMesh() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Create geometry
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

    // Create material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#ff0066") },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vDisplacement;
        
        void main() {
          vUv = uv;
          vec3 newPosition = position;
          float displacement = sin(position.x * 0.3 + time) * 
                              sin(position.y * 0.2 + time) * 
                              sin(position.z * 0.1 + time) * 0.5;
          
          vDisplacement = displacement;
          newPosition += normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        varying float vDisplacement;
        
        void main() {
          float intensity = vDisplacement * 2.0 + 0.5;
          vec3 glowColor = color * intensity;
          float alpha = 0.3 + abs(vDisplacement) * 0.5;
          
          // Add grid effect
          float gridX = mod(vUv.x * 50.0, 1.0);
          float gridY = mod(vUv.y * 50.0, 1.0);
          
          float grid = 0.0;
          if (gridX < 0.05 || gridY < 0.05) {
            grid = 0.2;
          }
          
          gl_FragColor = vec4(glowColor + grid, alpha);
        }
      `,
      transparent: true,
      wireframe: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    camera.position.z = 20

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01
      material.uniforms.time.value = time

      mesh.rotation.x += 0.001
      mesh.rotation.y += 0.002

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
