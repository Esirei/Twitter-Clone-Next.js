import { Session } from 'next-auth'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'

declare module 'next/app' {
  interface AppProps<P = Record<string, unknown>> extends AppPropsType<Router, P> {
    pageProps: {
      session?: Session
    }
  }
}
