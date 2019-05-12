import React, { Component } from "react";
import { Grid, Button, Card, Image, Icon, Label } from "semantic-ui-react";

class BookmarkCard extends Component {
  extractHostname = (url) => {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
  };

  render() {
    const { bookmark } = this.props;
    return (
      <Grid.Column>
        <Card fluid>
          <Card.Content href="https://react.semantic-ui.com/">
            <Image
              floated="right"
              size="tiny"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />
            {/*TODO use onclick to filter */}
            <div className="url-heading">
              <Icon name="user" />
              {this.extractHostname(bookmark.url)}
            </div>
            <Card.Meta>{bookmark.title}</Card.Meta>
            <Label attached="bottom right">UI/UX</Label>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default BookmarkCard;
