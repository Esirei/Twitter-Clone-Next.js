import { FieldValue } from '@firebase/firestore'

interface Tweet {
  text: string
  timestamp: FieldValue
  image?: string
}

export default Tweet
