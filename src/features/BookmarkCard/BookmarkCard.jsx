import React, { Component } from "react";
import { Card, Image, Label, Icon } from "semantic-ui-react";
import { extractHostname,generateImageName } from "../../app/common/util/Util";
import Hover from "../../app/common/Component/Hover";
import Configs from "../../app/common/constants";

class BookmarkCard extends Component {
  onCategoryClick = e => {
    e.preventDefault();
    this.props.setSelectedFolderAndFilter(e.target.innerText);
  };

  isImageLoaded = true;

  onImageLoad = (e)=> {
    e.target.style = { visibility: "visible" };
    e.target.parentElement.style = { visibility: "visible" };
  };

  onImageError = (e) => {
    // this.props.setImageReceiveFailure();
    this.isImageLoaded = false;
    // e.target.src = 'some default image url'
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
        <span className="ui transparent floating label context-icons">
          <Icon name='pin' />
          <Icon name='edit' />
          <Icon name='delete' />
        </span>
      
        {/* <Label as='a' color='grey' ribbon='right'>
          <Icon name='pin' />
        </Label> */}
          {this.isImageLoaded && (
            <div
              className="imageContainer"
              style={{ backgroundColor: colorsMap[bookmark.category] }}
            >
              <span className="initialAltText">
                {extractHostname(bookmark.url).charAt(0)}
              </span>
              <div className="overlay" style={{ visibility: "hidden" }}>
                <Image
                  className="imageThubmbnail"
                  floated="right"
                  size="tiny"
                  src={Configs.imageurl+generateImageName(bookmark.url)}
                  style={{ visibility: "hidden" }}
                  onLoad={this.onImageLoad}
                  onError={this.onImageError}
                />
              </div>
            </div>
          )}
          {!this.isImageLoaded && (
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
