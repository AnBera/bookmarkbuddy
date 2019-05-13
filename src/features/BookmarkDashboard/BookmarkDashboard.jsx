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
    console.log("new6 getbookmark-called");
    let flattenedBookmarks = [];
    chrome.bookmarks.getTree(treeNode => {
      flattenNode(treeNode[0], flattenedBookmarks);
      this.setState({ bookmarks: flattenedBookmarks }); //TODO need to think of destructuring
    });
  };

  render() {
    return (
      // // Anytime move to row layout by uncommenting these 5 lines and uncommenting <Grid.Column> in BookmarkCard
      //   <Grid container columns={3} doubling stackable>
      //   {this.state.bookmarks.map(bookmark =>
      //     <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      //   )}
      //   </Grid>

      <Grid container columns="equal" stackable>
        <Grid.Row>
          <Grid.Column>
            {this.state.bookmarks.map((bookmark, i) => {
              if (i % 3 === 0)
                return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
            })}
          </Grid.Column>
          <Grid.Column>
            {this.state.bookmarks.map((bookmark, i) => {
              if (i % 3 === 1)
                return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
            })}
          </Grid.Column>
          <Grid.Column>
            {this.state.bookmarks.map((bookmark, i) => {
              if (i % 3 === 2)
                return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BookmarkDashboard;
