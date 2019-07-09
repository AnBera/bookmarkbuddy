import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";

class BookmarkRecentCard extends Component {
  render() {
    const { bookmark } = this.props;
    return (
      <Card fluid style={{"margin-top": "3rem"}} href={bookmark.url}>
        <div className="imageContainer" style={{backgroundColor: "grey"}}>
          <span className="initialAltText">
          {extractHostname(bookmark.url).charAt(0)}
          </span>
          <Image
            floated="right"
            size="tiny"
            src=""
          />
        </div>
        <Card.Content>
          <Card.Header>{extractHostname(bookmark.url)}</Card.Header>
          <Card.Meta>
            <span className="date">Added in {bookmark.dateAdded}</span>
          </Card.Meta>
          <Card.Description>
            {bookmark.title}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default BookmarkRecentCard;
