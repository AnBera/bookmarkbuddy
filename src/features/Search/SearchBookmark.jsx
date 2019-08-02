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
import { populateRandomColor } from '../../app/common/util/Util';
import FolderDistributionAnalytics from "../AnalyticsCard/FolderDistributionAnalytics";

class SearchComponent extends Component {
  componentWillMount = () => {
    if (this.props.bookmarks.length > 0) {
      let folders = [];
      this.props.bookmarks.map(name => {
        if (!folders.includes(name.category)) {
          folders.push(name.category);
        }
      });
      folders.sort();
      folders.unshift("-- Select all --");
      this.props.setBookmarkFolders(folders);
      this.props.setColorsMap(populateRandomColor(folders));
    }
  };

  //https://codesandbox.io/s/62x4mmxr0n
  filterList = (q, list) => {
    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    const words = q
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s);
    const hasTrailingSpace = q.endsWith(" ");
    let result =[];
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            // The last word - ok with the word being "startswith"-like
            return `(?=.*\\b${escapeRegExp(word)})`;
          } else {
            // Not the last word - expect the whole word exactly
            return `(?=.*\\b${escapeRegExp(word)}\\b)`;
          }
        })
        .join("") + ".+",
      "gi"
    );
    result = list.filter(item => {
      return searchRegex.test(item.title);
    });
    result.push(...list.filter(item => {
      return searchRegex.test(item.url);
    }));

    return result.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
  }

  searchBookmarkWithinFolder = (searchedText, selectedFolder) => {
    this.props.setSearchedTerm(searchedText);
    this.props.setSelectedFolder(selectedFolder);
    let filteredBookmarks = [];
    
    //no folder selected
    if (selectedFolder === "-- Select all --" || selectedFolder === "") {
      //no folder selected no searchtext selected
      if(searchedText === "")
        filteredBookmarks = [...this.props.bookmarks];
      //no folder selected some searchtext selected
      else
        filteredBookmarks = this.filterList(searchedText, this.props.bookmarks);
    //some folder selected
    } else { 
      //some folder selected no searchtext selected
      if(searchedText === "")
        filteredBookmarks =  this.props.bookmarks.filter(
          element => element.category === selectedFolder 
        );
      //some folder selected some searchtext selected
      else
        filteredBookmarks = this.filterList(searchedText, this.props.bookmarks.filter(
          element => element.category === selectedFolder 
        ));
      
      // filteredBookmarks.filter(
      //   element =>
      //     // element.category !== "-- Select all --" &&
      //     element.category === selectedFolder &&
      //     (element.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()) || element.url.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
      // )
    };
    this.props.setLocalBookmarks(filteredBookmarks);
    this.props.addBookmarksInState(15);
    this.props.setFilteredBookmarks({ bookmarks: filteredBookmarks });
  }

  open_CloseDropdown = () => {
    this.props.setOpenCloseDropDown();
  };

  render() {
    // const dataFolderDistribution = [
    //   {
    //     "id": "stylus",
    //     "label": "stylus",
    //     "value": 69,
    //     "color": "hsl(263, 70%, 50%)"
    //   },
    //   {
    //     "id": "python",
    //     "label": "python",
    //     "value": 182,
    //     "color": "hsl(0, 0%, 80%)"
    //   }
    // ];
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
      <Grid.Column width={5} style={{ height:"70px", width:"50%"}}>
        {/* <FolderDistributionAnalytics data={dataFolderDistribution} /> */}
        <div className="folder-perc-container">
            <div id="activeBorder" className="active-border" style={{display:"inline-block", float:"left"}}>
                <div id="circle" className="circle">
                    <span className="prec 270" id="prec">20%</span>
                </div>
            </div>
            <div className="folder-info" style={{display:"inline-block", marginLeft:".75em", marginTop:".6em"}}>
              <div className="info-header" style={{fontSize: "1.15em"}} >
              Folder <strong>JS</strong>
              </div>
            <div className="info-body">Contains 20% of Bookmarks</div></div>
        </div>
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
    setColorsMap: (colorsMap) => {
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
