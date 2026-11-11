import React, { useEffect, useState } from 'react'

import Mobile_Dashboard from './mobile UI/main components/mobile_Dashboard/Mobile_Dashboard'
import Desktop_Dashboard from './desktop UI/main components/desktop_Dashboard/Desktop_Dashboard'


function App() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1024
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')

    const handleChange = (e) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <>
      {isMobile ? (
        <Mobile_Dashboard />
      ) : (
        <Desktop_Dashboard />
      )}
    </>
  )
}

export default App