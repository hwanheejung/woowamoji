import { FONTS, FontKey } from '@/constants'
import { Category, MENU_ITEM_INFO, MenuItem } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={MENU_ITEM_INFO[MenuItem.FONT].name}>
    <div className="mt-3 flex flex-wrap gap-2">
      {Object.values(FontKey).map((type) => (
        <Item key={type} type={type} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ type }: { type: FontKey }) => {
  const { fontFamily: currentFont, updateFrame } = useFrame()

  const handleSelect = () => {
    updateFrame({ fontFamily: type })
  }

  return (
    <button
      onClick={handleSelect}
      style={{ fontFamily: type }}
      className={`${currentFont !== type && 'opacity-40'} border-gray-900 rounded-full border-2 px-3 py-1 text-sm`}
    >
      {FONTS[type].name}
    </button>
  )
}

const FontMenu = makeMenu(Category.TEXT, MenuItem.FONT, Component)

export default FontMenu
