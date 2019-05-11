import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";

class BookmarkDashboard extends Component {
  render() {
    return (
      <Grid container columns={3} doubling stackable>
        <BookmarkCard />
        <BookmarkCard />
      </Grid>
    );
  }
}

export default BookmarkDashboard;
