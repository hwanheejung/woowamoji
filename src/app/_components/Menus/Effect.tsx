import { Category, MenuItem } from '@/constants/menu'
import { makeMenu } from '../Maker/Menu'

const Component = () => {
  return (
    <div>
      <Item />
      <Item />
      <Item />
    </div>
  )
}

const Item = () => {
  return <div>1</div>
}

const EffectMenu = makeMenu(Category.TYPE, MenuItem.EFFECT, Component)

export default EffectMenu
