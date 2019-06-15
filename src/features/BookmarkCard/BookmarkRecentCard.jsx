import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

class BookmarkRecentCard extends Component {
  render() {
    return (
      <Card fluid style={{"margin-top": "3rem"}}>
        <div className="imageContainer" style={{backgroundColor: "green"}}>
          <span className="initialAltText">A</span>
          <Image
            floated="right"
            size="tiny"
            src=""
          />
        </div>
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
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
