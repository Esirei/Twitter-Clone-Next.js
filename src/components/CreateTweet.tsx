import {
  addDoc,
  collection,
  CollectionReference,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { getDownloadURL, ref, StringFormat, uploadString } from '@firebase/storage'
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { BaseEmoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useRef, useState } from 'react'
import { firestore, storage } from '~/firebase'
import Tweet from '~/types/models/Tweet'

const CreateTweet = () => {
  const { data: session } = useSession()
  const [text, setText] = useState('')
  const [file, setFile] = useState<string | null>()
  const [showEmojiModal, setShowEmojiModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFileToTweet = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.addEventListener('load', () => setFile(reader.result as string))
    reader.readAsDataURL(file)
  }

  const addEmojiToText = (emoji: BaseEmoji) => {
    // const codePoints = emoji.unified.split('-').reduce<string[]>((acc, code) => {
    //   acc.push(`0x${code}`)
    //   return acc
    // }, [])
    //
    // // @ts-ignore
    // const emojiString = String.fromCodePoint(...codePoints)
    // setText(tweet + emojiString)

    setText(text + emoji.native)
  }

  const postTweet = async () => {
    if (loading) return
    setLoading(true)

    // Post tweet
    const tweetRef = await addDoc<Tweet>(
      collection(firestore, 'tweets') as CollectionReference<Tweet>,
      {
        text,
        userId: session!.user.id,
        timestamp: serverTimestamp(),
      },
    )

    if (file) {
      const name = Math.random().toString(36).substring(2, 10) // Generate file name
      const imageRef = ref(storage, `tweets/${tweetRef.id}/${name}`) // Create ref to image path
      await uploadString(imageRef, file, StringFormat.DATA_URL) // Upload image
      const image = await getDownloadURL(imageRef) // Get image url
      await updateDoc(tweetRef, { image }) // Update tweet with image url
    }

    setText('')
    setFile('')
    setLoading(false)
    setShowEmojiModal(false)
  }

  const renderEmojiModal = () => {
    if (!showEmojiModal) return
    return (
      <Picker
        theme="dark"
        onSelect={addEmojiToText}
        style={{
          position: 'absolute',
          borderRadius: '20px',
          maxWidth: '320px',
          marginLeft: '-40px',
          marginTop: '465px',
        }}
      />
    )
  }

  const renderSelectedFile = () => {
    if (!file) return
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setFile(null)}
          className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181C]/75 hover:bg-[#272C26]">
          <XIcon className="h-5 text-white" />
        </button>
        <img src={file} alt="Selected File" className="max-h-80 rounded-2xl object-contain" />
      </div>
    )
  }

  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 ${
        loading ? 'opacity-60' : ''
      }`}>
      <img
        src={session?.user.image}
        alt={session?.user.name}
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={[file && 'pb-7', text && 'space-y-2.5'].filter(Boolean).join(' ')}>
          <textarea
            rows={2}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What’s happening?"
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#D9D9D9] outline-0 placeholder:text-gray-500"
          />
          {renderSelectedFile()}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center text-[#1D9BF0]">
              <button className="tweet-icon" onClick={() => fileInputRef.current?.click()}>
                <PhotographIcon className="h-[22px]" />
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={addFileToTweet}
                  accept="image/*"
                />
              </button>

              <button className="tweet-icon rotate-90">
                <ChartBarIcon className="h-[22px]" />
              </button>

              <button className="tweet-icon" onClick={() => setShowEmojiModal(!showEmojiModal)}>
                <EmojiHappyIcon className="h-[22px]" />
              </button>

              <button className="tweet-icon">
                <CalendarIcon className="h-[22px]" />
              </button>

              {renderEmojiModal()}
            </div>
            <button
              disabled={!text.trim() && !file}
              onClick={postTweet}
              className="rounded-full bg-[#1D9BF0] px-4 py-1.5 font-bold text-white shadow-md
              hover:bg-[#1A8CD8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1D9BF0]">
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateTweet
