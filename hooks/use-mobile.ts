import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    
    // Initial check
    checkIsMobile(mql)
    
    mql.addEventListener("change", checkIsMobile)
    return () => mql.removeEventListener("change", checkIsMobile)
  }, [])

  return isMobile
}
