import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        {/*Sidebar*/}
        {/*Feed*/}
        {/*Widgets*/}
        {/*Modal*/}
      </main>
    </div>
  )
}

export default Home
