/*global chrome*/
import React, { useEffect, useState } from "react";
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import SearchComponent from "./Search/SearchBookmark";
import SearchAndFilter from "./Search/SearchandFilter";
import { extractHostname,filterList,debounce } from "../app/common/util/Util";


const PopupContainer = () => {
  let [flattenedBookmarks, setFlattenedBookmarks] = useState([]);
  let [filteredBookmarks,setFilteredBookmarks] = useState([]);
  let [bookmarkFolders,setBookmarkFolders] = useState([]);
  let [selectedFolder,setFolder]=useState('');
  let [searchedText,setSearchedText]=useState('');
  let [isDropDownOpen,setisDropDownOpen] =useState(false);
  let [localBookmarks,setBookmarks]=useState([]);

  useEffect(() => {
    var port = chrome.extension.connect({
      name: "Sample Communication"
    });
    console.log(port);
    port.postMessage("Hi BackGround");
    port.onMessage.addListener(function(msg) {
      setFlattenedBookmarks(msg);
      console.log("message recieved \n" + JSON.stringify(flattenedBookmarks));
    });
  }, []);

  useEffect(()=>{
      addBookmarksInState(18);
      window.onscroll = debounce(() => {
        let scrollTop = document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let bodyHeight = document.documentElement.scrollHeight - windowHeight;
        let scrollPercentage = scrollTop / bodyHeight;

        console.log(scrollTop, windowHeight, bodyHeight, scrollPercentage);

        // if the scroll is more than 70% from the top, load more content.
        if (scrollPercentage > 0.7) {
          // Load more content!
          addBookmarksInState(21);
        }
      }, 100);  
    if (flattenedBookmarks.length > 0) {
      let folders = [];
      flattenedBookmarks.map(name => {
        if (!folders.includes(name.category)) {
          folders.push(name.category);
        }
      });
      folders.sort();
      folders.unshift("-- Select all --");
      setBookmarkFolders(folders);
  };
  },[flattenedBookmarks])

  const addBookmarksInState = numberOfBookmarks => {
    setTimeout(() => {
      if (
        localBookmarks.length + numberOfBookmarks <
        flattenedBookmarks.length
      ) {
        setBookmarks(flattenedBookmarks.slice(0,localBookmarks.length + numberOfBookmarks));
      } else if (
        flattenedBookmarks.length - localBookmarks.length > 0 &&
        flattenedBookmarks.length - localBookmarks.length <=
          numberOfBookmarks
      ) {
        setBookmarks(flattenedBookmarks.slice(0));
      }
    }, 0);
  };

  const open_CloseDropdown=()=>{
    setisDropDownOpen(!isDropDownOpen);
  }

  const searchBookmarkWithinFolder = (searchedText, selectedFolder) => {
    setSearchedText(searchedText);
    setFolder(selectedFolder);
    let filteredBookmarks = [];
    //no folder selected
    if (selectedFolder === "-- Select all --" || selectedFolder === "") {
      //no folder selected no searchtext selected
      if (searchedText === "") filteredBookmarks = [...flattenedBookmarks];
      //no folder selected some searchtext selected
      else
        filteredBookmarks = filterList(searchedText, flattenedBookmarks);
      //some folder selected
    } else {
      //some folder selected no searchtext selected
      if (searchedText === "") {
        filteredBookmarks = flattenedBookmarks.filter(
          element => element.category === selectedFolder
        );
      }
      //some folder selected some searchtext selected
      else
        filteredBookmarks = filterList(
          searchedText,
          flattenedBookmarks.filter(
            element => element.category === selectedFolder
          )
        );
    }
    // this.props.setLocalBookmarks(filteredBookmarks);
    // this.props.addBookmarksInState(15);
    setFilteredBookmarks(filteredBookmarks);
  };
  
  // const setSearchedTerm=(text)=>{ console.log('setSearchedTerm',text);};
  // const setselectedFolder=(folder)=>{console.log('setselectedFolder',folder); };
  let Bookamrks = (searchedText ||selectedFolder)?filteredBookmarks:localBookmarks;
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
          optionList={bookmarkFolders}
          setSearchedText={searchBookmarkWithinFolder}
          setSelectedFolder={searchBookmarkWithinFolder}
          open_CloseDropdown={open_CloseDropdown}
          SearchedText={searchedText}
          SelectedFolder={selectedFolder}
          IsDropDownOpen={isDropDownOpen}
        />
      </div>
      {Bookamrks.length > 0 && (
        <div className="recommendation-card-container">
          {console.log("inside render")}
          {console.log(Bookamrks)}
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
};

export default PopupContainer;
