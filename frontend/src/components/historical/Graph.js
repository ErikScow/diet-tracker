import React from 'react';

import * as V from 'victory'

import { abbreviateNum, commafyNum as commafy } from '../../utils/numModifiers.js'

const VictoryVoronoiCursorContainer = V.createContainer('voronoi', 'cursor')

function Graph({data}) {
    return (
        <div className='chart-container medium'>
        <V.VictoryChart 
          width={800}
          height={350}
          padding={{left:62, bottom:60, right: 5}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<VictoryVoronoiCursorContainer
            cursorDimension = "x"
            voronoiDimension = "x"
            activateData={false}
            style={{
              touchAction: 'auto'
            }}
            cursorComponent={<V.LineSegment style={{stroke: '#ccc'}}/>}
          />}
          
        >

        <V.VictoryAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15,
              padding: 3,
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickFormat={date => `${date.toLocaleString('en-us', { month:'short' })} ${date.getDate()}`}
        />

        <V.VictoryAxis
          dependentAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15, 
              padding: 3
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickFormat={abbreviateNum}
        />
         
        <V.VictoryGroup
          data={data}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.type}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
            x={100}
            y={0}
            flyoutStyle={{
              stroke: 'none',
              strokeWidth: '2',
              fill: 'white',
              fillOpacity: '0.7'
            }}
            flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
            style={[{
              textAnchor: 'start',
              fontSize: 15,
              fill: '#445a64'
            },{
              textAnchor: 'start',
              fontSize: 15,
              fill: '#445a64'
            }]}
            orientation='right'
            pointerLength={0}
            constrainToVisibleArea
            />
          }
          style={{
            data:{ fill: '#3f51b5'}
          }}
        >
          <V.VictoryLine
            style={{
              data:{ strokeWidth: 3 }
            }}
            interpolation='linear'
          />
        </V.VictoryGroup>
        
      </V.VictoryChart>
      </div>
    );
}

export default Graph;