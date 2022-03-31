import type { GetServerSideProps, NextPage } from 'next'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '~/components/Feed'
import Login from '~/components/Login'
import Sidebar from '~/components/Sidebar'

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>
  session?: any
  followResults: any
  trendingResults: any
}

const Home: NextPage<Props> = ({ followResults, trendingResults, providers }) => {
  const session = useSession()

  if (!session.data) {
    return <Login providers={providers} />
  }

  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px]">
        <Sidebar />
        <Feed />
        {/*Feed*/}
        {/*Widgets*/}
        {/*Modal*/}
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const session = await getSession(context)
  const providers = await getProviders()

  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(res => res.json())
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(res => res.json())

  return {
    props: {
      session,
      providers,
      trendingResults,
      followResults,
    },
  }
}
