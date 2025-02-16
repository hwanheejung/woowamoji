'use client'

import DownloadButton from './DownloadButton'
import Layout from './Layout'
import Menu from './Menu'
import TextInput from './TextInput'
import {
  BackgroundColorMenu,
  BackgroundThemeMenu,
  FontMenu,
  TextColorMenu,
  TextEffectMenu,
} from '../Menus'

const menus = [
  TextEffectMenu,
  TextColorMenu,
  FontMenu,
  BackgroundColorMenu,
  BackgroundThemeMenu,
]

const Maker = () => {
  return (
    <Layout>
      <TextInput />
      <Menu menus={menus} />
      <DownloadButton />
    </Layout>
  )
}

export default Maker
