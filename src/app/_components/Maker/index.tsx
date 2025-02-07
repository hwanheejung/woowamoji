'use client'

import { useState } from 'react'
import Layout from './Layout'
import Menu from './Menu'
import TextInput from './TextInput'
import { Category } from '@/constants/menu'
import { EffectMenu, FontMenu } from '../Menus'

const menus = [EffectMenu, FontMenu]

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
    </Layout>
  )
}

export default Maker
