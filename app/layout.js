import { Inter, Inter_Tight } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'SCALBR — Your Content. Our Editing Team.',
  description: 'SCALBR helps creators, brands, and businesses turn raw footage into high-quality content built to engage audiences and support growth.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  )
}
