import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

const Feed = () => {
  return (
    <div className="max-w-2xl grow border-x border-gray-700 text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky top-0 z-50 flex items-center border-b border-gray-700 bg-black py-2 px-3 text-[#D9D9D9] sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hover-animation flex h-9 w-9 items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

export default Feed
