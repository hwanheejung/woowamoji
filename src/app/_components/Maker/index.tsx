'use client'

import { Category } from '@/constants/menu'
import { useState } from 'react'
import { EffectMenu, FontMenu } from '../Menus'
import BackgroundColorMenu from '../Menus/BackgroundColor'
import TextColorMenu from '../Menus/TextColor'
import Layout from './Layout'
import Menu from './Menu'
import TextInput from './TextInput'

const menus = [EffectMenu, TextColorMenu, FontMenu, BackgroundColorMenu]

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
