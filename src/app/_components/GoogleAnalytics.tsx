import { isDevMode } from '@/utils/env'
import { GoogleAnalytics as GA } from '@next/third-parties/google'

const GoogleAnalytics = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (isDevMode || !gaId) return null

  return <GA gaId={gaId} />
}

export default GoogleAnalytics
