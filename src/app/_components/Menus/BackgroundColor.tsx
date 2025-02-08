import {
  BackgroundColor,
  Category,
  SUB_CATEGORY,
  SubCategory,
} from '@/constants'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.BACKGROUND_COLOR].name}>
    <div className="mt-3 flex flex-wrap gap-1">
      {Object.values(BackgroundColor).map((color) => (
        <Item key={color} color={color} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ color }: { color: BackgroundColor }) => {
  const { backGroundColor: currentColor, updateFrame } = useFrame()

  const handleSelect = () => {
    updateFrame({ backGroundColor: color, backgroundTheme: undefined })
  }

  return (
    <button
      onClick={handleSelect}
      style={{ backgroundColor: color }}
      className={`${currentColor !== color && 'opacity-40'} h-7 w-7 shrink-0 rounded-lg border-2 border-gray-900`}
    />
  )
}

const BackgroundColorMenu = makeMenu(
  Category.BACKGROUND,
  SubCategory.BACKGROUND_COLOR,
  Component,
)

export default BackgroundColorMenu
