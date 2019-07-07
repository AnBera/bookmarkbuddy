import React, { Component } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";
import Hover from "../../app/common/Component/Hover";
import Configs from "../../app/common/constants";

class BookmarkCard extends Component {
  onCategoryClick = e => {
    e.preventDefault();
    this.props.setSelectedFolderAndFilter(e.target.innerText);
  };

  render() {
    const { bookmark, colorsMap } = this.props;
    let style = {
      borderBottomColor: colorsMap[bookmark.category]
    };
    // let hoverStyle = {
    //   backgroundColor: colorsMap[bookmark.category],
    // };
    return (
      //   <Grid.Column>
      <Card fluid>
        <Card.Content href={bookmark.url}>
          {this.props.isconvertedSuccessfully && (
            <div
              className="imageContainer"
              style={{ backgroundColor: colorsMap[bookmark.category] }}
            >
              <Image
                className="imageThubmbnail"
                floated="right"
                size="tiny"
                src={Configs.imageurl + extractHostname(bookmark.url) + '.png'}
              />
            </div>
          )}
          {!this.props.isconvertedSuccessfully && (
            <div
              className="imageContainer"
              style={{ backgroundColor: colorsMap[bookmark.category] }}
            >
              <span className="initialAltText">
                {extractHostname(bookmark.url).charAt(0)}
              </span>
              <Image floated="right" size="tiny" src="" />
            </div>
          )}
          {/*TODO use onclick to filter based on sitename */}
          <div className="url-heading">
            <Image
              className="padding-right-medium"
              src={`chrome://favicon/${bookmark.Url}`}
            />
            {extractHostname(bookmark.url)}
          </div>
          <Card.Meta>{bookmark.title}</Card.Meta>
          <Hover
            onHover={
              <Label
                attached="bottom left"
                style={{ backgroundColor: colorsMap[bookmark.category] }}
                onClick={this.onCategoryClick}
              >
                {bookmark.category}
                <span className="category" />
              </Label>
            }
          >
            <Label attached="bottom left" onClick={this.onCategoryClick}>
              {bookmark.category}
              <span className="category" style={style} />
            </Label>
          </Hover>
        </Card.Content>
      </Card>
      //   </Grid.Column>
    );
  }
}

export default BookmarkCard;
