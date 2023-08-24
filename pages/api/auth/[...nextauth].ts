import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
 
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      // ...add more providers here
      CredentialsProvider({
          name: 'credentials',
          credentials: {
              email: {label: 'email', type: 'text'},
              password: {label: 'password', type: 'password'},
          },
          async authorize(credentials, req) {
              if(!credentials?.email || !credentials?.password){
                  throw new Error('Invalid credentials')
              }
  
              const user = await prismadb.user.findUnique({
                  where: {
                      email: credentials?.email
                  }
              })
  
              if(!user || !user?.hashedPassword) {
                  throw new Error('Invalid credentials')
              }
  
              const isCorrectPassword = await bcrypt.compare(credentials?.password, user.hashedPassword)
  
              if(!isCorrectPassword) {
                  throw new Error('Invalid password')
              }
  
              return user
          },
      })
  ],
  pages: {
      signIn: '/'
  },
    adapter: PrismaAdapter(prismadb) ,
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
  }
  
  export default NextAuth(authOptions)