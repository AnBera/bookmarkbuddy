/*global chrome*/
import React, { Component } from "react";
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import SearchAndFilter from "./Search/SearchandFilter";
import { extractHostname, filterList, debounce } from "../app/common/util/Util";
import { increaseHitCount } from "../services/PreviewBookmarkService";

class PopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flattenedBookmarks: [],
      filteredBookmarks: [],
      bookmarkFolders: [],
      selectedFolder: "",
      searchedText: "",
      isDropDownOpen: false,
      BookmarksInState: [],
      userId: ""
    };
    // this.popupcardcontainerref = React.createRef();
  }
  localBookmarks = [];

  componentWillMount() {
    this.setUserID();
  }
  componentDidMount() {
    var that = this;
    var port = chrome.extension.connect({
      name: "Sample Communication"
    });
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
      that.setState({ flattenedBookmarks: msg }, () => {
        console.log(
          "Bookmarks recieved \n" +
            JSON.stringify(that.state.flattenedBookmarks)
        );
      });
    });
  }
  setUserID = () => {
    chrome.storage.sync.get(["uniqueID"], items => {
      if (Object.keys(items).length === 0 && items.constructor === Object) {
        let userid = this.getRandomToken();
        chrome.storage.sync.set({ uniqueID: userid }, () => {
          this.setState({ userId: items.uniqueID });
        });
      } else {
        this.setState({ userId: items.uniqueID });
      }
    });
  };

  getRandomToken = () => {
    let randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    let hex = "";
    for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    console.log(hex);
    return hex;
  };
  updateHitCount = (url, shardKey) => {
    increaseHitCount({
      uniqueID: this.state.userId,
      url: url,
      shardKey: shardKey
    });
  };
  handleContextRef = ref => {
    console.log(ref);
    if (ref) {
      console.log(ref.current);

      ref.onscroll = debounce(() => {
        console.log("scrolling happening!");
        let scrollTop = ref.scrollTop;
        let windowHeight = ref.clientHeight; //ref.innerHeight;
        let bodyHeight = ref.scrollHeight - windowHeight;
        let scrollPercentage = scrollTop / bodyHeight;

        console.log(scrollTop, windowHeight, bodyHeight, scrollPercentage);

        // if the scroll is more than 70% from the top, load more content.
        if (scrollPercentage > 0.7) {
          // Load more content!
          this.addBookmarksInState(21);
        }
      }, 100);
    }
  };

  componentWillUpdate(newProps, newState) {
    if (
      this.state.flattenedBookmarks.length === 0 &&
      newState.flattenedBookmarks.length > 0
    ) {
      this.localBookmarks.push(...newState.flattenedBookmarks);
      this.addBookmarksInState(18);
      if (newState.flattenedBookmarks.length > 0) {
        let folders = [];
        newState.flattenedBookmarks.map(name => {
          if (!folders.find(item => item.key === name.category)) {
            folders.push({
              key: name.category,
              text: name.category,
              value: name.category
            });
          }
        });
        folders.sort();
        folders.unshift({
          key: "-- Select all --",
          text: "-- Select all --",
          value: "-- Select all --"
        });
        this.setState({ bookmarkFolders: folders });
      }
    }
  }

  addBookmarksInState = numberOfBookmarks => {
    setTimeout(() => {
      if (
        this.state.BookmarksInState.length + numberOfBookmarks <
        this.localBookmarks.length
      ) {
        this.setState({
          BookmarksInState: this.localBookmarks.slice(
            0,
            this.state.BookmarksInState.length + numberOfBookmarks
          )
        });
      } else if (
        this.localBookmarks.length - this.state.BookmarksInState.length > 0 &&
        this.localBookmarks.length - this.state.BookmarksInState.length <=
          numberOfBookmarks
      ) {
        this.setState({ BookmarksInState: this.localBookmarks.slice(0) });
      }
    }, 0);
  };

  open_CloseDropdown = () => {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
  };

  searchBookmarkWithinFolder = (searchedText, selectedFolder) => {
    this.setState({ searchedText: searchedText });
    this.setState({ selectedFolder: selectedFolder });
    let filteredBookmarks = [];
    //no folder selected
    if (selectedFolder === "-- Select all --" || selectedFolder === "") {
      //no folder selected no searchtext selected
      if (searchedText === "")
        filteredBookmarks = [...this.state.flattenedBookmarks];
      //no folder selected some searchtext selected
      else
        filteredBookmarks = filterList(
          searchedText,
          this.state.flattenedBookmarks
        );
      //some folder selected
    } else {
      //some folder selected no searchtext selected
      if (searchedText === "") {
        filteredBookmarks = this.state.flattenedBookmarks.filter(
          element => element.category === selectedFolder
        );
      }
      //some folder selected some searchtext selected
      else
        filteredBookmarks = filterList(
          searchedText,
          this.state.flattenedBookmarks.filter(
            element => element.category === selectedFolder
          )
        );
    }
    this.localBookmarks = [];
    if (selectedFolder === "-- Select all --" && searchedText === "")
      this.localBookmarks.push(...this.state.flattenedBookmarks);
    else this.localBookmarks.push(...filteredBookmarks);
    this.setState({ BookmarksInState: [] });
    this.addBookmarksInState(15);
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "#161626",
            textAlign: "center",
            height: "60px",
            paddingTop: "1em"
          }}
        >
          <img
            src={BookmarkbuddyLogoGrey3}
            style={{ width: "70%" }}
            alt="BookmarkBuddy"
          />
        </div>
        <div style={{ padding: "0 1em" }}>
          <SearchAndFilter
            optionList={this.state.bookmarkFolders}
            setSearchedText={this.searchBookmarkWithinFolder}
            setSelectedFolder={this.searchBookmarkWithinFolder}
            open_CloseDropdown={this.open_CloseDropdown}
            SearchedText={this.state.searchedText}
            SelectedFolder={this.state.selectedFolder}
            IsDropDownOpen={this.state.isDropDownOpen}
          />
        </div>
        {this.state.BookmarksInState.length > 0 && (
          <div className="popup-card-container" ref={this.handleContextRef}>
            {this.state.BookmarksInState.map((bookmark, i) => (
              <Card
                fluid
                onClick={e =>
                  this.updateHitCount(
                    bookmark.url,
                    extractHostname(bookmark.url).charAt(0)
                  )
                }
                className="recommendation-card"
                href={bookmark.url}
                key={bookmark.id}
                target="_blank"
              >
                <Card.Content target="_blank" href={bookmark.url}>
                  <div className="url-heading">
                    <Image
                      className="padding-right-medium"
                      src={`chrome://favicon/${bookmark.url}`}
                    />
                    {extractHostname(bookmark.url)}
                  </div>
                  <Card.Meta>{bookmark.title}</Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </div>
        )}
        <div
          style={{
            position: "fixed",
            bottom: "0",
            backgroundColor: "#282c34",
            width: "100%",
            padding: "1em"
          }}
        >
          <Button Id="openFull" basic color="green" inverted>
            <Icon name="external alternate" /> Open Full view
          </Button>
        </div>
      </>
    );
  }
}

export default PopupContainer;
