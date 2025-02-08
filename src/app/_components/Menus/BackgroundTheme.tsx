import {
  BACKGROUND_THEME,
  BackgroundTheme,
  Category,
  SUB_CATEGORY,
  SubCategory,
} from '@/constants'
import { useFrame } from '@/contexts/FrameContext'
import Image from 'next/image'
import { makeMenu } from '../Maker/Menu'
import Wrapper from './Wrapper'

const Component = () => (
  <Wrapper name={SUB_CATEGORY[SubCategory.BACKGROUND_THEME].name}>
    <div className="mt-3 flex flex-wrap gap-1">
      {Object.entries(BACKGROUND_THEME).map(([theme]) => (
        <Item key={theme} theme={theme as BackgroundTheme} />
      ))}
    </div>
  </Wrapper>
)

const Item = ({ theme }: { theme: BackgroundTheme }) => {
  const { backgroundTheme: currentTheme, updateFrame } = useFrame()

  const handleSelect = () => {
    updateFrame({ backgroundTheme: theme })
  }

  return (
    <button
      onClick={handleSelect}
      style={{ backgroundColor: theme }}
      className={`${currentTheme !== theme && 'opacity-40'} border-gray-900 h-10 w-10 shrink-0 overflow-hidden rounded-lg border-2`}
    >
      <Image
        src={`/backgroundThemes/${theme}.png`}
        alt="polabo"
        width={50}
        height={50}
        className="object-contain"
      />
    </button>
  )
}

const BackgroundThemeMenu = makeMenu(
  Category.BACKGROUND,
  SubCategory.BACKGROUND_THEME,
  Component,
)

export default BackgroundThemeMenu
