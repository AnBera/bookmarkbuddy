/*global chrome*/
import React, { Component } from "react";
import { Grid, Button, Card, Image, Icon, Label } from "semantic-ui-react";
import axios from "axios";

class BookmarkCard extends Component {
  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks = () => {
    console.log("getbookmark-called");
    chrome.bookmarks.getTree(treeNode => {
      var bookmarks = [];
      console.log(treeNode[0]);
      this.flattenNode(treeNode[0], bookmarks);
      console.log("==============");
      console.log(bookmarks);
    });
    // axios.get(chrome.bookmarks.getTree)
    // .then(res => console.log(res));
  };

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
      <Grid.Column>
        <Card fluid>
          <Card.Content href="https://react.semantic-ui.com/">
            <Image
              floated="right"
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            {/* use onclick to filter */}
            <div className="url-heading">
              <Icon name="user" />
              Linkedin
            </div>
            <Card.Meta>
              Friends of Elliot Friends of Elliot Friends of Elliot Friends of
              Elliot Friends of Elliot Friends of Elliot{" "}
            </Card.Meta>
            <Label attached="bottom right">UI/UX</Label>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default BookmarkCard;

//==========
export class Bookmark {
  title;
  url;
  dateAdded;
  id;
  index;
  parentId;
  category;

  get Title() {
    return this.title;
  }

  set Title(title) {
    this.title = title;
  }

  get Url() {
    return this.url;
  }

  set Url(url) {
    this.url = url;
  }

  get DateAdded() {
    return this.dateAdded;
  }

  set DateAdded(dateAdded) {
    this.dateAdded = dateAdded;
  }

  get Id() {
    return this.id;
  }

  set Id(id) {
    this.id = id;
  }

  get Index() {
    return this.index;
  }

  set Index(index) {
    this.index = index;
  }

  get ParentId() {
    return this.parentId;
  }

  set ParentId(parentId) {
    this.parentId = parentId;
  }

  get CategoryName() {
    return this.category;
  }

  set CategoryName(category) {
    this.category = category;
  }

  constructor(title, url, dateAdded, id, index, parentId, category) {
    this.title = title;
    this.url = url;
    this.dateAdded = dateAdded;
    this.id = id;
    this.index = index;
    this.parentId = parentId;
    this.category = category;
  }
}
