import { FieldValue } from '@firebase/firestore'

interface Tweet {
  id: string
  text: string
  timestamp: FieldValue
  image?: string
  userId: string
}

export default Tweet
