'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Play, Sparkles, Film, Wand2, Megaphone, Layers, ArrowRight, Check, Code2, LineChart, Mic, User, ShoppingBag, Youtube, Briefcase, X, BadgeCheck, Layers3, Users, Workflow, Globe2, TrendingUp, Paperclip, FileVideo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { openCal } from '@/components/cal-init'

/* ---------- NAV ---------- */
function Nav({ onCta }) {
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
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display font-black text-xl tracking-tight">
            SCALBR<span className="text-indigo-400">.</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="/services" className="hover:text-white transition">Services</a>
          <a href="/#industries" className="hover:text-white transition">Industries</a>
          <a href="/#work" className="hover:text-white transition">Our Work</a>
          <a href="/#about" className="hover:text-white transition">About</a>
        </nav>
        <Button
          onClick={onCta}
          className="h-10 rounded-full bg-white text-black hover:bg-white/90 font-medium px-5 group"
        >
          Start a Project
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </header>
  )
}

/* ---------- FLOATING VIDEO FRAMES (Hero visual) ---------- */
function FloatingFrame({ className, delay = 0, label, hue = 240, aspect = 'aspect-video' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={`absolute ${className} ${aspect} rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#161616]`}
      style={{
        boxShadow: `0 20px 80px -20px hsla(${hue}, 90%, 60%, 0.35), inset 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsla(${hue}, 80%, 30%, 0.5), hsla(${hue + 40}, 80%, 15%, 0.7)), radial-gradient(circle at 30% 20%, hsla(${hue}, 90%, 60%, 0.5), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <Play className="h-4 w-4 fill-white text-white ml-0.5" />
        </div>
      </div>
      {/* label */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-medium">
        <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur border border-white/10">{label}</span>
        <span className="px-2 py-1 rounded-md bg-black/40 backdrop-blur border border-white/10 text-white/60">00:24</span>
      </div>
    </motion.div>
  )
}

function EditingTimeline() {
  const tracks = [
    { color: 'bg-indigo-500/70', segments: [[0, 30], [35, 75], [80, 100]] },
    { color: 'bg-fuchsia-500/60', segments: [[10, 45], [55, 90]] },
    { color: 'bg-emerald-500/60', segments: [[5, 20], [25, 60], [70, 95]] },
  ]
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(680px,90%)] rounded-xl border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-xl p-3 shadow-2xl">
      <div className="flex items-center justify-between mb-2 text-[10px] text-white/50 font-mono">
        <span>TIMELINE.SCALBR</span>
        <span>◀ ◼ ▶  01:24 / 03:12</span>
      </div>
      <div className="space-y-1.5">
        {tracks.map((t, i) => (
          <div key={i} className="relative h-4 rounded-md bg-white/[0.03]">
            {t.segments.map(([a, b], j) => (
              <motion.div
                key={j}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.15 + j * 0.1, duration: 0.6 }}
                style={{ left: `${a}%`, width: `${b - a}%`, transformOrigin: 'left' }}
                className={`absolute top-0 bottom-0 rounded ${t.color}`}
              />
            ))}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ left: '10%' }}
        animate={{ left: ['10%', '90%', '10%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute top-8 bottom-2 w-0.5 bg-white/80"
      />
    </div>
  )
}

function Hero({ onCta, onWork }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    try { v.load() } catch {}
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    v.addEventListener('canplay', tryPlay)
    v.addEventListener('loadedmetadata', tryPlay)
    return () => {
      v.removeEventListener('canplay', tryPlay)
      v.removeEventListener('loadedmetadata', tryPlay)
    }
  }, [])
  return (
    <section className="relative min-h-screen w-full overflow-hidden noise">
      {/* Showreel background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src="/showreel.webm" type="video/webm" />
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.78) 55%, #0A0A0A 100%)',
          }}
        />
      </div>

      {/* background grid + spotlight */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-70" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1000px 500px at 50% -10%, rgba(99,102,241,0.18), transparent 70%), radial-gradient(600px 400px at 80% 80%, rgba(217,70,239,0.10), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/70 mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Now taking new projects for Q3
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-black text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.95] tracking-tighter"
            >
              Your Content.<br />
              <span className="text-white/40">Our Editing</span>
              <br />
              <span className="relative inline-block">
                Team.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-400"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 text-lg text-white/60 max-w-xl leading-relaxed"
            >
              SCALBR helps creators, brands, and businesses turn raw footage into high-quality content built to engage audiences and support growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Button
                onClick={onCta}
                className="h-12 rounded-full px-7 bg-white text-black hover:bg-white/90 font-medium text-base group"
              >
                Start a Project
                <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button
                onClick={onWork}
                variant="outline"
                className="h-12 rounded-full px-7 border-white/15 bg-white/[0.02] hover:bg-white/[0.06] text-white font-medium text-base"
              >
                <Play className="mr-2 h-4 w-4 fill-white" />
                View Our Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { k: '2,400+', v: 'Videos edited' },
                { k: '48h', v: 'Avg turnaround' },
                { k: '9+', v: 'Industries served' },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display font-bold text-2xl">{s.k}</div>
                  <div className="text-xs text-white/50 mt-1">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Floating frames */}
          <div className="lg:col-span-6 relative h-[540px] hidden lg:block">
            <FloatingFrame
              className="top-0 left-10 w-[62%]"
              label="REEL — SHORT FORM"
              hue={240}
              delay={0.1}
            />
            <FloatingFrame
              className="top-24 right-0 w-[48%]"
              label="YT — LONG FORM"
              hue={280}
              delay={0.4}
            />
            <FloatingFrame
              className="bottom-24 left-0 w-[46%]"
              label="SAAS DEMO"
              hue={200}
              delay={0.7}
            />
            <FloatingFrame
              className="bottom-32 right-8 w-[44%]"
              label="AD CREATIVE"
              hue={320}
              delay={1}
            />
            <EditingTimeline />
          </div>

          {/* Mobile stripped-down visual */}
          <div className="lg:hidden relative h-[280px] mt-4">
            <FloatingFrame className="top-0 left-4 w-[70%]" label="REEL" hue={240} delay={0.1} />
            <FloatingFrame className="bottom-4 right-4 w-[62%]" label="YT" hue={280} delay={0.3} />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-white/[0.06] py-6 mt-8">
        <div className="flex whitespace-nowrap gap-14 scroll-marquee text-white/30 font-display font-semibold text-lg">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-14 shrink-0">
              <span>SHORT-FORM</span><span>•</span>
              <span>LONG-FORM YOUTUBE</span><span>•</span>
              <span>PODCAST EDITING</span><span>•</span>
              <span>PAID ADS</span><span>•</span>
              <span>MOTION GRAPHICS</span><span>•</span>
              <span>SAAS PRODUCT VIDEO</span><span>•</span>
              <span>WHITE-LABEL EDITING</span><span>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- SERVICES ---------- */
const services = [
  {
    id: 'short',
    tag: '01',
    title: 'Short-Form Content',
    icon: Sparkles,
    hue: 240,
    tags: ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Personal brand'],
    desc: 'High-retention content designed to stop the scroll and keep your audience watching.',
  },
  {
    id: 'long',
    tag: '02',
    title: 'Long-Form Content',
    icon: Film,
    hue: 280,
    tags: ['YouTube', 'Podcasts', 'Interviews', 'Education'],
    desc: 'Professional long-form editing that keeps viewers engaged from the first minute to the last.',
  },
  {
    id: 'ads',
    tag: '03',
    title: 'Ad Creatives',
    icon: Megaphone,
    hue: 320,
    tags: ['Facebook Ads', 'Instagram Ads', 'UGC', 'Commercials'],
    desc: 'High-quality creative assets built for brands that need more content to test, scale, and grow.',
  },
  {
    id: 'motion',
    tag: '04',
    title: 'Motion & Product Videos',
    icon: Layers,
    hue: 200,
    tags: ['SaaS demos', 'UI animations', 'Explainers', 'Motion GFX'],
    desc: 'Turn complex ideas and products into clear, visually engaging stories.',
  },
]

function ServiceCard({ s, i }) {
  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F0F0F] p-8 hover:border-white/20 transition-all duration-500"
    >
      {/* hover glow */}
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(500px 200px at 50% 0%, hsla(${s.hue}, 90%, 60%, 0.15), transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-16">
          <span className="text-xs font-mono text-white/40">{s.tag}</span>
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.02] group-hover:border-white/20 transition"
            style={{ color: `hsl(${s.hue}, 80%, 70%)` }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{s.title}</h3>
        <p className="text-sm text-white/55 leading-relaxed mb-6">{s.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] bg-white/[0.04] border border-white/[0.06] text-white/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Services() {
  return (
    <section id="services" className="relative py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-white/40 mb-6"
            >
              — WHAT WE DO
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter"
            >
              More Than Video Editors.<br />
              <span className="text-white/40">Your Content Team.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-white/60 leading-relaxed">
              From short-form content to full-scale video production, we help you create more without building an in-house editing team.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- INDUSTRIES ---------- */
const industries = [
  {
    id: 'saas',
    label: 'SaaS & Startups',
    icon: Code2,
    hue: 220,
    title: 'The SaaS Content Engine',
    desc: 'Turn product footage, screen recordings, and ideas into content that helps people understand and discover your product.',
    deliverables: ['SaaS product videos', 'UI animations', 'Product demos', 'Feature launches', 'Founder content', 'Social media videos', 'Paid ad creatives'],
    cta: 'Explore SaaS Content',
  },
  {
    id: 'finance',
    label: 'Finance & Trading',
    icon: LineChart,
    hue: 150,
    title: 'The Finance Content Engine',
    desc: 'Turn complex financial ideas into engaging videos your audience can understand and watch.',
    deliverables: ['YouTube editing', 'Trading content', 'Chart animations', 'Educational visuals', 'Screen recordings', 'Short-form clips'],
    cta: 'Explore Finance Content',
  },
  {
    id: 'podcast',
    label: 'Podcasters',
    icon: Mic,
    hue: 280,
    title: 'Record Once. Create Content Everywhere.',
    desc: 'Turn one podcast recording into a complete content system.',
    deliverables: ['Full podcast editing', 'Short clips', 'Social media content', 'Captions', 'Hooks', 'Multiple content variations'],
    cta: 'Scale Your Podcast Content',
  },
  {
    id: 'personal',
    label: 'Personal Brands & Coaches',
    icon: User,
    hue: 30,
    title: 'The Personal Brand Content System',
    desc: 'You create the knowledge. We turn it into content that builds your audience and personal brand.',
    deliverables: ['Talking-head videos', 'Reels', 'YouTube videos', 'Educational content', 'Captions', 'B-roll', 'Motion graphics'],
    cta: 'Build Your Content System',
  },
  {
    id: 'ecom',
    label: 'E-Commerce Brands',
    icon: ShoppingBag,
    hue: 340,
    title: 'The Creative Ad Engine',
    desc: 'More creative. More testing. More opportunities to find winning content.',
    deliverables: ['Facebook Ads', 'Instagram Ads', 'UGC ads', 'Product videos', 'Creative variations', 'Promotional content'],
    cta: 'Create More Ad Creative',
  },
  {
    id: 'youtube',
    label: 'YouTubers & Creators',
    icon: Youtube,
    hue: 0,
    title: 'The YouTube Content Partner',
    desc: 'You create. We handle the editing.',
    deliverables: ['Long-form YouTube editing', 'Shorts', 'B-roll', 'Sound design', 'Motion graphics'],
    cta: 'Scale Your Content',
  },
  {
    id: 'agency',
    label: 'Marketing Agencies',
    icon: Briefcase,
    hue: 200,
    title: 'Your White-Label Editing Team',
    desc: 'Take on more clients without building a bigger in-house editing team.',
    deliverables: ['White-label editing', 'Scalable editing capacity', 'Multiple client projects', 'Dedicated workflow', 'Fast turnaround'],
    cta: 'Partner With SCALBR',
  },
]

function Industries({ onCta }) {
  const [active, setActive] = useState('saas')
  const current = industries.find((i) => i.id === active)
  const Icon = current.icon

  return (
    <section id="industries" className="relative py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <div className="text-xs font-mono text-white/40 mb-6">— INDUSTRIES</div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter max-w-4xl"
          >
            Built for Every Kind<br />
            <span className="text-white/40">of Content.</span>
          </motion.h2>
          <p className="mt-6 text-white/60 max-w-xl">
            Different industries need different content. Our editing adapts to your audience, platform, and goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: industry picker */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            {industries.map((ind) => {
              const IconI = ind.icon
              const isActive = ind.id === active
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className={`shrink-0 lg:shrink flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-white/20 bg-white/[0.05]'
                      : 'border-white/[0.06] bg-transparent hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded-md flex items-center justify-center border border-white/10 shrink-0"
                    style={{ color: `hsl(${ind.hue}, 80%, 70%)`, background: isActive ? `hsla(${ind.hue}, 80%, 50%, 0.08)` : 'transparent' }}
                  >
                    <IconI className="h-4 w-4" />
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {ind.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="ind-dot" className="ml-auto h-1.5 w-1.5 rounded-full bg-white hidden lg:block" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: content panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F] p-8 md:p-10 min-h-[420px]"
              >
                <div
                  className="absolute -top-40 -right-40 h-96 w-96 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, hsla(${current.hue}, 80%, 55%, 0.25), transparent 60%)` }}
                />
                <div className="relative">
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center border border-white/10 mb-6"
                    style={{ color: `hsl(${current.hue}, 80%, 70%)`, background: `hsla(${current.hue}, 80%, 50%, 0.06)` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="text-xs font-mono text-white/40 mb-3">{current.label.toUpperCase()}</div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-4">
                    {current.title}
                  </h3>
                  <p className="text-white/60 max-w-xl leading-relaxed">{current.desc}</p>

                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Deliverables</div>
                    <div className="flex flex-wrap gap-2">
                      {current.deliverables.map((d) => (
                        <span key={d} className="px-3 py-1.5 rounded-md text-xs bg-white/[0.04] border border-white/[0.06] text-white/75">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={onCta}
                    variant="outline"
                    className="mt-10 rounded-full border-white/15 bg-white/[0.02] hover:bg-white/[0.08] group"
                  >
                    {current.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- HOW IT WORKS ---------- */
const steps = [
  { n: '01', title: 'Send Your Content', desc: 'Send your raw footage and project brief. We accept files of any size through our secure workflow.' },
  { n: '02', title: 'We Build the Edit', desc: 'Our editing team transforms your footage into professional content tailored to your platform and audience.' },
  { n: '03', title: 'Review & Refine', desc: 'Review your content and share feedback. We refine until it matches your vision perfectly.' },
  { n: '04', title: 'Publish & Scale', desc: 'Receive polished videos ready for your audience, formatted for every platform you publish to.' },
]

function HowItWorks() {
  return (
    <section id="process" className="relative py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-20">
          <div className="text-xs font-mono text-white/40 mb-6">— PROCESS</div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter"
          >
            Simple Process.<br />
            <span className="text-white/40">Serious Results.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/[0.08]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-transparent"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                {/* Node */}
                <div className="relative flex items-center mb-6">
                  <div className="h-4 w-4 rounded-full bg-[#0A0A0A] border-2 border-white/70 shrink-0 z-10" />
                  <div className="ml-4 md:hidden h-px flex-1 bg-white/10" />
                </div>
                <div className="font-mono text-xs text-white/40 mb-2">STEP {s.n}</div>
                <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- PORTFOLIO ---------- */
const portfolioCategories = ['All Work', 'Short Form', 'Long Form', 'Ads', 'SaaS', 'Podcasts', 'Finance', 'Motion Graphics']

const portfolioItems = [
  { id: 1, title: 'Founder Story — Ep. 04', industry: 'SaaS', category: 'Long Form', duration: '12:24', hue: 220, videoId: 'dQw4w9WgXcQ' },
  { id: 2, title: 'Reel Series Vol. 12', industry: 'Personal Brand', category: 'Short Form', duration: '00:38', hue: 280, videoId: '9bZkp7q19f0' },
  { id: 3, title: 'Trading Deep Dive', industry: 'Finance', category: 'Finance', duration: '18:02', hue: 150, videoId: 'dQw4w9WgXcQ' },
  { id: 4, title: 'UGC Campaign Launch', industry: 'E-Commerce', category: 'Ads', duration: '00:24', hue: 340, videoId: '9bZkp7q19f0' },
  { id: 5, title: 'Product Demo — Feature X', industry: 'SaaS', category: 'SaaS', duration: '02:15', hue: 200, videoId: 'dQw4w9WgXcQ' },
  { id: 6, title: 'Podcast Highlights Reel', industry: 'Podcast', category: 'Podcasts', duration: '01:12', hue: 260, videoId: '9bZkp7q19f0' },
  { id: 7, title: 'App Onboarding Motion', industry: 'SaaS', category: 'Motion Graphics', duration: '00:45', hue: 190, videoId: 'dQw4w9WgXcQ' },
  { id: 8, title: 'Long-Form Interview', industry: 'Creator', category: 'Long Form', duration: '24:08', hue: 300, videoId: 'dQw4w9WgXcQ' },
  { id: 9, title: 'Instagram Ad — A/B Test', industry: 'E-Commerce', category: 'Ads', duration: '00:18', hue: 320, videoId: '9bZkp7q19f0' },
]

function PortfolioCard({ item, i, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
      className="group relative text-left"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#161616]">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, hsla(${item.hue}, 80%, 30%, 0.7), hsla(${item.hue + 40}, 80%, 12%, 0.9)), radial-gradient(circle at 30% 20%, hsla(${item.hue}, 90%, 60%, 0.5), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
            <Play className="h-5 w-5 fill-black text-black ml-0.5" />
          </div>
        </div>

        {/* Corner labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-[10px] font-medium text-white/80">
          {item.category}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono text-white/70">
          {item.duration}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg tracking-tight leading-tight">{item.title}</h3>
          <p className="text-xs text-white/50 mt-1">{item.industry}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 mt-1.5" />
      </div>
    </motion.button>
  )
}

function Portfolio() {
  const [active, setActive] = useState('All Work')
  const [open, setOpen] = useState(null)

  const filtered = active === 'All Work' ? portfolioItems : portfolioItems.filter((p) => p.category === active)

  return (
    <section id="work" className="relative py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <div className="text-xs font-mono text-white/40 mb-6">— OUR WORK</div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter"
          >
            Don't Take Our Word For It.<br />
            <span className="text-white/40">Watch The Work.</span>
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {portfolioCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                active === c
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/70 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <PortfolioCard item={item} i={i} onOpen={setOpen} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/50">No projects in this category yet.</div>
        )}

        {/* Lightbox */}
        <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 bg-[#0A0A0A] border border-white/10 overflow-hidden">
            <DialogTitle className="sr-only">{open?.title || 'Portfolio video'}</DialogTitle>
            {open && (
              <div>
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${open.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={open.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6 flex items-center justify-between gap-4 border-t border-white/[0.06]">
                  <div>
                    <div className="text-xs font-mono text-white/40 mb-1">{open.category.toUpperCase()} · {open.industry.toUpperCase()}</div>
                    <h3 className="font-display font-bold text-xl">{open.title}</h3>
                  </div>
                  <div className="text-xs font-mono text-white/50">{open.duration}</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

/* ---------- WHY SCALBR (BENTO) ---------- */
const whyPoints = [
  {
    icon: BadgeCheck,
    title: 'Professional Quality',
    desc: 'High-quality editing built around your content, your voice, and your brand — never a generic template.',
    hue: 240,
    span: 'md:col-span-2',
    big: true,
  },
  {
    icon: Layers3,
    title: 'Flexible Formats',
    desc: 'From short-form clips to long-form YouTube, ads and motion graphics — one team, every format.',
    hue: 280,
    span: 'md:col-span-1',
  },
  {
    icon: Users,
    title: 'Scalable Team',
    desc: 'Ramp content up or down without hiring or firing. Your creative capacity, on tap.',
    hue: 200,
    span: 'md:col-span-1',
  },
  {
    icon: Workflow,
    title: 'Clear Workflow',
    desc: 'Simple communication, organized projects, structured revisions, and reliable delivery.',
    hue: 160,
    span: 'md:col-span-1',
  },
  {
    icon: Globe2,
    title: 'Multi-Niche Experience',
    desc: 'We adapt editing style to your audience — SaaS, finance, creators, coaches, e-com, agencies.',
    hue: 320,
    span: 'md:col-span-1',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Focused Content',
    desc: 'Every edit is designed with the platform, the audience, and the content objective in mind — so it actually moves the needle.',
    hue: 30,
    span: 'md:col-span-2',
    big: true,
  },
]

function WhySCALBR() {
  return (
    <section id="why" className="relative py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono text-white/40 mb-6">— WHY SCALBR</div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-black text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] tracking-tighter"
            >
              Built to Scale<br />
              <span className="text-white/40">With You.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-white/60 leading-relaxed">
              Six reasons ambitious brands and creators trust SCALBR with their content — not just their editing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {whyPoints.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F0F0F] p-7 hover:border-white/20 transition-all ${p.span} ${p.big ? 'md:min-h-[260px]' : 'md:min-h-[220px]'}`}
              >
                <div
                  className="absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, hsla(${p.hue}, 90%, 55%, 0.2), transparent 60%)` }}
                />
                <div className="relative flex flex-col h-full">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center border border-white/10 mb-6"
                    style={{ color: `hsl(${p.hue}, 80%, 70%)`, background: `hsla(${p.hue}, 80%, 50%, 0.06)` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`font-display font-bold tracking-tight ${p.big ? 'text-2xl md:text-3xl' : 'text-xl'} mb-3`}>{p.title}</h3>
                  <p className={`text-white/55 leading-relaxed ${p.big ? 'text-base max-w-md' : 'text-sm'}`}>{p.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- FINAL CTA + FORM ---------- */
function ContactSection({ formRef }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [uploadErr, setUploadErr] = useState('')
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    fullName: '', company: '', email: '', link: '',
    industry: '', videoType: '', volume: '', budget: '', message: '',
  })

  const MAX_FILE_MB = 15
  const MAX_TOTAL_MB = 25

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })

  const handleFiles = async (fileList) => {
    setUploadErr('')
    const files = Array.from(fileList || [])
    if (!files.length) return
    const currentTotal = attachments.reduce((s, a) => s + a.size, 0)
    const next = [...attachments]
    for (const f of files) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setUploadErr(`"${f.name}" is over ${MAX_FILE_MB}MB. Please share a link instead.`)
        continue
      }
      const projected = next.reduce((s, a) => s + a.size, 0) + f.size
      if (projected > MAX_TOTAL_MB * 1024 * 1024) {
        setUploadErr(`Total attachments would exceed ${MAX_TOTAL_MB}MB.`)
        break
      }
      try {
        const dataUrl = await readFileAsBase64(f)
        next.push({ name: f.name, type: f.type || 'application/octet-stream', size: f.size, dataUrl })
      } catch {
        setUploadErr(`Failed to read "${f.name}".`)
      }
    }
    setAttachments(next)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeAttachment = (i) => setAttachments((arr) => arr.filter((_, idx) => idx !== i))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.email) {
      toast.error('Please fill in your name and email.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, attachments }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong')
      setSuccess(true)
      toast.success('Project inquiry sent!')
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={formRef} className="relative py-32 border-t border-white/[0.06] overflow-hidden">
      {/* animated bg */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 60%)' }}
        />
        <div className="absolute inset-0 grid-bg radial-fade opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-white/40 mb-6"
          >
            — LET'S BUILD
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter"
          >
            Ready to Scale<br />
            <span className="text-white/40">Your Content?</span>
          </motion.h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Send us your footage. We'll handle the editing.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0F0F0F] p-12 text-center"
            >
              <div className="h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <Check className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-3xl mb-3">Project received.</h3>
              <p className="text-white/60 max-w-md mx-auto">
                Thanks for reaching out. Our team will review your project and get back to you soon.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={() => openCal()}
                  className="h-11 rounded-full px-6 bg-white text-black hover:bg-white/90 font-medium"
                >
                  Book a 15-min intro call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => { setSuccess(false); setAttachments([]); setUploadErr(''); setForm({ fullName:'', company:'', email:'', link:'', industry:'', videoType:'', volume:'', budget:'', message:'' }) }}
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-white/[0.02] hover:bg-white/[0.06]"
                >
                  Submit another
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#0F0F0F]/80 backdrop-blur p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name *">
                  <Input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Alex Rivera" className="h-11 bg-white/[0.02] border-white/10" />
                </Field>
                <Field label="Company">
                  <Input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company or brand" className="h-11 bg-white/[0.02] border-white/10" />
                </Field>
                <Field label="Email *">
                  <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" className="h-11 bg-white/[0.02] border-white/10" />
                </Field>
                <Field label="Website / Social link">
                  <Input value={form.link} onChange={(e) => update('link', e.target.value)} placeholder="https://" className="h-11 bg-white/[0.02] border-white/10" />
                </Field>
                <Field label="Industry">
                  <Select value={form.industry} onValueChange={(v) => update('industry', v)}>
                    <SelectTrigger className="h-11 bg-white/[0.02] border-white/10"><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>
                      {['SaaS & Startups','Finance & Trading','Podcaster','Personal Brand / Coach','E-Commerce','YouTuber / Creator','Marketing Agency','Education','Other'].map(x => (
                        <SelectItem key={x} value={x}>{x}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Type of videos">
                  <Select value={form.videoType} onValueChange={(v) => update('videoType', v)}>
                    <SelectTrigger className="h-11 bg-white/[0.02] border-white/10"><SelectValue placeholder="What do you need?" /></SelectTrigger>
                    <SelectContent>
                      {['Short-form','Long-form YouTube','Podcast editing','Paid ads / UGC','SaaS product video','Motion graphics','White-label agency editing','Mix / Not sure'].map(x => (
                        <SelectItem key={x} value={x}>{x}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Videos per month">
                  <Select value={form.volume} onValueChange={(v) => update('volume', v)}>
                    <SelectTrigger className="h-11 bg-white/[0.02] border-white/10"><SelectValue placeholder="Volume" /></SelectTrigger>
                    <SelectContent>
                      {['1–4','5–10','10–20','20+'].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Monthly budget">
                  <Select value={form.budget} onValueChange={(v) => update('budget', v)}>
                    <SelectTrigger className="h-11 bg-white/[0.02] border-white/10"><SelectValue placeholder="Budget range" /></SelectTrigger>
                    <SelectContent>
                      {['Under $500/month','$500–$1,000/month','$1,000–$3,000/month','$3,000+/month'].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Tell us about your project">
                  <Textarea rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Goals, style references, timeline..." className="bg-white/[0.02] border-white/10 resize-none" />
                </Field>
              </div>

              {/* Attachments */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="block text-xs text-white/50 font-medium">Attach briefs, storyboards, or reference clips (optional)</span>
                  <span className="text-[10px] text-white/35">Up to {MAX_FILE_MB}MB per file · {MAX_TOTAL_MB}MB total</span>
                </div>
                <label
                  htmlFor="scalbr-files"
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 cursor-pointer transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <Paperclip className="h-4 w-4 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/85 font-medium">Click to upload or drag files here</div>
                    <div className="text-xs text-white/45">PDF, images, short reference clips (mp4, mov). For raw footage, paste a Drive / Frame.io / WeTransfer link above.</div>
                  </div>
                  <input
                    id="scalbr-files"
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.mp4,.mov,.webm,.txt,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
                {uploadErr && <div className="mt-2 text-xs text-red-400">{uploadErr}</div>}
                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((a, i) => (
                      <li key={`${a.name}-${i}`} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02]">
                        <FileVideo className="h-4 w-4 text-white/50 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-white/85 truncate">{a.name}</div>
                          <div className="text-[11px] text-white/40">{(a.size / (1024 * 1024)).toFixed(2)} MB · {a.type || 'file'}</div>
                        </div>
                        <button type="button" onClick={() => removeAttachment(i)} className="h-7 w-7 rounded-md text-white/50 hover:text-white hover:bg-white/[0.06] flex items-center justify-center">
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-white/40">We'll get back within 24 hours on business days.</p>
                  <button
                    type="button"
                    onClick={() => openCal()}
                    className="mt-1 text-xs text-white/70 hover:text-white underline-offset-4 hover:underline"
                  >
                    Prefer a call? Book a 15-min intro →
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 rounded-full px-8 bg-white text-black hover:bg-white/90 font-semibold text-base group w-full sm:w-auto"
                >
                  {loading ? 'Sending...' : 'Start My Project'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-2 font-medium">{label}</span>
      {children}
    </label>
  )
}

/* ---------- FOOTER ---------- */
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
              <a href="#services" className="block text-white/70 hover:text-white">Short-form</a>
              <a href="#services" className="block text-white/70 hover:text-white">Long-form</a>
              <a href="#services" className="block text-white/70 hover:text-white">Ad creatives</a>
              <a href="#services" className="block text-white/70 hover:text-white">Motion graphics</a>
            </div>
            <div className="space-y-2">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">Contact</div>
              <a href="#contact" className="block text-white/70 hover:text-white">Start a project</a>
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

/* ---------- APP ---------- */
function App() {
  const formRef = useRef(null)
  const workRef = useRef(null)

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="relative">
      <Nav onCta={scrollToForm} />
      <Hero onCta={scrollToForm} onWork={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} />
      <Services />
      <Industries onCta={scrollToForm} />
      <HowItWorks />
      <Portfolio />
      <WhySCALBR />
      <ContactSection formRef={formRef} />
      <Footer />
    </main>
  )
}

export default App
