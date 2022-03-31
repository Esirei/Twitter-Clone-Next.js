import { DefaultSession } from 'next-auth'

export declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      tag: string
    }
  }
}
