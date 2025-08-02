/*global chrome*/
import React, { Component } from "react";
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey.png";
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
    var port = chrome.runtime.connect({
      name: "Sample Communication"
    });
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
      that.setState({ flattenedBookmarks: msg }, () => {
        console.log("Bookmarks recieved");
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
    return hex;
  };
  updateHitCount = (url, shardKey) => {
    increaseHitCount({
      uniqueID: this.state.userId,
      url: url,
      shardKey: shardKey
    });
  };
  onBookmarkLinkClick = bookmark => event => {
    event.preventDefault();
    this.updateHitCount(bookmark.url, extractHostname(bookmark.url).charAt(0));
    chrome.tabs.create({
      url: bookmark.url,
      active: false
    });
  };
  handleContextRef = ref => {
    if (ref) {
      ref.onscroll = debounce(() => {
        let scrollTop = ref.scrollTop;
        let windowHeight = ref.clientHeight; //ref.innerHeight;
        let bodyHeight = ref.scrollHeight - windowHeight;
        let scrollPercentage = scrollTop / bodyHeight;

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

  setSearchedText = searchedText => {
    this.setState({ searchedText: searchedText });
    this.filterResult(searchedText, "SearchText");
  };

  searchBookmarkWithinFolder = selectedFolder => {
    this.setState({ selectedFolder: selectedFolder });
    this.filterResult(selectedFolder, "Folder");
  };

  filterResult = (value, type) => {
    let selectedFolder = type === "Folder" ? value : this.state.selectedFolder;
    let searchedText = type === "SearchText" ? value : this.state.searchedText;
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
      <div style={{ width: "350px", overflowX: "clip" }}>
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
            setSearchedText={this.setSearchedText}
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
                onClick={this.onBookmarkLinkClick(bookmark)}
                className="recommendation-card"
                href={bookmark.url}
                key={bookmark.id}
                // target="_blank"
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
            padding: "1em",
            textAlign: "center",
            zIndex: "999"
          }}
        >
          <Button Id="openFull" basic color="green" inverted>
            <Icon name="external alternate" /> Open Full view
          </Button>
        </div>
      </div>
    );
  }
}

export default PopupContainer;
