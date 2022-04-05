import { collection, CollectionReference, onSnapshot, orderBy } from '@firebase/firestore'
import { SparklesIcon } from '@heroicons/react/outline'
import { query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { firestore } from '~/firebase'
import TweetModel from '~/types/models/Tweet'
import CreateTweet from './CreateTweet'
import Tweet from './Tweet'

const Feed = () => {
  const [tweets, setTweets] = useState<TweetModel[]>([])

  useEffect(() => {
    // Return snapshot unsubscribe callback here, so it unsubscribes when component unmounts
    return onSnapshot(
      query(
        collection(firestore, 'tweets') as CollectionReference<TweetModel>,
        orderBy('timestamp', 'desc'),
      ),
      snapshot => setTweets(snapshot.docs.map(value => ({ ...value.data(), id: value.id }))),
    )
  }, [])

  return (
    <div className="max-w-2xl grow border-x border-gray-700 text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky top-0 z-50 flex items-center border-b border-gray-700 bg-black py-2 px-3 text-[#D9D9D9] sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hover-animation ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>

      <CreateTweet />

      <div className="pb-72">
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
