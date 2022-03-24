import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
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
