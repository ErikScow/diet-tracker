import React, { useEffect, useState } from 'react'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

function Nav() {
    const [useMobile, setUseMobile] = useState(false)


    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setUseMobile(true)
            : setUseMobile(false)
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);

    if (useMobile){
        return <MobileNav />
    }
    return <DesktopNav />
    
}

export default Nav
