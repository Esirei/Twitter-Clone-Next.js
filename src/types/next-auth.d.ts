import { DefaultSession } from 'next-auth'
import { NonNullableRequired } from '~/types/index'

export declare module 'next-auth' {
  interface Session {
    user: NonNullableRequired<DefaultSession['user']> & {
      id: string
      tag: string
    }
  }
}
