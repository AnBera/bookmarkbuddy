/*global chrome*/
import React, { Component } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
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
      //   <Grid container columns="equal" stackable>
      //     <Grid.Row>
      //       <Grid.Column>
      //         <Segment>1</Segment>
      //         <Segment>1</Segment>
      //         <Segment>1</Segment>
      //         <Segment>2</Segment>
      //       </Grid.Column>
      //       <Grid.Column>
      //         <Segment>1</Segment>
      //         <Segment>2</Segment>
      //       </Grid.Column>
      //       <Grid.Column>
      //         <Segment>1</Segment>
      //         <Segment>1</Segment>
      //         <Segment>2</Segment>
      //       </Grid.Column>
      //     </Grid.Row>
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
