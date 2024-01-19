import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import BoxContext from './boxContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BoxedGHO',
  description: 'Box GHO to any recipient chain/token',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <BoxContext>
            {children}
            <ToastContainer/>
          </BoxContext>
        </Providers>
      </body>
    </html>
  )
}


