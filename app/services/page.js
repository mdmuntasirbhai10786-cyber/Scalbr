'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Sparkles, Film, Mic, Megaphone, Code2, Layers, Briefcase, Check, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { openCal } from '@/components/cal-init'

/* ---------- SHARED NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0A0A0A]/70 border-b border-white/[0.06]'
          : 'bg-[#0A0A0A]/40 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display font-black text-xl tracking-tight">
          SCALBR<span className="text-indigo-400">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="/services" className="text-white transition">Services</a>
          <a href="/#industries" className="hover:text-white transition">Industries</a>
          <a href="/#work" className="hover:text-white transition">Our Work</a>
          <a href="/#about" className="hover:text-white transition">About</a>
        </nav>
        <a href="/#contact">
          <Button className="h-10 rounded-full bg-white text-black hover:bg-white/90 font-medium px-5 group">
            Start a Project
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </a>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer id="about" className="border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-display font-black text-2xl">SCALBR<span className="text-indigo-400">.</span></div>
            <p className="text-white/50 text-sm mt-4 max-w-xs">
              Your Content. Our Editing Team. Built for brands and creators that take content seriously.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:col-span-2 md:justify-self-end text-sm">
            <div className="space-y-2">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">Services</div>
              <a href="/services" className="block text-white/70 hover:text-white">Short-form</a>
              <a href="/services" className="block text-white/70 hover:text-white">Long-form</a>
              <a href="/services" className="block text-white/70 hover:text-white">Ad creatives</a>
              <a href="/services" className="block text-white/70 hover:text-white">Motion graphics</a>
            </div>
            <div className="space-y-2">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">Contact</div>
              <a href="/#contact" className="block text-white/70 hover:text-white">Start a project</a>
              <a href="mailto:hello@scalbr.com" className="block text-white/70 hover:text-white">hello@scalbr.com</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} SCALBR. All rights reserved.</span>
          <span>Your Content. Our Editing Team.</span>
        </div>
      </div>
    </footer>
  )
}

/* ---------- SERVICES DATA ---------- */
const detailedServices = [
  {
    id: 'short-form',
    tag: '01',
    title: 'Short-Form Video Editing',
    icon: Sparkles,
    hue: 240,
    what: 'High-retention short-form video, engineered for the way people watch today. Fast cuts, punchy hooks, captions, sound design and pacing tuned for the algorithm.',
    who: 'Personal brands, creators, coaches, founders, and B2B teams building an audience through daily / weekly clips.',
    included: [
      'Hook-first editing structure',
      'Auto-styled captions and callouts',
      'B-roll, zooms, and rhythm cuts',
      'Sound design and music licensing sync',
      'Platform-native aspect ratios (9:16, 1:1, 4:5)',
    ],
    deliverables: ['Instagram Reels', 'YouTube Shorts', 'TikTok clips', 'LinkedIn short video'],
  },
  {
    id: 'long-form',
    tag: '02',
    title: 'Long-Form Video Editing',
    icon: Film,
    hue: 280,
    what: 'Professional long-form editing that keeps viewers watching from the first minute to the last — structured story arcs, tight pacing, and a look that reflects your brand.',
    who: 'YouTubers, educators, founder channels, and businesses investing in owned-audience long-form.',
    included: [
      'Story-driven edit and pacing',
      'Custom motion graphics and lower-thirds',
      'B-roll integration and color grading',
      'Sound mixing, EQ, and mastering',
      'YouTube thumbnails on request',
    ],
    deliverables: ['YouTube long-form', 'Documentary-style videos', 'Educational content', 'Interviews'],
  },
  {
    id: 'podcast',
    tag: '03',
    title: 'Podcast Editing',
    icon: Mic,
    hue: 260,
    what: 'Turn one podcast recording into a full content system — the polished long-form episode plus every clip and asset it can produce.',
    who: 'Podcasters, agencies producing shows for clients, and founders building a personal audio brand.',
    included: [
      'Full episode audio + video edit',
      'Noise reduction, EQ, leveling',
      'Chapters, intro / outro, sponsor drops',
      '5–10 short-form clips per episode',
      'Captions and posting-ready formats',
    ],
    deliverables: ['Full podcast episode (video + audio)', 'Short clips', 'Highlight reels', 'Show notes assets'],
  },
  {
    id: 'ads',
    tag: '04',
    title: 'Ad Creative Production',
    icon: Megaphone,
    hue: 320,
    what: 'High-volume, high-quality creative built to test, iterate, and scale. Multiple variations, hooks, and CTAs so your media buyer always has fresh creative in the pipeline.',
    who: 'DTC brands, e-commerce teams, and performance-marketing agencies buying paid social.',
    included: [
      'Multiple hook variations per concept',
      'UGC assembly and pattern-interrupts',
      'Motion overlays, captions, price tags',
      'Concept iteration based on ad data',
      'Weekly / bi-weekly creative batches',
    ],
    deliverables: ['Meta / TikTok ad creatives', 'UGC ads', 'Product commercials', 'Retargeting variations'],
  },
  {
    id: 'saas',
    tag: '05',
    title: 'SaaS Product Videos',
    icon: Code2,
    hue: 200,
    what: 'Product-led video that makes complex software feel simple. Screen recordings, UI animations, and voiceover-driven walkthroughs that actually convert.',
    who: 'SaaS founders, product marketing teams, and B2B startups launching features or educating users.',
    included: [
      'Screen capture and reshoot',
      'UI zoom, highlight, callout animations',
      'Voiceover coordination and sync',
      'Feature-launch and onboarding video sets',
      'Website-hero looping cuts',
    ],
    deliverables: ['Product demos', 'Feature launch videos', 'Onboarding tutorials', 'Hero-section loops'],
  },
  {
    id: 'motion',
    tag: '06',
    title: 'Motion Graphics',
    icon: Layers,
    hue: 190,
    what: 'Custom motion, typography, and animated explainers that turn abstract ideas into memorable visuals. Built in After Effects, integrated into any edit we deliver.',
    who: 'Startups explaining a concept, finance channels animating data, and brands needing signature visual language.',
    included: [
      'Custom kinetic typography',
      'Animated diagrams and data viz',
      'Logo stings and transitions',
      'UI mockup animation',
      'Explainer video production',
    ],
    deliverables: ['Explainer videos', 'Kinetic typography', 'Animated diagrams', 'Logo animations'],
  },
  {
    id: 'agency',
    tag: '07',
    title: 'White-Label Agency Editing',
    icon: Briefcase,
    hue: 220,
    what: 'A dedicated editing team that lives behind the scenes of your agency. Fast turnaround, consistent quality, and a workflow built to scale without hiring in-house.',
    who: 'Marketing agencies, content agencies, video production shops, and creative studios that need scalable capacity.',
    included: [
      'Dedicated project manager',
      'Client-branded delivery (no SCALBR marks)',
      'Consistent editor pairings across projects',
      'Scalable weekly capacity',
      'Fast-turnaround SLA options',
    ],
    deliverables: ['White-label editing across all formats', 'Multi-client workflows', 'Bulk / retainer capacity'],
  },
]

