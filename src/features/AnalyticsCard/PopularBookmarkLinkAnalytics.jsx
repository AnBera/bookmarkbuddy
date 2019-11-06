import React from 'react';
import { Card } from "semantic-ui-react";
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@nivo/core';
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
};

const CustomTick = tick => {
    const theme = useTheme();
        return (
            <g transform={`translate(-50, ${tick.y})`} width={400}>
                <text
                className="animation"
                textAnchor="left"
                dominantBaseline="middle"
                style={{
                    ...theme.axis.ticks.text,
                    fill: '#fff',
                    fontSize: 12,
                }}
                >
                {tick.value}
                </text>
            </g>
        )
  };

const PopularBookmarkLinkAnalytics = ({ data, totalTopBookmarksCount, topFiveSites /* see data tab */ }) => (
    <Card fluid className="popular-bookmark-analytics" style={{borderRadius:"7px"}} >
    <div className="meta">
        <div style={{fontSize: "3em", marginRight: "0"}}>
            {totalTopBookmarksCount}
        </div>
        <div style={{fontSize: "1.2em", paddingTop: ".5em", marginRight: "0"}}>
            Bookmarks
        </div>
        <div style={{fontSize: "1.2em", marginRight: "0"}}>
            for top 5 sites
        </div>
    </div>
    <Card.Content style={{ height:"250px", width:"100%", padding:"1em", backgroundColor:"#333842", borderRadius:"7px" }}>
    <ResponsiveBar
        data={data}
        keys={[ 'count']}
        indexBy="mostBookmarkedSite"
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
        axisLeft={{renderTick: CustomTick}}
                //     {
                //     tickSize: 0,
                //     tickPadding: -10,
                //     tickRotation: 0,
                //     legend: '',
                //     legendPosition: 'middle',
                //     legendOffset: -40
                // }
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
      <Card.Meta>Your top 5 Sites consists of total {totalTopBookmarksCount} bookmarks</Card.Meta>
      <Card.Description>
        {topFiveSites[0]} is your top bookmarked site. Followed by {topFiveSites[1]} and {topFiveSites[2]}
      </Card.Description>
    </Card.Content>
    </Card>
)

export default PopularBookmarkLinkAnalytics;