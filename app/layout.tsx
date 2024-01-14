import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import BoxContext from './boxContext'

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
          </BoxContext>
        </Providers>
      </body>
    </html>
  )
}


