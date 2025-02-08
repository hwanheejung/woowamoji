import { Category, SUB_CATEGORY, SubCategory, TextColor } from '@/constants'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.TEXT_COLOR].name}>
    <div className="mt-3 flex flex-wrap gap-1">
      {Object.values(TextColor).map((color) => (
        <Item key={color} color={color} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ color }: { color: TextColor }) => {
  const { color: currentColor, updateFrame } = useFrame()

  const handleSelect = () => {
    updateFrame({ color })
  }

  return (
    <button
      onClick={handleSelect}
      style={{ backgroundColor: color }}
      className={`${currentColor !== color && 'opacity-40'} border-gray-900 h-7 w-7 shrink-0 rounded-full border-2`}
    />
  )
}

const TextColorMenu = makeMenu(Category.TEXT, SubCategory.TEXT_COLOR, Component)

export default TextColorMenu
