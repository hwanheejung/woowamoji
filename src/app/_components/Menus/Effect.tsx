import { Category, Effect, MENU_ITEM_INFO, MenuItem } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'

const Component = () => {
  return (
    <div className="flex flex-1 flex-col items-start">
      <p>{MENU_ITEM_INFO['effect'].name}</p>
      <div className="flex flex-wrap gap-3">
        <Item type={Effect.NONE} />
        <Item type={Effect.BLINK} />
      </div>
    </div>
  )
}

const Item = ({ type }: { type: Effect }) => {
  const { effect: currentEffect, setEffect } = useFrame()

  const handleSelect = () => {
    setEffect(type)
  }

  return (
    <button
      onClick={handleSelect}
      className={currentEffect === type ? 'text-gray-900' : 'text-gray-300'}
    >
      {type}
    </button>
  )
}

const EffectMenu = makeMenu(Category.TYPE, MenuItem.EFFECT, Component)

export default EffectMenu
