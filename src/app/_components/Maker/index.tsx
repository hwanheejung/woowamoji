import Image from 'next/image'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="bg-baeminBlue rounded-2xl p-4 flex relative">
    <Image
      src="/icons/BMGulim_rightTop.png"
      width={100}
      height={0}
      className="h-auto absolute top-1 right-1"
      alt="배민글림체 폭신 ㄱ"
    />
    <Image
      src="/icons/BMGulim_leftBottom.png"
      width={100}
      height={0}
      className="h-auto absolute bottom-1 left-1"
      alt="배민글림체 폭신 ㄴ"
    />
    <div className="bg-gray-0 flex-1 shadow-[0_0_50px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  </div>
)

const Maker = () => {
  return (
    <Layout>
      <div className="w-[400px] h-[500px]" />
    </Layout>
  )
}

export default Maker
