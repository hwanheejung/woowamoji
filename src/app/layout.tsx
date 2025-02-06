import { SITE_METADATA } from '@/constants'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const Kkubulim = localFont({
  src: '../../public/fonts/BMKkubulim.otf',
  variable: '--font-kkubulim',
})

const EuljiroOraeorae = localFont({
  src: '../../public/fonts/BMEuljirooraeoraeOTF.otf',
  variable: '--font-euljiroOraeorae',
})

const Euljiro10YearsLater = localFont({
  src: '../../public/fonts/BMEuljiro10yearslaterOTF.otf',
  variable: '--font-euljiro10yearsLater',
})

const Euljiro = localFont({
  src: '../../public/fonts/BMEULJIRO.otf',
  variable: '--font-euljiro',
})

const HannaPro = localFont({
  src: '../../public/fonts/BMHANNAProOTF.otf',
  variable: '--font-hannaPro',
})

const HannaAir = localFont({
  src: '../../public/fonts/BMHANNAAir_otf.otf',
  variable: '--font-hannaAir',
})

const Hanna11YrsOld = localFont({
  src: '../../public/fonts/BMHANNA_11yrs_otf.otf',
  variable: '--font-hanna11yrsOld',
})

const KirangHaerang = localFont({
  src: '../../public/fonts/BMKIRANGHAERANG-OTF.otf',
  variable: '--font-kirangHaerang',
})

const Yeonsung = localFont({
  src: '../../public/fonts/BMYEONSUNG_otf.otf',
  variable: '--font-yeonsung',
})

const Dohyeon = localFont({
  src: '../../public/fonts/BMDOHYEON_otf.otf',
  variable: '--font-dohyeon',
})

const Jua = localFont({
  src: '../../public/fonts/BMJUA_otf.otf',
  variable: '--font-jua',
})

export const metadata: Metadata = SITE_METADATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${Kkubulim.variable} ${EuljiroOraeorae.variable} ${Euljiro10YearsLater.variable} ${Euljiro.variable} ${HannaPro.variable} ${HannaAir.variable} ${Hanna11YrsOld.variable} ${KirangHaerang.variable} ${Yeonsung.variable} ${Dohyeon.variable} ${Jua.variable} font-hannaPro`}
      >
        {children}
      </body>
    </html>
  )
}
