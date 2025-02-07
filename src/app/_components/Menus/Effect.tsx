import { Category, Effect, MENU_ITEM_INFO, MenuItem } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={MENU_ITEM_INFO[MenuItem.EFFECT].name}>
    <div className="flex flex-wrap gap-3">
      <Item type={Effect.NONE} />
      <Item type={Effect.BLINK} />
      <Item type={Effect.PULSE} />
    </div>
  </Wrapper>
)

const Item = ({ type }: { type: Effect }) => {
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

const EffectMenu = makeMenu(Category.TYPE, MenuItem.EFFECT, Component)

export default EffectMenu
