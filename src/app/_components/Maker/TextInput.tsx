'use client'

import { useFrame } from '@/contexts/FrameContext'

const PLACEHOLDER = '우아이게모지??'

const TextInput = () => {
  const { text, updateFrame } = useFrame()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    updateFrame({ text: value })
  }

  return (
    <div className="mx-auto my-5">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        className="placeholder-gray-300 flex-1 rounded-full bg-gray-100 px-4 py-2 outline-none"
      />
    </div>
  )
}

export default TextInput
