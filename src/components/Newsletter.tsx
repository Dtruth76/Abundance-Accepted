import { useEffect, useRef } from 'react'

export default function Newsletter() {
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!formContainerRef.current) return
    // Avoid injecting the script twice on re-renders
    if (formContainerRef.current.querySelector('script')) return

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js'
    script.setAttribute('data-beehiiv-form', '19eca144-ba0b-47bc-b23b-830cffa0b377')
    formContainerRef.current.appendChild(script)
  }, [])

  return (
    <section id="newsletter" className="bg-ink-900 text-parchment">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="eyebrow-light">Stay in the loop</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Get early access to BioFit™ and new drops from Deidra
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-parchment/70">
          One email, roughly twice a month. No fads, no spam — just what's working.
        </p>

        <div ref={formContainerRef} className="mx-auto mt-8 max-w-md" />
      </div>
    </section>
  )
}