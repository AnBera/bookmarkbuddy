import React, { Component } from 'react';
import { Card } from "semantic-ui-react";
import { ResponsiveStream } from '@nivo/stream';

// class TotalBookmarksAnalytics extends Component {
//     render() {
//         return (
//             <Card fluid style={{"margin-top": "3rem"}}>
//                 <Card.Content>
//                     <span>
//                         Total Analytics card loaded
//                     </span>
//                 </Card.Content>
//             </Card>
//         )
//     }
// }

const TotalBookmarksAnalytics = ({data} /* see data tab */) => (
      
    <ResponsiveStream
        data={data}
        keys={["Total Bookmarks",
        "JS",
        "React",
        "Python"]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
        enableGridX={false}
        offsetType="diverging"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#2c998f',
                size: 4,
                padding: 2,
                stagger: true
            },
            {
                id: 'squares',
                type: 'patternSquares',
                background: 'inherit',
                color: '#e4c912',
                size: 6,
                padding: 2,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'React'
                },
                id: 'squares'
            },
            {
                match: {
                    id: 'Total Bookmarks'
                },
                id: 'dots'
            }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                itemDirection: 'left-to-right',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#000',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#ccc'
                        }
                    }
                ]
            }
        ]}
    />
)

export default TotalBookmarksAnalytics;