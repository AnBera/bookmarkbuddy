import React from 'react'
import { Grid, Sticky, Button, Icon, GridRow } from "semantic-ui-react";

const popupContainer=()=>{

    return(
    <Grid>
     <GridRow>
        <Sticky>
        <div
        style={{
          backgroundColor: "#161626",
          textAlign: "center",
          height: "60px"
        }}
      >
        BookmarkBuddy
      </div>
    </Sticky>
    </GridRow>
    <GridRow>
    <Button Id="openFull" basic color="green" inverted>
          <Icon name="remove" /> Open Full view
        </Button>
    </GridRow>
    </Grid>
    )
}

export default popupContainer;