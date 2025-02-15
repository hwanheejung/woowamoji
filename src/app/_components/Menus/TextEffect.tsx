import { Category, SUB_CATEGORY, SubCategory } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'
import { TextEffect } from '@/constants'
import Image from 'next/image'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.TEXT_EFFECT].name}>
    <div className="mt-3 flex flex-wrap gap-3">
      {Object.values(TextEffect).map((effect) => (
        <Item key={effect} type={effect} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ type }: { type: TextEffect }) => {
  const { effect: currentEffect, setEffect } = useFrame()

  const handleSelect = () => {
    setEffect(type)
  }

  return (
    <button
      onClick={handleSelect}
      className={`border-2 ${currentEffect !== type ? 'border-gray-900/0 opacity-40' : 'border-gray-900'}`}
    >
      <Image
        src={`/emojis/effect-${type}.gif`}
        alt={type}
        width={35}
        height={35}
        unoptimized
      />
    </button>
  )
}

const TextEffectMenu = makeMenu(
  Category.TYPE,
  SubCategory.TEXT_EFFECT,
  Component,
)

export default TextEffectMenu
