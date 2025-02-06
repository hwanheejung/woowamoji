'use client'

import { useCallback, useState } from 'react'

const PLACEHOLDER = '우아이게모지??'

const TextInput = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  return (
    <div className="mx-auto mt-10">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        className="placeholder-gray-300 flex-1 rounded-full bg-gray-100 px-4 py-2 outline-none"
      />
    </div>
  )
}

export default TextInput
