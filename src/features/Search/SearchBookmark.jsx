import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  setFilteredBookmarks,
  setBookmarkFolders,
  setSearchedTerm,
  setSelectedFolder,
  setIsSearchFolderDropDownOpen,
  setColorsMap
} from "../../redux/Actions/ActionTypes/DashBoardActions";
import SearchAndFilter from "./SearchandFilter";
import { populateRandomColor,filterList } from "../../app/common/util/Util";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarksInsideFolder: 0
    };
  }

  componentWillMount = () => {
    if (this.props.bookmarks.length > 0) {
      let folders = [];
      this.props.bookmarks.map(name => {
        if (!folders.find(item => item.key === name.category)) {
          folders.push({
            key: name.category,
            text: name.category,
            value: name.category,
          });
        }
      });
      folders.sort();
      folders.unshift("-- Select all --");
      this.props.setBookmarkFolders(folders);
      this.props.setColorsMap(populateRandomColor(folders));
    }
  };

  

  searchBookmarkWithinFolder = (searchedText, selectedFolder) => {
    this.props.setSearchedTerm(searchedText);
    this.props.setSelectedFolder(selectedFolder==="-- Select all --"?"":selectedFolder);
    let filteredBookmarks = [];

    //no folder selected
    if (selectedFolder === "-- Select all --" || selectedFolder === "") {
      //no folder selected no searchtext selected
      if (searchedText === "") filteredBookmarks = [...this.props.bookmarks];
      //no folder selected some searchtext selected
      else
        filteredBookmarks = filterList(searchedText, this.props.bookmarks);
      //some folder selected
    } else {
      //some folder selected no searchtext selected
      if (searchedText === "") {
        filteredBookmarks = this.props.bookmarks.filter(
          element => element.category === selectedFolder
        );
        this.setState({ bookmarksInsideFolder: filteredBookmarks.length });
      }
      //some folder selected some searchtext selected
      else
        filteredBookmarks = filterList(
          searchedText,
          this.props.bookmarks.filter(
            element => element.category === selectedFolder
          )
        );

      // filteredBookmarks.filter(
      //   element =>
      //     // element.category !== "-- Select all --" &&
      //     element.category === selectedFolder &&
      //     (element.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()) || element.url.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
      // )
    }
    this.props.setLocalBookmarks(filteredBookmarks);
    this.props.addBookmarksInState(15);
    this.props.setFilteredBookmarks({ bookmarks: filteredBookmarks });
  };

  open_CloseDropdown = () => {
    this.props.setOpenCloseDropDown();
  };

  render() {
    return (
      <>
        <Grid.Column width={11}>
          <SearchAndFilter
            optionList={this.props.bookmarkFolders}
            setSearchedText={this.searchBookmarkWithinFolder}
            setSelectedFolder={this.searchBookmarkWithinFolder}
            open_CloseDropdown={this.open_CloseDropdown}
            SearchedText={this.props.searchTerm}
            SelectedFolder={this.props.selectedFolder}
            IsDropDownOpen={this.props.isDropDownOpen}
          />
        </Grid.Column>
        <Grid.Column width={5} style={{ height: "70px", width: "50%" }}>
          {this.props.selectedFolder && (
            <div className="folder-perc-container">
              <div
                id="activeBorder"
                className="active-border"
                style={{ display: "inline-block", float: "left" }}
              >
                <div id="circle" className="circle">
                  <span className="prec 270" id="prec">
                    {Math.ceil(
                      (this.state.bookmarksInsideFolder /
                        this.props.bookmarks.length) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
              <div
                className="folder-info"
                style={{
                  display: "inline-block",
                  marginLeft: ".75em",
                  marginTop: ".6em"
                }}
              >
                <div className="info-header" style={{ fontSize: "1.15em" }}>
                  <strong>{this.props.selectedFolder}</strong>
                </div>
                <div className="info-body">
                  Contains{" "}
                  {Math.ceil(
                    (this.state.bookmarksInsideFolder /
                      this.props.bookmarks.length) *
                      100
                  )}
                  % of Bookmarks
                </div>
              </div>
            </div>
          )}
          {!this.props.selectedFolder && (
            <div
              className="folder-info"
              style={{
                display: "inline-block",
                marginLeft: ".75em",
                marginTop: ".6em"
              }}
            >
              <div className="info-header" style={{ fontSize: "1.15em" }}>
               Total <strong>{this.props.bookmarkFolders.length}</strong> folders
              </div>
              <div className="info-body">
                Contains {this.props.bookmarks.length} bookmarks.
              </div>
            </div>
          )}
        </Grid.Column>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkFolders: folders => {
      dispatch(setBookmarkFolders(folders));
    },
    setSearchedTerm: text => {
      dispatch(setSearchedTerm(text));
    },
    setSelectedFolder: folder => {
      dispatch(setSelectedFolder(folder));
    },
    setOpenCloseDropDown: () => {
      dispatch(setIsSearchFolderDropDownOpen());
    },
    setFilteredBookmarks: (bookmarks = []) => {
      dispatch(setFilteredBookmarks(bookmarks));
    },
    setColorsMap: colorsMap => {
      dispatch(setColorsMap(colorsMap));
    }
  };
};

const mapStateToProps = state => ({
  bookmarks: state.DashBoardReducer.Bookmarks,
  searchTerm: state.DashBoardReducer.searchTerm,
  selectedFolder: state.DashBoardReducer.selectedFolder,
  bookmarkFolders: state.DashBoardReducer.bookmarkFolders,
  isDropDownOpen: state.DashBoardReducer.isDropDownOpen,
  FilteredBookmarks: state.DashBoardReducer.FilteredBookmarks
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
