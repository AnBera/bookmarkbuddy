/*global chrome*/
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import Bookmark from "../../app/common/class/Bookmark";

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
    console.log("getbookmark-called");
    let flattenedBookmarks = [];
    chrome.bookmarks.getTree(treeNode => {
      this.flattenNode(treeNode[0], flattenedBookmarks);
      this.setState({bookmarks: flattenedBookmarks}); //TODO need to think of destructuring
    });
  };

  //TODO move it to util
  flattenNode = (node, result) => {
    if (node.children) {
      node.children.forEach(child => {
        if (child.url && child.title) {
          result.push(
            new Bookmark(
              child.title,
              child.url,
              child.dateAdded,
              child.id,
              child.index,
              child.parentId,
              node.title
            )
          );
        }
        this.flattenNode(child, result);
      });
    }
  };

  render() {
    return (
      <Grid container columns={3} doubling stackable>
        {this.state.bookmarks.map(bookmark =>
          <BookmarkCard bookmark={bookmark} />
        )}
      </Grid>
    );
  }
}

export default BookmarkDashboard;