/* ---------- SECTION ---------- */
function ServiceRow({ s, i }) {
  const Icon = s.icon
  const reverse = i % 2 === 1
  return (
    <section id={s.id} className="relative py-24 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-start ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-white/40">{s.tag}</span>
              <div className="h-px w-8 bg-white/15" />
              <span
                className="h-8 w-8 rounded-md flex items-center justify-center border border-white/10"
                style={{ color: `hsl(${s.hue}, 80%, 70%)`, background: `hsla(${s.hue}, 80%, 50%, 0.06)` }}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-tighter mb-6">
              {s.title}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-8">{s.what}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Who it's for</div>
                <p className="text-sm text-white/70 leading-relaxed">{s.who}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Deliverables</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <span key={d} className="px-2.5 py-1 rounded-md text-[11px] bg-white/[0.04] border border-white/[0.06] text-white/70">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a href="/#contact">
              <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium h-11 px-6 group">
                Start a {s.title.replace(' Editing', '').replace(' Production', '')} project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          </motion.div>

          {/* Included card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0F0F0F] p-8 overflow-hidden">
              <div
                className="absolute -top-32 -right-32 h-64 w-64 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, hsla(${s.hue}, 80%, 55%, 0.18), transparent 60%)` }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Play className="h-3.5 w-3.5 fill-white/70 text-white/70" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50">What's included</span>
                </div>
                <ul className="space-y-3">
                  {s.included.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 border border-white/10"
                        style={{ color: `hsl(${s.hue}, 80%, 70%)`, background: `hsla(${s.hue}, 80%, 50%, 0.08)` }}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-white/80 leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- PAGE ---------- */
function ServicesPage() {
  return (
    <main className="relative bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg radial-fade opacity-70 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(1000px 500px at 50% -10%, rgba(99,102,241,0.18), transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs font-mono text-white/40 mb-6">— SERVICES</div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter max-w-5xl"
          >
            Video Editing Built<br />
            <span className="text-white/40">Around Your Growth.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg text-white/60 max-w-2xl"
          >
            Seven services, one editing team. Every deliverable is designed around the platform, the audience, and the outcome — so you get more of the content that actually moves the needle.
          </motion.p>

          {/* Anchor nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {detailedServices.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3.5 py-2 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white/75 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition"
              >
                {s.title.replace(' Editing', '').replace(' Production', '')}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      {detailedServices.map((s, i) => (
        <ServiceRow key={s.id} s={s} i={i} />
      ))}

      {/* CTA */}
      <section className="relative py-32 border-t border-white/[0.06] overflow-hidden">
        <motion.div
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22), transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter">
            Not sure which service fits?<br />
            <span className="text-white/40">Let's figure it out together.</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            Tell us what you're building. We'll recommend the format, cadence, and workflow that makes sense for your content and your goals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/#contact">
              <Button className="h-12 rounded-full px-7 bg-white text-black hover:bg-white/90 font-medium text-base group">
                Start a Project
                <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </a>
            <Button
              onClick={() => openCal()}
              variant="outline"
              className="h-12 rounded-full px-7 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-white font-medium text-base"
            >
              Book a Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ServicesPage
