import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import ToasterProvider from '@/providers/ToasterProvider'
import getCurrentUser from '@/actions/get-current-user'

const montse = Montserrat({ 
  weight: '400',
  subsets: ['latin']
 })

export const metadata: Metadata = {
  title: 'Barber site',
  description: 'Make reservations in your favourite barber',
  metadataBase: new URL("http://barber-site.vercel.app")
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={montse.className}>
        <ToasterProvider />
        <LoginModal/>
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  )
}
