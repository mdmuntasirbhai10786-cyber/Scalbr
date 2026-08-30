'use client'

import { useEffect } from 'react'

// Placeholder — change this once your Cal.com booking page is live.
// e.g. "scalbr/intro-call"  =>  https://cal.com/scalbr/intro-call
export const CAL_LINK = 'scalbr/intro-call'

export default function CalInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.__scalbrCalInited) return
    window.__scalbrCalInited = true

    // Official Cal.com embed loader (from https://cal.com/docs/enterprise-features/embed)
    ;(function (C, A, L) {
      const p = function (a, ar) { a.q.push(ar) }
      const d = C.document
      C.Cal = C.Cal || function () {
        const cal = C.Cal
        const ar = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments) }
          const namespace = ar[1]
          api.q = api.q || []
          typeof namespace === 'string'
            ? (cal.ns[namespace] = api) && p(api, ar)
            : p(cal, ar)
          return
        }
        p(cal, ar)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    try {
      window.Cal('init', { origin: 'https://cal.com' })
      window.Cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#4CAF50' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    } catch (e) {
      // no-op if Cal is not available yet
    }
  }, [])
  return null
}

// Programmatic opener used by buttons throughout the app.
export function openCal(link = CAL_LINK) {
  if (typeof window === 'undefined' || !window.Cal) return
  try {
    window.Cal('modal', {
      calLink: link,
      config: { layout: 'month_view', theme: 'dark' },
    })
  } catch (e) {
    // Fallback: open in new tab
    window.open(`https://cal.com/${link}`, '_blank', 'noopener')
  }
}
