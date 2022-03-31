import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>
}

const Login: FC<Props> = ({ providers }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/images/twitter-icon-svg-28.png"
        alt="Logo"
        width={150}
        height={150}
        objectFit="contain"
        className="h-52 w-52"
      />

      {Object.values(providers!).map(provider => (
        <div key={provider.id} className="mt-5">
          <button
            onClick={() => void signIn(provider.id, { callbackUrl: '/' })}
            className="group relative m-1 overflow-hidden rounded-md border-2 border-[#1D9BF0] bg-white px-3.5 py-2 font-medium">
            <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-[#1D9BF0] transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32" />
            <span className="ease relative text-[#1D9BF0] transition duration-300 group-hover:text-white">
              Login with {provider.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login
