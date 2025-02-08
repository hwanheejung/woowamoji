import { FONTS, Font } from '@/constants'
import { Category, SUB_CATEGORY, SubCategory } from '@/constants/menu'
import { useFrame } from '@/contexts/FrameContext'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.FONT_FAMILY].name}>
    <div className="mt-3 flex flex-wrap gap-2">
      {Object.values(Font).map((type) => (
        <Item key={type} type={type} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ type }: { type: Font }) => {
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

const FontMenu = makeMenu(Category.TEXT, SubCategory.FONT_FAMILY, Component)

export default FontMenu
