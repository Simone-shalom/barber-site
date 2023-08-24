import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'

const poppins = Montserrat({ 
  weight: '400',
  subsets: ['latin']
 })

export const metadata: Metadata = {
  title: 'Barber site',
  description: 'Make reservations in your favourite barber',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LoginModal/>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
