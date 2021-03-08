import React, { useState, useEffect } from 'react'

import Graph from './Graph'
import MobileGraph from './MobileGraph'

function GraphContainer({data}) {
    const [useMobile, setUseMobile] = useState(false)


    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 600
            ? setUseMobile(true)
            : setUseMobile(false)
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);

    if (useMobile){
        return <MobileGraph data={data}/>
    } 
    return <Graph data={data} />
}

export default GraphContainer;