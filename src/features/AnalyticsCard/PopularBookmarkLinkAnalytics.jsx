import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PopularBookmarkLinkAnalytics = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'Number of times added']}
        indexBy="country"
        margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
        padding={0.3}
        groupMode="grouped"
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        colorBy="index"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#333842',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#333842',
                rotation: -45,
                lineWidth: 4,
                spacing: 10
            }
        ]}
        fill={[
            // {
            //     match: {
            //         id: 'fries'
            //     },
            //     id: 'dots'
            // },
            {
                match: {
                    id: 'Number of times added'
                },
                id: 'dots'
            }
        ]}
        borderRadius={4}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            // {
            //     dataFrom: 'keys',
            //     anchor: 'bottom-right',
            //     direction: 'column',
            //     justify: false,
            //     translateX: 120,
            //     translateY: 0,
            //     itemsSpacing: 2,
            //     itemWidth: 100,
            //     itemHeight: 20,
            //     itemDirection: 'left-to-right',
            //     itemOpacity: 0.85,
            //     symbolSize: 20,
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemOpacity: 1
            //             }
            //         }
            //     ]
            // }
        ]}
        // tooltip={function(){}}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default PopularBookmarkLinkAnalytics;