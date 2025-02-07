import { ReactNode } from 'react'

interface WrapperProps {
  name: string
  children: ReactNode
}

const Wrapper = ({ name, children }: WrapperProps) => (
  <div className="flex flex-col items-start">
    <p>{name}</p>
    {children}
  </div>
)

export default Wrapper
