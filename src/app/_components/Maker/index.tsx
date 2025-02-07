'use client'

import { useState } from 'react'
import Layout from './Layout'
import Menu from './Menu'
import TextInput from './TextInput'
import { Category } from '@/constants/menu'
import { EffectMenu, FontMenu } from '../Menus'
import TextColorMenu from '../Menus/TextColor'

const menus = [EffectMenu, TextColorMenu, FontMenu]

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
