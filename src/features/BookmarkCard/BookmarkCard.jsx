/*global chrome*/
import React, { Component } from "react";
import { Card, Image, Label, Icon } from "semantic-ui-react";
import { extractHostname, generateImageName } from "../../app/common/util/Util";
import Hover from "../../app/common/Component/Hover";
import Configs from "../../app/common/constants";
import { debounce } from "../../app/common/util/Util";
import RemoveBookmark from "./DeleteBookmark"
import FileExplorer from "../Treeview/FileExplorer";

class BookmarkCard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isEdit: false,
      selectedFolder:null };
  }
  onCategoryClick = e => {
    e.preventDefault();
    this.props.setSelectedFolderAndFilter(e.target.innerText);
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

  updateChromeBookmark = bookmark => {
    chrome.bookmarks.update(
      bookmark.id,
      { title: bookmark.title, url: bookmark.url },
      err => {
        this.setState({ isEdit: false });
      }
    );
    if(this.state.selectedFolder){
      chrome.bookmarks.move(bookmark.id, {parentId:this.state.selectedFolder.id,index:this.state.selectedFolder.index},(result)=>{
        this.setState({selectedFolder:null});
        this.props.getUpdateBookmarkTree();
      })
    }
  };

  setselectedFolder=(selectedFolder)=>{
    this.setState({selectedFolder:selectedFolder});
  }

  render() {
    const { bookmark, colorsMap, updateBookamark } = this.props;
    let style = {
      borderBottomColor: colorsMap[bookmark.category]
    };
    let hostName = extractHostname(bookmark.url);
    // let hoverStyle = {
    //   backgroundColor: colorsMap[bookmark.category],
    // };

    return (
      <>
        {!this.state.isEdit && (
          <Card fluid>
            <Card.Content href={bookmark.url}>
              <span className="ui transparent floating label context-icons">
                <Icon name="pin" size='large' />
                <Icon
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isEdit: !this.state.isEdit });
                  }}
                  name="edit"
                  size='large'
                />
                <RemoveBookmark Objbookmark={bookmark}/>
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
                { (hostName.length > 23) ? 
                ((hostName.substring(0,23-3)) + '...') : hostName}
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
        )}
        {this.state.isEdit && (
          <Card fluid>
            <Card.Content>
              <form className="ui form">
                <div className="field">
                  <label style={{color:'#FFFFFF'}}>Bookmark Title</label>
                  <input
                    type="text"
                    onChange={e => {
                      debounce(
                        updateBookamark({ ...bookmark, title: e.target.value }),
                        250
                      );
                    }}
                    required
                    name="title"
                    value={bookmark.title}
                    placeholder="Title"
                  />
                </div>
                <div className="field">
                  <label style={{color:'#FFFFFF'}}>Bookmark Url</label>
                  <input
                    onChange={e => {
                      updateBookamark(
                        debounce(
                          updateBookamark({ ...bookmark, url: e.target.value })
                        ),
                        250
                      );
                    }}
                    type="text"
                    required
                    name="url"
                    value={bookmark.url}
                    placeholder="Url"
                  />
                </div>
                <div className="two fields">
                  <div className="field">
                    <label style={{color:'#FFFFFF'}}>Select Folder</label>
                    <FileExplorer setselectedFolder={(node)=>this.setselectedFolder(node)} bookmarkFolderTree={this.props.bookmarkFolderTree}/>
                  </div>
                </div>
                <button
                  className="ui button"
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.updateChromeBookmark(bookmark);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isEdit: !this.state.isEdit });
                  }}
                  className="ui button"
                  type="submit"
                >
                  Cancel
                </button>
              </form>
            </Card.Content>
          </Card>
        )}
      </>
    );
  }
}

export default BookmarkCard;
