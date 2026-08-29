'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Play, Sparkles, Film, Wand2, Megaphone, Layers, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

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
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#industries" className="hover:text-white transition">Industries</a>
          <a href="#work" className="hover:text-white transition">Our Work</a>
          <a href="#about" className="hover:text-white transition">About</a>
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
  return (
    <section className="relative min-h-screen w-full overflow-hidden noise">
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

/* ---------- FINAL CTA + FORM ---------- */
function ContactSection({ formRef }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    fullName: '', company: '', email: '', link: '',
    industry: '', videoType: '', volume: '', budget: '', message: '',
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

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
        body: JSON.stringify(form),
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
              <Button
                onClick={() => { setSuccess(false); setForm({ fullName:'', company:'', email:'', link:'', industry:'', videoType:'', volume:'', budget:'', message:'' }) }}
                variant="outline"
                className="mt-8 rounded-full border-white/15 bg-white/[0.02] hover:bg-white/[0.06]"
              >
                Submit another
              </Button>
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

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/40">We'll get back within 24 hours on business days.</p>
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
      <Hero onCta={scrollToForm} onWork={scrollToServices} />
      <Services />
      <ContactSection formRef={formRef} />
      <Footer />
    </main>
  )
}

export default App
