import { CATEGORY_INFO, Category, MENU, MenuItem } from '@/constants/menu'
import { Dispatch, SetStateAction } from 'react'

export const makeMenu = <C extends keyof typeof MENU>(
  categoryKey: C,
  menuItemKey: Extract<(typeof MENU)[C][number], MenuItem>,
  Component: React.FC,
) => {
  return {
    category: categoryKey,
    menuItem: menuItemKey,
    Component,
  }
}

interface MenuItemData {
  category: Category
  menuItem: MenuItem
  Component: React.FC
}

interface MenuProps {
  menus: MenuItemData[]
  currentCategory: Category
  setCurrentCategory: Dispatch<SetStateAction<Category>>
}

const Menu = ({ menus, currentCategory, setCurrentCategory }: MenuProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 카테고리 선택 버튼 */}
      <nav className="mb-5 flex items-center gap-5">
        {Object.values(Category).map((category) => {
          const { key, name } = CATEGORY_INFO[category]

          return (
            <button
              key={key}
              className={`border-b-2 px-5 py-2 text-sm font-semibold transition-colors ${
                currentCategory === category
                  ? 'border-baeminBlue text-baeminBlue'
                  : 'text-gray-300 border-gray-100 hover:border-baeminBlue/70 hover:text-baeminBlue/70'
              }`}
              onClick={() => setCurrentCategory(category)}
            >
              {name}
            </button>
          )
        })}
      </nav>

      {/* 현재 카테고리에 해당하는 메뉴 컴포넌트 렌더링 */}
      <section className="flex justify-center gap-5">
        {menus
          .filter((menu) => menu.category === currentCategory)
          .map(({ menuItem, Component }) => (
            <div key={menuItem} className="mx-5">
              <Component />
            </div>
          ))}
      </section>
    </div>
  )
}

export default Menu
