import { Category, SUB_CATEGORY, SubCategory } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'
import { TextEffect } from '@/constants'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.TEXT_EFFECT].name}>
    <div className="flex flex-wrap gap-3">
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
      className={currentEffect !== type ? 'opacity-40' : ''}
    >
      {type}
    </button>
  )
}

const TextEffectMenu = makeMenu(
  Category.TYPE,
  SubCategory.TEXT_EFFECT,
  Component,
)

export default TextEffectMenu
