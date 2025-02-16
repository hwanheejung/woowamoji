import { CanvasProvider } from '@/contexts/CanvasContext'
import { FrameContextProvider } from '@/contexts/FrameContext'
import { GifProvider } from '@/contexts/GifContext'
import Image from 'next/image'
import Demo from './_components/Demo'
import Footer from './_components/Footer'
import Maker from './_components/Maker'

export default function Home() {
  return (
    <div className="breakpoint:px-20 breakpoint:h-dvh flex min-h-screen flex-col items-center justify-items-center gap-8 px-5 py-10">
      <header className="breakpoint:block hidden">
        <Image
          src="/logo.png"
          alt="우아모지 로고"
          width={300}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          priority
          loading="eager"
        />
      </header>
      <main className="breakpoint:flex-row flex flex-1 flex-col items-center gap-8 overflow-hidden">
        <FrameContextProvider>
          <CanvasProvider>
            <GifProvider>
              <Demo />
              <Maker />
            </GifProvider>
          </CanvasProvider>
        </FrameContextProvider>
      </main>
      <footer className="flex flex-col items-center justify-center gap-2">
        <Footer />
      </footer>
    </div>
  )
}
