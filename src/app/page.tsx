import Footer from './_components/Footer'
import Manual from './_components/Manual'

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Manual />
      </main>
      <Footer />
    </div>
  )
}
