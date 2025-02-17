import { isDevMode } from '@/utils/env'
import { GoogleAnalytics as GA } from '@next/third-parties/google'

const GoogleAnalytics = () => {
  if (isDevMode) {
    return null
  }

  return <GA gaId={process.env.NEXT_PUBLIC_GA_ID} />
}

export default GoogleAnalytics
