import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Section1.css'

gsap.registerPlugin(ScrollTrigger)

const crew = [
  {
    name: 'Monkey D. Luffy',
    role: 'Captain',
    bounty: 320000000,
    fruit: 'Gomu Gomu no Mi',
    color: '#e63946',
    image: '/images/img1.png',
  },
  {
    name: 'Roronoa Zoro',
    role: 'Swordsman',
    bounty: 120000000,
    fruit: 'None',
    color: '#2a9d8f',
    image: '/images/img2.png',
  },
   {
    name: 'Sanji',
    role: 'Cook',
    bounty: 177000000,
    fruit: 'None',
    color: '#ffb703',
    image: '/images/img5.png',
  },

  {
    name: 'Usopp',
    role: 'Sniper',
    bounty: 200000000,
    fruit: 'Kabuto',
    color: '#f4d35e',
    image: '/images/img4.png',
  },
  {
    name: 'Nami',
    role: 'Navigator',
    bounty: 66000000,
    fruit: 'Clima-Tact',
    color: '#f4a261',
    image: '/images/img3.png',
  },
  {
    name: 'Tony Tony Chopper',
    role: 'Doctor',
    bounty: 100,
    fruit: 'Hito Hito no Mi',
    color: '#ef476f',
    image: '/images/img6.png',
  },
  {
    name: 'Nico Robin',
    role: 'Archaeologist',
    bounty: 130000000,
    fruit: 'Hana Hana no Mi',
    color: '#8d99ae',
    image: '/images/img7.png',
  },
  {
    name: 'Franky',
    role: 'Shipwright',
    bounty: 94000000,
    fruit: 'None',
    color: '#4361ee',
    image: '/images/img8.png',
  },
  {
    name: 'Brook',
    role: 'Musician',
    bounty: 83000000,
    fruit: 'Yomi Yomi no Mi',
    color: '#f8f9fa',
    image: '/images/img9.png',
  },
  {
    name: 'Jinbe',
    role: 'Helmsman',
    bounty: 43800000,
    fruit: 'Fish-Man Karate',
    color: '#1d3557',
    image: '/images/img10.png',
  },
]

export default function Section1() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.crew-card')

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 60, scale: 0.96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      },
    )

    cards.forEach((card) => {
      const bountyEl = card.querySelector('[data-bounty]')
      if (!bountyEl) return

      const targetBounty = Number(bountyEl.dataset.bounty)
      const count = { value: 0 }

      gsap.to(count, {
        value: targetBounty,
        duration: 1.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(count, {
              value: targetBounty,
              duration: 1.2,
              ease: 'power1.out',
              onUpdate: () => {
                bountyEl.textContent = `$${Math.floor(count.value).toLocaleString()}`
              },
            })
          },
        },
      })
    })
  }, [])

  return (
    <section className="section1" ref={sectionRef} aria-label="Straw Hat crew showcase">
      <div className="section1__intro">
        <p className="section1__eyebrow">Deck assembled</p>
        <h2>The Straw Hat Crew</h2>
        <p>
          The crew gathers with a cinematic tide. Each member enters with a signature glow, a bounty that counts up, and a hidden detail that reveals their legend.
        </p>
      </div>

      <div className="section1__grid">
        {crew.map((member) => (
          <article className="crew-card" key={member.name} style={{ '--accent': member.color }}>
            <div className="crew-card__inner">
              <h3 className="crew-card__wanted">WANTED</h3>

              <div className="crew-card__photo-frame">
                <img src={member.image} alt={`${member.name} portrait`} className="crew-card__image" />
              </div>

              <p className="crew-card__dead">Dead or Alive</p>
              <h4 className="crew-card__name">{member.name}</h4>

              <div className="crew-card__bounty">
                <span className="crew-card__berry">฿</span>
                <strong data-bounty={member.bounty}>0,000,000,000.-</strong>
              </div>

              <p className="crew-card__finePrint">
                Kono sakuhin ha fiction dethunode jitsuzaisuru jinbutsu dantai
                <br />
                sonota no soshiki to doitsu no meishou ga gekichu ni toujou
                <br />
                shitatoshitemo jitsuzai na monotoha issai mukankeideth
              </p>

              <span className="crew-card__marine">MARINE</span>

              <div className="crew-card__hover-info">
                <span className="crew-card__role-badge">{member.role}</span>
                <p className="crew-card__fruit-label">Devil Fruit</p>
                <strong>{member.fruit}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
