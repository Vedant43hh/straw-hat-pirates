import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    title: 'Dawn of the Storm',
    description:
      'A silent ocean shivers beneath storm-lit clouds. The horizon feels endless, and every ripple carries the weight of a legend waiting to rise.',
  
  },
  {
    title: 'Execution at Dawn',
    description:
      'A marble platform cuts through golden mist. The crowd holds its breath as a pirate legend stands beneath the first fragile sunrise.',
    cta: 'Feel the Weight',
  },
  {
    title: 'My treasure? If you want it, you can have it!',
    description:
      'The camera draws near. Calm meets storm. His quiet smile is the spark that turns fear into destiny.',
    cta: 'See the Truth',
  },
  {
    title: 'The Fleet Awakens',
    description:
      'A thousand sails blossom across the sea. The age of pirates erupts in motion, light, and the promise of freedom.',
    cta: 'Ride the Wind',
  },
  {
    title: 'Captain of Tomorrow',
    description:
      'The bow becomes a throne. A young captain stands ready, eyes locked on the horizon and a future full of hope.',
    cta: 'Join the Voyage',
  },
  {
    title: 'ONE PIECE',
    description:
      'At the climax of the sequence, the dream is revealed. The sea, the ship, the captain—everything converges into a single promise of legend.',
    cta: 'Embrace the Legend',
  },
]

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const indicatorRef = useRef(null)
  const sceneRefs = useRef([])

  const assignSceneRef = (element, index) => {
    sceneRefs.current[index] = element
  }

  useLayoutEffect(() => {
    if (!heroRef.current) return

    const video = videoRef.current
    let videoDuration = 1
    const proxy = { progress: 0 }

    const context = gsap.context(() => {
      if (video) {
        video.pause()
        video.load()

        const updateDuration = () => {
          if (video.duration && !Number.isNaN(video.duration)) {
            videoDuration = video.duration
          }
          if (video.readyState >= 2) {
            video.currentTime = 0
          }
        }

        video.addEventListener('loadedmetadata', updateDuration)
        video.addEventListener('canplay', updateDuration)
        updateDuration()
      }

      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 960px)',
          isTablet: '(min-width: 640px) and (max-width: 959px)',
          isMobile: '(max-width: 639px)',
        },
        () => {
          const heroHeight = window.innerHeight
          const endValue = `+=${Math.round(heroHeight * 4.4)}`

          const buildTimeline = () => {
            const sceneElements = sceneRefs.current
            if (sceneElements.length !== scenes.length || sceneElements.some((element) => !element)) {
              requestAnimationFrame(buildTimeline)
              return
            }

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: endValue,
                scrub: 0.95,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
                invalidateOnRefresh: true,
              },
              defaults: {
                ease: 'none',
              },
            })

            gsap.set(sceneElements, {
              autoAlpha: 0,
              y: 30,
              filter: 'blur(16px)',
              scale: 0.98,
            })

            timeline.to(
              proxy,
              {
                progress: 1,
                duration: 1,
                onUpdate: () => {
                  if (video && videoDuration > 0) {
                    video.currentTime = Math.min(videoDuration, Math.max(0, proxy.progress * videoDuration))
                  }
                },
              },
              0,
            )

            const fadeInDuration = 0.3
            const fadeOutDuration = 0.22
            const sceneGap = 0.55
            const sceneDuration = fadeInDuration + fadeOutDuration + sceneGap
            const totalSceneDuration = sceneElements.length * sceneDuration

            timeline.to(
              proxy,
              {
                progress: 1,
                duration: totalSceneDuration,
                onUpdate: () => {
                  if (video && videoDuration > 0) {
                    video.currentTime = Math.min(videoDuration, Math.max(0, proxy.progress * videoDuration))
                  }
                },
              },
              0,
            )

            sceneElements.forEach((content, index) => {
              const entrance = index * sceneDuration
              const exit = entrance + fadeInDuration + sceneGap

              timeline.fromTo(
                content,
                {
                  autoAlpha: 0,
                  y: 24,
                  filter: 'blur(16px)',
                  scale: 0.98,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  scale: 1,
                  duration: fadeInDuration,
                  ease: 'power3.out',
                },
                entrance,
              )

              if (index < sceneElements.length - 1) {
                timeline.to(
                  content,
                  {
                    autoAlpha: 0,
                    y: -24,
                    filter: 'blur(12px)',
                    scale: 1.02,
                    duration: fadeOutDuration,
                    ease: 'power3.in',
                  },
                  exit,
                )
              }
            })
          }

          buildTimeline()
        },
      )

      gsap.to(indicatorRef.current, {
        autoAlpha: 0,
        y: 16,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top+=80',
          end: 'top top+=240',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    }, heroRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="One Piece cinematic hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          src="/video/hero.mp4"
          preload="auto"
          playsInline
          muted
          playsinline
          tabIndex={-1}
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__content-inner">
          {scenes.map((scene, index) => (
            <article
              key={scene.title}
              className="hero__scene"
              style={{ zIndex: index + 1 }}
              ref={(element) => assignSceneRef(element, index)}
            >
              <div className="hero__scene-copy">
                <p className="hero__eyebrow">Chapter {index + 1}</p>
                <h1>{scene.title}</h1>
                <p>{scene.description}</p>
                <button type="button" className="hero__button">
                  {scene.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="hero__scroll-indicator" ref={indicatorRef} aria-hidden="true">
        <div className="hero__scroll-label">Scroll to begin</div>
        <div className="hero__mouse">
          <span className="hero__mouse-wheel" />
        </div>
      </div>
    </section>
  )
}
