import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button, Menu,  IconButton, Icon} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { deAuthenticate } from '../../state/slice'

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
