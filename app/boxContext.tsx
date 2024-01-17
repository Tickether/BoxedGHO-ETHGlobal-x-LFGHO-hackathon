'use client'

import { BoxActionContextProvider } from '@/helpers/contexts/decentActionContext'
import RouteSelectProvider from '@/helpers/contexts/routeSelectContext'
import { BoxHooksContextProvider } from '@decent.xyz/box-hooks'
import { ReactNode, useEffect, useState } from 'react'


export default function BoxContext({ children }: { children: ReactNode }) {


  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <RouteSelectProvider>
          <BoxActionContextProvider>
            {mounted && children}
          </BoxActionContextProvider>
        </RouteSelectProvider>
      </BoxHooksContextProvider>
    </>
  )
}