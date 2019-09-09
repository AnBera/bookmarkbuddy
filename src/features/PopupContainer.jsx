import React from 'react'
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Grid, Sticky, Button, Icon, GridRow,Rail } from "semantic-ui-react";
import SearchAndFilter from "./Search/SearchandFilter"

const popupContainer=()=>{

    return(
    <Grid>
     <GridRow>
     <Rail internal position="left"
            attached
            style={{ top: "auto", height: "80px", width: "100%" }}
          >
            <Sticky>
              <div
                style={{
                  backgroundColor: "#161626",
                  textAlign: "center",
                  height: "60px"
                }}
              >
                <img src={BookmarkbuddyLogoGrey3} alt="BookmarkBuddy" />
              </div>
            </Sticky>
          </Rail>
    </GridRow>
    <GridRow>
      <SearchAndFilter 
            optionList={[]}
            setSearchedText={""}
            setSelectedFolder={""}
            open_CloseDropdown={()=>{}}
            SearchedText={""}
            SelectedFolder={""}
            IsDropDownOpen={true}/>
          </GridRow>
    <GridRow></GridRow>
    <GridRow>
    <Button Id="openFull" basic color="green" inverted>
          <Icon name="external alternate" /> Open Full view
        </Button>
    </GridRow>
    </Grid>
    )
}

export default popupContainer;