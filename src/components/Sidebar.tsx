import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hover-animation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="/images/twitter-icon-svg-28.png" width={30} height={30} />
      </div>
    </div>
  )
}

export default Sidebar
