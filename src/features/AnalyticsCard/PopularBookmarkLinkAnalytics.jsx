import React from 'react';
import { Card } from "semantic-ui-react";
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const theme = {
    axis: {
        ticks: {
            line: {
                stroke: '#fff',
            },
            text: {
                fill: '#efefef',
                fontSize: 12,
            }
        }
    }
}

const PopularBookmarkLinkAnalytics = ({ data /* see data tab */ }) => (
    <Card fluid style={{borderRadius:"7px"}} >
    {/* <div className="meta" style={{position: "absolute", padding: "1.5em 0 0 1.7em", color: "#fff"}}>
        <div style={{fontSize: "3em"}}>
            1080
        </div>
        <div style={{fontSize: "1.2em", paddingTop: ".5em"}}>
            Bookmarks
        </div>
    </div> */}
    <Card.Content style={{ height:"250px", width:"100%", padding:"1em", backgroundColor:"#333842", borderRadius:"7px" }}>
    <ResponsiveBar
        data={data}
        keys={[ 'Number of times added']}
        indexBy="country"
        margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
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
                color: '#fcfcfc',
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
            // {
            //     match: {
            //         id: 'Number of times added'
            //     },
            //     id: 'dots'
            // }
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
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        theme={theme}
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
    </Card.Content>
    
    <Card.Content>
      <Card.Header>Most Bookmarked sites</Card.Header>
      <Card.Meta>Your top 5 Sites consists of total 40 bookmarks</Card.Meta>
      <Card.Description>
        Facebook is your top bookmarked site. Followed by Wikipedia and TOI
      </Card.Description>
    </Card.Content>
    </Card>
)

export default PopularBookmarkLinkAnalytics;