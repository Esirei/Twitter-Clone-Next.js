import { ComponentType, FC } from 'react'

interface Props {
  text: string
  Icon: ComponentType<any>
  active?: boolean
}

const SidebarLink: FC<Props> = ({ text, Icon, active }) => (
  <div
    className={`hover-animation flex items-center justify-center space-x-3 text-xl text-[#D9D9D9] xl:justify-start ${
      active && 'font-bold'
    }`}
  >
    <Icon className="h-7" />
    <span className="hidden xl:inline">{text}</span>
  </div>
)

export default SidebarLink
