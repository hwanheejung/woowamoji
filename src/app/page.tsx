import Image from 'next/image'
import Demo from './_components/Demo'
import Footer from './_components/Footer'
import Maker from './_components/Maker'

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-10 sm:p-20">
      <header>
        <Image src="/logo.png" alt="우아모지 로고" width={300} height={200} />
      </header>
      <main className="flex gap-8 row-start-2">
        <Demo />

        <Maker />
      </main>
      <footer className="row-start-3 flex flex-col gap-2 items-center justify-center">
        <Footer />
      </footer>
    </div>
  )
}
