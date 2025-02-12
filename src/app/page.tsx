import Image from 'next/image'
import Demo from './_components/Demo'
import Footer from './_components/Footer'
import Maker from './_components/Maker'
import { FrameContextProvider } from '@/contexts/FrameContext'
import { CanvasProvider } from '@/contexts/CanvasContext'
import { GifProvider } from '@/contexts/GifContext'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-10 p-8 pb-20 sm:p-20">
      <header>
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

      <main className="row-start-2 flex items-center gap-8">
        <FrameContextProvider>
          <CanvasProvider>
            <GifProvider>
              <Demo />
              <Maker />
            </GifProvider>
          </CanvasProvider>
        </FrameContextProvider>
      </main>
      <footer className="row-start-3 flex flex-col items-center justify-center gap-2">
        <Footer />
      </footer>
    </div>
  )
}
