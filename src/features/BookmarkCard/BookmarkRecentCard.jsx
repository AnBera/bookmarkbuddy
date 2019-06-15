import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";

class BookmarkRecentCard extends Component {
  render() {
    const { bookmark } = this.props;
    return (
      <Card fluid style={{"margin-top": "3rem"}} href={bookmark.url}>
        <div className="imageContainer" style={{backgroundColor: "green"}}>
          <span className="initialAltText">B</span>
          <Image
            floated="right"
            size="tiny"
            src=""
          />
        </div>
        <Card.Content>
          <Card.Header>{extractHostname(bookmark.url)}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default BookmarkRecentCard;
