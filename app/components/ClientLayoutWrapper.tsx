'use client'

import { usePathname } from 'next/navigation'
import LoadingScreen from './LoadingScreen'
import { ReactNode } from 'react'

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const excludeLoadingRoutes = ['/', '/intro', '/intro/AON']
  const shouldShowLoader = !excludeLoadingRoutes.includes(pathname)

  return (
    <>
      {shouldShowLoader ? <LoadingScreen /> : null}
      {children}
    </>
  )
}
