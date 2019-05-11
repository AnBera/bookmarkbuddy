import React, { Component } from "react";
import { Grid, Button, Card, Image, Icon, Label } from "semantic-ui-react";

class BookmarkCard extends Component {
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
