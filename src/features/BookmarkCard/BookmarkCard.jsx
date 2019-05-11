import React, { Component } from "react";
import { Grid, Button, Card, Image, Icon, Label } from "semantic-ui-react";

class BookmarkCard extends Component {
  render() {
    return (
      <>
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
              {/* <Card.Header>Steve Sanders</Card.Header> */}
              <Card.Meta>
                Friends of Elliot Friends of Elliot Friends of Elliot Friends of
                Elliot Friends of Elliot Friends of Elliot{" "}
              </Card.Meta>
              {/* <Card.Description>
                Steve wants to add you to the group{" "}
                <strong>best friends</strong>
              </Card.Description> */}
              <Label attached='bottom left'>UI/UX</Label>
            </Card.Content>
            {/* <Card.Content>
              <Label as="a" color="yellow" image floated='right'>
                <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
                Helen
                <Label.Detail>Co-worker</Label.Detail>
              </Label>

                </Card.Content> */}
            {/* <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Approve
                </Button>
                <Button basic color="red">
                  Decline
                </Button>
              </div>
            </Card.Content> */}
          </Card>
        </Grid.Column>
      </>
    );
  }
}

export default BookmarkCard;
