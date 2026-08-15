import { useState } from 'react'

interface WeatherParticlesProps {
  conditionMain: string
}

interface ParticleSpec {
  left: number
  delay: number
  duration: number
  length: number
}

function useParticleSpecs(
  count: number,
  minDuration: number,
  maxDuration: number,
  minLength: number,
  maxLength: number,
): ParticleSpec[] {
  const [specs] = useState<ParticleSpec[]>(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * maxDuration,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      length: minLength + Math.random() * (maxLength - minLength),
    })),
  )

  return specs
}

function RainParticles({ heavy }: { heavy: boolean }) {
  const drops = useParticleSpecs(heavy ? 70 : 35, 0.5, 1.1, 40, 90)

  return (
    <div className="weather-particles" aria-hidden="true">
      {drops.map((drop, i) => (
        <span
          key={i}
          className="rain-drop-particle"
          style={{
            left: `${drop.left}%`,
            height: `${drop.length}px`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function SnowParticles() {
  const flakes = useParticleSpecs(45, 6, 12, 4, 7)

  return (
    <div className="weather-particles" aria-hidden="true">
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="snow-flake-particle"
          style={{
            left: `${flake.left}%`,
            width: `${flake.length}px`,
            height: `${flake.length}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function WeatherParticles({ conditionMain }: WeatherParticlesProps) {
  if (conditionMain === 'Rain' || conditionMain === 'Drizzle') {
    return <RainParticles heavy={conditionMain === 'Rain'} />
  }

  if (conditionMain === 'Thunderstorm') {
    return (
      <>
        <RainParticles heavy />
        <div className="lightning-flash" aria-hidden="true" />
      </>
    )
  }

  if (conditionMain === 'Snow') {
    return <SnowParticles />
  }

  return null
}
