import React, { useEffect, useState } from 'react'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

function Nav() {
    const [useMobile, setUseMobile] = useState(false)


    useEffect(() => {
      let mounted = true
      if (mounted){
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setUseMobile(true)
            : setUseMobile(false)
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }

      return function cleanup() {
        mounted = false
      }
        
      }, []);

    if (useMobile){
        return <MobileNav />
    }
    return <DesktopNav />
    
}

export default Nav
