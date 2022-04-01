import {
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hover-animation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="/images/twitter-icon-svg-28.png" width={30} height={30} alt="Logo" />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1D9BF0] text-lg font-bold text-white shadow hover:bg-[#1A8CD8] xl:inline">
        Tweet
      </button>

      {session?.user && (
        <button
          onClick={() => void signOut()}
          className="hover-animation mt-auto flex items-center justify-center text-[#D9D9D9] xl:ml-auto xl:-mr-5">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="h-10 w-10 rounded-full xl:mr-2.5"
          />
          <div className="hidden leading-5 xl:inline">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-[#6E767D]">@{session.user.tag}</p>
          </div>
          <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
        </button>
      )}
    </div>
  )
}

export default Sidebar
