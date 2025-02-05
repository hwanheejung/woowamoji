'use client'

import { ReactNode, useState } from 'react'

const ProfilePicture = () => (
  <div className="w-[30px] h-[30px] rounded-md overflow-hidden m-2">
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

const Reaction = ({ emoji }: { emoji: ReactNode }) => {
  const [count, setCount] = useState<number>(1)

  return (
    <button>
      {emoji}
      <span>{count}</span>
    </button>
  )
}

interface ChatProps {
  sender: string
  time: `${number}:${number} ${'AM' | 'PM'}`
  message: ReactNode
}

const Chat = ({ sender, time, message }: ChatProps) => {
  return (
    <div className="flex gap-2 my-4 p-2 rounded-lg">
      <ProfilePicture />
      <div>
        <div className="flex items-center gap-4">
          <p className="text-lg">{sender}</p>
          <span className="font-sans text-xs opacity-50">{time}</span>
        </div>
        <div className="font-sans">{message}</div>
      </div>
    </div>
  )
}

export default Chat
