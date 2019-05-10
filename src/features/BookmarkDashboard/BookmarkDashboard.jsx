import React, { Component } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";

class BookmarkDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          <BookmarkCard />
        </Grid.Column>
      </Grid>
    );
  }
}

export default BookmarkDashboard;
