import {
  Category,
  MENU_ITEM_INFO,
  MenuItem,
  TEXT_COLOR,
  TextColor,
} from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={MENU_ITEM_INFO[MenuItem.TEXT_COLOR].name}>
    <div className="mt-3 w-full overflow-hidden">
      <div className="scrollbar-hide flex gap-1 overflow-x-scroll">
        {Object.values(TextColor).map((type) => (
          <Item key={type} type={type} />
        ))}
      </div>
    </div>
  </Wrapper>
)

const Item = ({ type }: { type: TextColor }) => {
  const { color: currentColor, updateFrame } = useFrame()

  const handleSelect = () => {
    updateFrame({ color: TEXT_COLOR[type].color })
  }

  return (
    <button
      onClick={handleSelect}
      style={{ backgroundColor: TEXT_COLOR[type].color }}
      className={`${currentColor !== TEXT_COLOR[type].color && 'opacity-40'} border-gray-900 h-7 w-7 shrink-0 rounded-full border-2`}
    />
  )
}

const TextColorMenu = makeMenu(Category.TEXT, MenuItem.TEXT_COLOR, Component)

export default TextColorMenu
