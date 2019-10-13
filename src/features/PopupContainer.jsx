/*global chrome*/
import React, { Component } from "react";
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import SearchAndFilter from "./Search/SearchandFilter";
import { extractHostname,filterList,debounce } from "../app/common/util/Util";


class PopupContainer extends Component {
  constructor(props) {
    super(props);
  this.state={
    flattenedBookmarks:[],
    filteredBookmarks:[],
    bookmarkFolders:[],
    selectedFolder:'',
    searchedText:'',
    isDropDownOpen:false,
    BookmarksInState:[]
  }
}
 localBookmarks=[];

componentDidMount(){
  var that=this;
    var port = chrome.extension.connect({
      name: "Sample Communication"
    });
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
      that.setState({flattenedBookmarks: msg},()=>
      {console.log("Bookmarks recieved \n" + JSON.stringify(that.state.flattenedBookmarks))});
    });  
    // this.setState({flattenedBookmarks: books},()=>
    // {console.log("Bookmarks recieved \n" + JSON.stringify(this.state.flattenedBookmarks))});  
  }

  componentWillUpdate(newProps,newState){
    if(this.state.flattenedBookmarks.length===0 && newState.flattenedBookmarks.length>0)
    {this.localBookmarks.push(...newState.flattenedBookmarks);
      this.addBookmarksInState(18);
      window.onscroll = debounce(() => {
        let scrollTop = document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let bodyHeight = document.documentElement.scrollHeight - windowHeight;
        let scrollPercentage = scrollTop / bodyHeight;

        console.log(scrollTop, windowHeight, bodyHeight, scrollPercentage);

        // if the scroll is more than 70% from the top, load more content.
        if (scrollPercentage > 0.7) {
          // Load more content!
          this.addBookmarksInState(21);
        }
      }, 100);  
    if (newState.flattenedBookmarks.length > 0) {
      let folders = [];
      newState.flattenedBookmarks.map(name => {
        if (!folders.find(item => item.key === name.category)) {
          folders.push({
            key: name.category,
            text: name.category,
            value: name.category,
          });
        }
      });
      folders.sort();
      folders.unshift({
        key: "-- Select all --",
        text:"-- Select all --",
        value:"-- Select all --",
      });
      this.setState({bookmarkFolders:folders});
  };
}
  }

  addBookmarksInState = numberOfBookmarks => {
    setTimeout(() => {
      debugger;
      if (
       this.state.BookmarksInState.length + numberOfBookmarks <
        this.localBookmarks.length
      ) {        
        this.setState({BookmarksInState:this.localBookmarks.slice(0,this.state.BookmarksInState.length + numberOfBookmarks)});
      } else if (
        this.localBookmarks.length - this.state.BookmarksInState.length > 0 &&
        this.localBookmarks.length - this.state.BookmarksInState.length <=
          numberOfBookmarks
      ) {
        this.setState({BookmarksInState:this.localBookmarks.slice(0)});
      }
    }, 0);
  };

  open_CloseDropdown=()=>{
    this.setState({isDropDownOpen:!this.state.isDropDownOpen});
  }

  searchBookmarkWithinFolder = (searchedText, selectedFolder) => {
    this.setState({searchedText:searchedText});
    this.setState({selectedFolder:selectedFolder});
    let filteredBookmarks = [];
    //no folder selected
    if (selectedFolder === "-- Select all --" || selectedFolder === "") {
      //no folder selected no searchtext selected
      if (searchedText === "") filteredBookmarks = [...this.state.flattenedBookmarks];
      //no folder selected some searchtext selected
      else
        filteredBookmarks = filterList(searchedText, this.state.flattenedBookmarks);
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
    // this.props.setLocalBookmarks(filteredBookmarks);
    // this.props.addBookmarksInState(15);
    this.setState({filteredBookmarks:filteredBookmarks});
  };
  
  // const setSearchedTerm=(text)=>{ console.log('setSearchedTerm',text);};
  // const setselectedFolder=(folder)=>{console.log('setselectedFolder',folder); };
  //let Bookamrks = (searchedText ||selectedFolder)?filteredBookmarks:BookmarksInState;
  render(){
    let Bookamrks = (this.state.searchedText ||this.state.selectedFolder)?this.state.filteredBookmarks:this.state.BookmarksInState;
  return (
    <>
    {/* <style>
    .search-container .text-wrapper{
          width: 100%;
    }
    </style> */}
      <div
        style={{
          backgroundColor: "#161626",
          textAlign: "center",
          height: "60px",
          paddingTop: "1em"
        }}
      >
        <img src={BookmarkbuddyLogoGrey3} style={{width: "70%"}} alt="BookmarkBuddy" />
      </div>
      <div style={{padding: "0 1em"}}>
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
      {Bookamrks.length > 0 && (
        <div className="recommendation-card-container">
          {Bookamrks.map((bookmark, i) => (
            <Card
              fluid
              className="recommendation-card"
              href={bookmark.url}
              key={bookmark.id}
              target="_blank"
            >
              <Card.Content>
                <div className="url-heading">
                  <Image
                    className="padding-right-medium"
                    src={`chrome://favicon/${bookmark.Url}`}
                  />
                  {extractHostname(bookmark.url)}
                </div>
                <Card.Meta>{bookmark.title}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
      <div style={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "#282c34",
        width: "100%",
        padding: "1em"
      }}>
        <Button Id="openFull" basic color="green" inverted>
          <Icon name="external alternate" /> Open Full view
        </Button>
      </div>
    </>
  );
}
}

export default PopupContainer;
