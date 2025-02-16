import { CATEGORY, Category, MENU_MAP, SubCategory } from '@/constants/menu'
import { Dispatch, SetStateAction } from 'react'

export const makeMenu = <C extends keyof typeof MENU_MAP>(
  category: C,
  subCategory: Extract<(typeof MENU_MAP)[C][number], SubCategory>,
  Component: React.FC,
) => {
  return {
    category,
    subCategory,
    Component,
  }
}

interface MenuData {
  category: Category
  subCategory: SubCategory
  Component: React.FC
}

interface MenuProps {
  menus: MenuData[]
  currentCategory: Category
  setCurrentCategory: Dispatch<SetStateAction<Category>>
}

const Menu = ({ menus, currentCategory, setCurrentCategory }: MenuProps) => {
  return (
    <div className="flex flex-1 flex-col items-center overflow-hidden">
      {/* 카테고리 선택 버튼 */}
      <nav className="flex items-center">
        {Object.values(Category).map((category) => {
          const { key, name } = CATEGORY[category]

          return (
            <button
              key={key}
              className={`border-b-2 px-5 py-2 text-sm font-semibold transition-colors ${
                currentCategory === category
                  ? 'border-baeminBlue text-baeminBlue'
                  : 'border-gray-100 text-gray-300 hover:border-baeminBlue/70 hover:text-baeminBlue/70'
              }`}
              onClick={() => setCurrentCategory(category)}
            >
              {name}
            </button>
          )
        })}
      </nav>

      {/* 현재 카테고리에 해당하는 서브 카테고리 렌더링 */}
      <section className="flex w-full flex-1 flex-col justify-start gap-5 overflow-y-scroll pb-10 pt-5 scrollbar-hide">
        {menus
          .filter((menu) => menu.category === currentCategory)
          .map(({ subCategory, Component }) => (
            <Component key={subCategory} />
          ))}
      </section>
    </div>
  )
}

export default Menu
