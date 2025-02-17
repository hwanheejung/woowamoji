'use client'

import { useFrame } from '@/contexts/FrameContext'
import debounce from '@/utils/debounce'
import { useCallback, useMemo, useState } from 'react'

const PLACEHOLDER = '우아이게모지??'
const DEBOUNCE_DELAY = 300

const TextInput = () => {
  const { text, updateFrame } = useFrame()
  const [localText, setLocalText] = useState(text)

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        updateFrame({ text: value })
      }, DEBOUNCE_DELAY),
    [],
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (value.length > 7) return
      setLocalText(value)
      debouncedUpdate(value)
    },
    [debouncedUpdate],
  )

  return (
    <div className="mx-auto mb-5 mt-3">
      <input
        type="text"
        value={localText}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        className="flex-1 rounded-full bg-gray-100 px-4 py-2 placeholder-gray-300 outline-none"
      />
    </div>
  )
}

export default TextInput
