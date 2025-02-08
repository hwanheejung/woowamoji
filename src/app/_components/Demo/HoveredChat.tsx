'use client'

import { ReactNode } from 'react'
import Canvas from '../Canvas'
import Image from 'next/image'

const EmojiContainer = ({ children }: { children: ReactNode }) => (
  <div className="absolute -top-1/3 right-5 flex items-center gap-4 rounded-xl border-2 border-gray-100 bg-gray-0 px-3 py-2 pl-[72px] text-2xl">
    {children}
  </div>
)

const HoveredChat = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <EmojiContainer>
        <button className="absolute bottom-2 left-3 h-[50px] w-[50px]">
          <Canvas className="absolute left-0 top-0" />
        </button>
        <button>
          <span>👍</span>
        </button>
        <button>
          <span>✅</span>
        </button>
        <Image src="icons/moreDots.svg" alt="더보기" width={24} height={24} />
      </EmojiContainer>
      <div className="bg-baeminBlue/15">{children}</div>
    </div>
  )
}

export default HoveredChat
