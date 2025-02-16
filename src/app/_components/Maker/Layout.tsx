import Image from 'next/image'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative flex h-full rounded-2xl bg-baeminBlue p-4">
    <Image
      src="/icons/BMGulim_rightTop.png"
      alt="배민글림체 폭신 ㄱ"
      width={110}
      height={0}
      className="absolute right-1 top-1 z-10"
      style={{ width: '110px', height: 'auto' }}
    />
    <Image
      src="/icons/BMGulim_leftBottom.png"
      alt="배민글림체 폭신 ㄴ"
      width={110}
      height={0}
      className="absolute bottom-1 left-1 z-10"
      style={{ width: '110px', height: 'auto' }}
    />
    <div className="breakpoint:max-w-[400px] flex w-full flex-1 flex-col bg-gray-0 p-10 shadow-[0_0_50px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  </div>
)

export default Layout
