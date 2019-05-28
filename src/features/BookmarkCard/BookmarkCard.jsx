import React, { Component } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";

class BookmarkCard extends Component {
  onCategoryClick = (e) => {
    e.preventDefault();
    this.props.setSelectedFolderAndFilter(e.target.innerText);
  };

  render() {
    const { bookmark } = this.props;
    return (
      //   <Grid.Column>
      <Card fluid>
        <Card.Content href={bookmark.url}>
          <Image
            floated="right"
            size="tiny"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          {/*TODO use onclick to filter based on sitename */}
          <div className="url-heading">
            <Image
              className="padding-right-medium"
              src={`chrome://favicon/${bookmark.Url}`}
            />
            {extractHostname(bookmark.url)}
          </div>
          <Card.Meta>{bookmark.title}</Card.Meta>
          <Label attached="bottom right" onClick={this.onCategoryClick}>
            {bookmark.category}
            <span className="category"></span>
          </Label>
        </Card.Content>
      </Card>
      //   </Grid.Column>
    );
  }
}

export default BookmarkCard;
