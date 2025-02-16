'use client'

import Image from 'next/image'
import { HTMLAttributes, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const ProfilePicture = () => (
  <div className="m-2 h-[30px] w-[30px] overflow-hidden rounded-md">
    <svg
      width="30"
      height="30"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" fill="#78D7DD"></rect>
      <path
        d="M18 24.25C31.5 24.2501 34.25 32 34.25 36.0002H18H2C2 32 4.5 24.25 18 24.25Z"
        fill="white"
      ></path>
      <circle cx="18" cy="14" r="7.5" fill="white"></circle>
    </svg>
  </div>
)

const Reaction = ({
  emoji,
  count = 1,
}: {
  emoji: ReactNode
  count?: number
}) => {
  const [reacted, setReacted] = useState<boolean>(false)

  const handleClick = () => {
    setReacted((prev) => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-full border border-gray-900/0 ${reacted ? 'bg-blue/10' : 'bg-gray-900/5 hover:border-gray-900'} px-2 py-1 text-sm`}
    >
      {emoji}
      <span className="font-euljiro font-thin">
        {reacted ? count + 1 : count}
      </span>
    </button>
  )
}

const EmojiImage = ({ src }: { src: string }) => (
  <Image src={src} alt="emoji" width={20} height={20} unoptimized />
)

interface ChatProps {
  sender: string
  time: `${number}:${number} ${'AM' | 'PM'}`
  message: ReactNode
  children: ReactNode
  className?: HTMLAttributes<HTMLDivElement>['className']
}

const Chat = ({
  sender,
  time,
  message,
  children,
  className = '',
}: ChatProps) => {
  return (
    <div className={twMerge('my-2 flex gap-2 rounded-lg p-2', className)}>
      <ProfilePicture />
      <div>
        <div className="flex items-center gap-4">
          <p className="text-lg">{sender}</p>
          <span className="font-sans text-xs opacity-50">{time}</span>
        </div>
        <div className="font-sans">{message}</div>
        <div className="mt-2 flex gap-2">{children}</div>
      </div>
    </div>
  )
}

Chat.Reaction = Reaction
Chat.EmojiImage = EmojiImage
export default Chat
