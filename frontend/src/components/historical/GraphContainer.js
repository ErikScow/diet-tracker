import React, { useState, useEffect } from 'react'

import Graph from './Graph'
import MobileGraph from './MobileGraph'

function GraphContainer({data}) {
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
        return <MobileGraph data={data}/>
    } 
    return <Graph data={data} />
}

export default GraphContainer;