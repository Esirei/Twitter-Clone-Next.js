import { updateDoc } from '@firebase/firestore'
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/solid'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, MouseEventHandler } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { firestore } from '~/firebase'
import { c } from '~/helpers'
import Tweet from '~/types/models/Tweet'

interface Props {
  tweet: Tweet
  isPage?: boolean
}

const Tweet: FC<Props> = ({ tweet, isPage }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const renderUserImage = () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tweet.userId} alt={tweet.userId} className="mr-4 h-11 w-11 rounded-full" />
  )

  const renderTweetText = () => (
    <p className="mt-0.5 text-[15px] text-[#D9D9D9] sm:text-base">{tweet.text}</p>
  )

  const renderTweetImage = () => {
    if (!tweet.image) return null
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tweet.image}
          alt="tweet"
          className="mr-2 max-h-[700px] rounded-2xl object-cover"
        />
        <div className="relative mr-2 aspect-video">
          <Image
            src={tweet.image}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            alt="tweet"
          />
        </div>
      </>
    )
  }

  const replyTweet: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    // setPostId(tweet.id)
    // setOpen(true)
  }

  const deleteTweet: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    return
    void deleteDoc(doc(firestore, 'tweets', tweet.id))
    void router.push('/')
  }

  const liked = false

  const likeTweet: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation()
    return
    void updateDoc(doc(firestore, 'tweets', tweet.id), {
      // likes: c.uniq([...tweet.likes, session.user.id]),
    })
  }

  const renderLikedIcon = () => {
    if (liked) {
      return <HeartSolid className="h-5 text-pink-600" />
    }
    return <HeartIcon className="h-5 group-hover:text-pink-600" />
  }

  return (
    <div className="flex cursor-pointer border-b border-gray-700 p-3">
      {!isPage && renderUserImage()}
      <div className="flex w-full flex-col space-y-2">
        <div className={c('flex', !isPage && 'justify-between')}>
          {isPage && renderUserImage()}
          <div className="text-[#6E767D]">
            <div className="group inline-block">
              <h4 className="text-[15px] font-bold text-[#D9D9D9] group-hover:underline sm:text-base">
                {tweet.userId} {/* username */}
              </h4>
              <span className={c('text-sm sm:text-[15px]', !isPage && 'ml-1.5')}>
                @{tweet.userId} {/* user tag */}
              </span>
            </div>
            &nbsp;&middot;&nbsp;
            <span className="text-sm hover:underline sm:text-[15px]">
              <ReactTimeAgo date={tweet.timestamp.toDate()} timeStyle="twitter" />
            </span>
            {!isPage && renderTweetText()}
          </div>
          <div className="tweet-icon group ml-auto shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6E767D] group-hover:text-[#1D9BF0]" />
          </div>
        </div>
        {isPage && renderTweetText()}
        {renderTweetImage()}
        <div className={c('flex w-10/12 justify-between text-[#6E767D]', isPage && 'mx-auto')}>
          <button className="group flex items-center space-x-1" onClick={replyTweet}>
            <div className="tweet-icon group-hover:bg-[#1D9BF0]/10">
              <ChatIcon className="h-5 group-hover:text-[#1D9BF0]" />
            </div>
            <span className="text-sm group-hover:text-[#1D9BF0]">
              {0 /* TODO comments, Use cloud Functions to update on child tweet */}
            </span>
          </button>

          {session?.user.id === tweet.userId && (
            <button className="group flex items-center space-x-1" onClick={deleteTweet}>
              <div className="tweet-icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </button>
          )}

          <button className="group flex items-center space-x-1" onClick={likeTweet}>
            <div className="tweet-icon group-hover:bg-pink-600/10">{renderLikedIcon()}</div>
            <span className={c('text-sm group-hover:text-pink-600', liked && 'text-pink-600')}>
              {0 /* TODO comments, Use cloud Functions to update likes for tweet */}
            </span>
          </button>

          <div className="tweet-icon group">
            <ShareIcon className="h-5 group-hover:text-[#1D9BF0]" />
          </div>

          <div className="tweet-icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1D9BF0]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
