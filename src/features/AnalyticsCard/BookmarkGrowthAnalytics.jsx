import React from 'react';
import { Card } from "semantic-ui-react";
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BookmarkGrowthAnalytics = ({ data, totalBookmarkCount, firstBookmarkAddeddate /* see data tab */ }) => (
    <Card fluid className="bookmark-growth-analytics" style={{borderRadius:"7px"}} >
    <div className="meta" style={{position: "absolute", padding: "1.5em 0 0 1.7em", color: "#fff"}}>
        <div style={{fontSize: "3em"}}>
            {totalBookmarkCount}
        </div>
        <div style={{fontSize: "1.2em", paddingTop: ".5em"}}>
            Bookmarks
        </div>
        <div style={{fontSize: "1.2em"}}>
            in total
        </div>
    </div>
    <Card.Content style={{ height:"250px", width:"100%", padding:"1.5em 0 0 0", backgroundColor:"#333842", borderRadius:"7px" }}>
    <ResponsiveLine
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={ null
            // {
            //     orient: 'left',
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     legend: 'count',
            //     legendOffset: -40,
            //     legendPosition: 'middle'
            // }
        }
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'nivo' }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={5}
        pointBorderColor="black"
        pointLabel="y"
        pointLabelYOffset={-15}
        enableArea={true}
        areaOpacity={0.45}
        enableSlices="x"
        enableCrosshair={false}
        legends={[
            // {
            //     anchor: 'bottom-left',
            //     direction: 'row',
            //     justify: false,
            //     translateX: 100,
            //     translateY: 0,
            //     itemsSpacing: 0,
            //     itemDirection: 'left-to-right',
            //     itemWidth: 80,
            //     itemHeight: 20,
            //     itemOpacity: 0.75,
            //     symbolSize: 12,
            //     symbolShape: 'circle',
            //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemBackground: 'rgba(0, 0, 0, .03)',
            //                 itemOpacity: 1
            //             }
            //         }
            //     ]
            // }
        ]}
    />
    </Card.Content>
    
    <Card.Content>
      <Card.Header>How your Bookmarks increased</Card.Header>
      <Card.Meta>Total Bookmarks count each month since begining</Card.Meta>
      <Card.Description>
        You have total {totalBookmarkCount} Bookmarks. First ever bookmark was added on {firstBookmarkAddeddate}.
      </Card.Description>
    </Card.Content>
    </Card>
)

export default BookmarkGrowthAnalytics;