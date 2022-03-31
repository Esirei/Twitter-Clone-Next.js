import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, profile, credentials, email, account }) => {
      console.log('signIn', { user, profile, credentials, email, account })
      return true
    },
    jwt: async ({ token, user, profile, account, isNewUser }) => {
      console.log('jwt', { token, user, profile, account, isNewUser })
      return token
    },
    session: async ({ session, token, user }) => {
      console.log('session', { session, token, user })
      session.user.id = token.sub!
      session.user.tag = session.user.name!.split(' ').join('').toLocaleLowerCase()
      return session
    },
  },
})
