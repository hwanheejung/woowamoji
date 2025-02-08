'use client'

import { Category } from '@/constants/menu'
import { useState } from 'react'
import {
  BackgroundColorMenu,
  BackgroundThemeMenu,
  EffectMenu,
  FontMenu,
  TextColorMenu,
} from '../Menus'
import Layout from './Layout'
import Menu from './Menu'
import TextInput from './TextInput'

const menus = [
  EffectMenu,
  TextColorMenu,
  FontMenu,
  BackgroundColorMenu,
  BackgroundThemeMenu,
]

const Maker = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>(
    Category.TYPE,
  )

  return (
    <Layout>
      <TextInput />
      <Menu
        menus={menus}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <button className="text-white w-full rounded-full bg-baeminBlue py-3">
        완료
      </button>
    </Layout>
  )
}

export default Maker
