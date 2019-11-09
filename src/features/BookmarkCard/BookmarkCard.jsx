/*global chrome*/
import React, { Component } from "react";
import { Card, Image, Label, Icon } from "semantic-ui-react";
import { extractHostname, generateImageName } from "../../app/common/util/Util";
import Hover from "../../app/common/Component/Hover";
import Configs from "../../app/common/constants";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
} from "react-share";
import RemoveBookmark from "./DeleteBookmark";
import EditBookmark from "../EditBookmark/EditBookmark";
import {
  increaseHitCount,
  increaseShareCount
} from "../../services/PreviewBookmarkService";

class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedFolder: null,
      isDelete: false
    };
  }

  //Changed Bookmark Node Array
  changedBookamrkFolder = [];

  //selectedFolder={};
  onCategoryClick = e => {
    e.preventDefault();
    this.props.setSelectedFolderAndFilter(e.target.innerText);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  isImageLoaded = true;

  onImageLoad = e => {
    e.target.style = { visibility: "visible" };
    e.target.parentElement.style = { visibility: "visible" };
  };

  onImageError = e => {
    // this.props.setImageReceiveFailure();
    this.isImageLoaded = false;
    // e.target.src = 'some default image url'
  };

  closeEditModal = () => {
    this.changedBookamrkFolder.forEach(item => {
      item.isOpen = false;
      item.isSelected = false;
    });
    this.props.getUpdateBookmarkTree();
    this.setState({ isEdit: false }, () => {});
  };
  closeDeleteModal = () => {
    this.setState({ isDelete: false }, () => {});
  };

  updateHitCount = (event, url, shardKey) => {
    if (
      event &&
      event.target &&
      !["circle", "path"].includes(event.target.tagName)
    ) {
      increaseHitCount({
        uniqueID: this.props.userId,
        url: url,
        shardKey: shardKey
      });
    }
  };
  updateShareCount = (event, url, shardKey) => {
    increaseShareCount({
      uniqueID: this.props.userId,
      url: url,
      shardKey: shardKey
    });
  };

  render() {
    const { bookmark, colorsMap } = this.props;
    let style = {
      borderBottomColor: colorsMap[bookmark.category]
    };
    let hostName = extractHostname(bookmark.url);

    return (
      <>
        {!this.state.isEdit && (
          <Card fluid>
            <Card.Content
              onClick={e =>
                this.updateHitCount(e, bookmark.url, hostName.charAt(0))
              }
              target="_blank"
              href={bookmark.url}
            >
              <span className="ui transparent floating label context-icons">
                <Icon
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isEdit: !this.state.isEdit });
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                  name="edit"
                  size="large"
                />
                <Icon
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isDelete: !this.state.isDelete });
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                  size="large"
                  name="trash"
                />
              </span>

              {this.isImageLoaded && (
                <div
                  className="imageContainer"
                  style={{ backgroundColor: colorsMap[bookmark.category] }}
                >
                  <span className="initialAltText">{hostName.charAt(0)}</span>
                  <div className="overlay" style={{ visibility: "hidden" }}>
                    <Image
                      className="imageThubmbnail"
                      floated="right"
                      size="tiny"
                      src={Configs.imageurl + generateImageName(bookmark.url)}
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
                  <span className="initialAltText">{hostName.charAt(0)}</span>
                  <Image floated="right" size="tiny" src="" />
                </div>
              )}
              {/*TODO use onclick to filter based on sitename */}
              <div className="url-heading">
                <Image
                  className="padding-right-medium"
                  src={`chrome://favicon/${bookmark.Url}`}
                />
                {hostName.length > 23
                  ? hostName.substring(0, 23 - 3) + "..."
                  : hostName}
              </div>
              <Card.Meta>{bookmark.title}</Card.Meta>
              <Hover
                onHover={
                  <Label
                    attached="bottom left"
                    style={{ backgroundColor: colorsMap[bookmark.category] }}
                    onClick={this.onCategoryClick}
                  >
                    <Icon name="folder" />
                    {bookmark.category}
                    <span className="category" />
                  </Label>
                }
              >
                <Label
                  attached="bottom left"
                  onClick={e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    this.onCategoryClick();
                  }}
                >
                  <Icon name="folder" />
                  {bookmark.category}
                  <span className="category" style={style} />
                </Label>
              </Hover>

              <Label attached="bottom right share-icons-container">
                <div
                  className="share-icons"
                  onClick={e =>
                    this.updateShareCount(e, bookmark.url, hostName.charAt(0))
                  }
                >
                  <FacebookShareButton
                    url={bookmark.Url}
                    quote={`Shared via Bookmarkbuddy:${bookmark.title}`}
                  >
                    <FacebookIcon round={true} size={"1.5rem"}></FacebookIcon>
                  </FacebookShareButton>

                  <TwitterShareButton
                    round={true}
                    url={bookmark.Url}
                    title={`Shared via Bookmarkbuddy:${bookmark.title}`}
                  >
                    <TwitterIcon round={true} size={"1.5rem"}></TwitterIcon>
                  </TwitterShareButton>
                  <LinkedinShareButton
                    round={true}
                    url={bookmark.Url}
                    title={`Shared via Bookmarkbuddy:${bookmark.title}`}
                  >
                    <LinkedinIcon round={true} size={"1.5rem"}></LinkedinIcon>
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    round={true}
                    url={bookmark.Url}
                    title={`Shared via Bookmarkbuddy:${bookmark.title}`}
                  >
                    <WhatsappIcon round={true} size={"1.5rem"}></WhatsappIcon>
                  </WhatsappShareButton>
                </div>
              </Label>
            </Card.Content>
          </Card>
        )}
        <RemoveBookmark
          Objbookmark={bookmark}
          isOpen={this.state.isDelete}
          closeModal={this.closeDeleteModal}
        />
        <EditBookmark
          changedBookamrkFolder={this.changedBookamrkFolder}
          bookmarkFolderTree={this.props.bookmarkFolderTree}
          updateBookamark={this.props.updateBookamark}
          colorsMap={colorsMap}
          selectedBookmark={bookmark}
          isOpen={this.state.isEdit}
          closeModal={this.closeEditModal}
        />
      </>
    );
  }
}

export default BookmarkCard;
