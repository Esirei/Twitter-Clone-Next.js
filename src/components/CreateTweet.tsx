import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { BaseEmoji, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { ChangeEvent, useRef, useState } from 'react'

const CreateTweet = () => {
  const [tweet, setTweet] = useState('')
  const [selected, setSelected] = useState<string | null>()
  const [showEmojiModal, setShowEmojiModal] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFileToTweet = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.addEventListener('load', () => setSelected(reader.result as string))
    reader.readAsDataURL(file)
  }

  const addEmojiToTweet = (emoji: BaseEmoji) => {
    const codePoints = emoji.unified.split('-').reduce<string[]>((acc, code) => {
      acc.push(`0x${code}`)
      return acc
    }, [])

    // @ts-ignore
    const emojiString = String.fromCodePoint(...codePoints)
    setTweet(tweet + emojiString)
  }

  const postTweet = () => {
    console.log('Posting tweet...')
  }

  const renderEmojiModal = () => {
    if (!showEmojiModal) return
    return (
      <Picker
        theme="dark"
        onSelect={addEmojiToTweet}
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
    if (!selected) return
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181C]/75 hover:bg-[#272C26]">
          <XIcon className="h-5 text-white" />
        </button>
        <img src={selected} alt="Selected File" className="max-h-80 rounded-2xl object-contain" />
      </div>
    )
  }

  return (
    <div className="flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3">
      <img
        src="https://lh3.googleusercontent.com/ogw/ADea4I5fb1DvkBz1-Ig4DTuqSEsyzMK6C0haJu38BXR7Hw=s32-c-mo"
        alt="Esirei"
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={[selected && 'pb-7', tweet && 'space-y-2.5'].filter(Boolean).join(' ')}>
          <textarea
            rows={2}
            value={tweet}
            onChange={e => setTweet(e.target.value)}
            placeholder="What’s happening?"
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#D9D9D9] outline-0 placeholder:text-gray-500"
          />
          {renderSelectedFile()}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center text-[#1D9BF0]">
            <button className="tweet-icon" onClick={() => fileInputRef.current?.click()}>
              <PhotographIcon className="h-[22px]" />
              <input type="file" hidden ref={fileInputRef} onChange={addFileToTweet} />
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
            disabled={!tweet.trim() && !selected}
            onClick={postTweet}
            className="rounded-full bg-[#1D9BF0] px-4 py-1.5 font-bold text-white shadow-md
            hover:bg-[#1A8CD8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1D9BF0]">
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTweet
