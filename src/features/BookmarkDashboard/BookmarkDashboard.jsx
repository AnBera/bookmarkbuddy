/*global chrome*/
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import { flattenNode } from "../../app/common/util/Util";

class BookmarkDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    };
  }

  componentWillMount() {
    this.getBookmarks();
  }

  getBookmarks = () => {
    console.log("new4 getbookmark-called");
    let flattenedBookmarks = [];
    chrome.bookmarks.getTree(treeNode => {
      flattenNode(treeNode[0], flattenedBookmarks);
      this.setState({bookmarks: flattenedBookmarks}); //TODO need to think of destructuring
    });
  };

  render() {
    return (
      <Grid container columns={3} doubling stackable>
        {this.state.bookmarks.map(bookmark =>
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        )}
      </Grid>
    );
  }
}

export default BookmarkDashboard;
