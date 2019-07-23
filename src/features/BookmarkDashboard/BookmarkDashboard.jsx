/*global chrome*/
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import { flattenNode, extractUrlsFromBookmarks, extractHostname } from "../../app/common/util/Util";
import { connect } from "react-redux";
import {
  setMostVisitedSites,
  setBookmarks,
  setSelectedFolder,
  setFilteredBookmarks,
  setSearchedTerm,
  setRecentBookmarks,
  generatePreviewImages
} from "../../redux/Actions/ActionTypes/DashBoardActions";
import SearchComponent from "../Search/SearchBookmark";
import BookmarkRecentCard from "../BookmarkCard/BookmarkRecentCard";
import debounce from "lodash.debounce";
import {
  Menu,
  Breadcrumb,
  Header,
  Sticky,
  Rail,
  Segment,
  List
} from "semantic-ui-react";
import BookmarkbuddyLogoGrey3 from "../../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { SortTypes } from '../../app/common/constants';

class BookmarkDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      context: null,
      context2: null,
      activeItem: 'home'
    };
  }
  componentWillMount() {
    this.getBookmarks();
  }

  onSortCategoryClick = (sortcategory) => () => {
    this.localBookmarks.sort((a,b) => {
      if(sortcategory === SortTypes.URL) {
        return (extractHostname(a[sortcategory]) > extractHostname(b[sortcategory])) ? 1 : ((extractHostname(b[sortcategory]) > extractHostname(a[sortcategory])) ? -1 : 0);
      }
      if(sortcategory === SortTypes.DATE_ADDED) {
        return (a[sortcategory] > b[sortcategory]) ? -1 : ((b[sortcategory] > a[sortcategory]) ? 1 : 0);
      }
      return (a[sortcategory] > b[sortcategory]) ? 1 : ((b[sortcategory] > a[sortcategory]) ? -1 : 0);
    });
    this.setState({bookmarks: []});
    this.addBookmarksInState(18);
  }

  localBookmarks = [];

  setLocalBookmarks = bookmarks => {
    this.localBookmarks = [];
    this.localBookmarks.push(...bookmarks);
    //TODO move it to another method, reset the bookmarks in state
    this.setState({bookmarks : []});
  }

  handleContextRef = ref => {
    this.setState({ context: ref });
  };

  handleContextRef2 = ref => {
    this.setState({ context2: ref });
  };
  componentWillReceiveProps(nextProps) {

    // if (nextProps.bookmarks.length > 0 && this.props.bookmarks !== nextProps.bookmarks) {
    //   this.localBookmarks = this.props.FilteredBookmarks;
    //   this.setState({bookmarks : []});
    //   this.addBookmarksInState(18);
    // }

    if (nextProps.bookmarks.length > 0 && this.props.bookmarks !== nextProps.bookmarks && !this.props.isImagesConverted) {
      this.props.callGenerateImages(extractUrlsFromBookmarks(nextProps.bookmarks).slice(0, 6));
      // this.props.callGenerateImages(["https://www.google.com", "https://www.flipkart.com", "https://www.amazon.com", "https://www.github.com", "https://www.youtube.com"]);
    }
  }

  getBookmarks = () => {
    console.log("getbookmark called");
    let flattenedBookmarks = [];

    //============
    // const bookmarks = { "children": [{ "children": [{ "dateAdded": 1374042255838, "id": "15", "index": 0, "parentId": "1", "title": "Work and its secret", "url": "http://www.ramakrishnavivekananda.info/vivekananda/volume_2/work_and_its_secret.htm" }, { "children": [{ "dateAdded": 1516005732014, "id": "19", "index": 0, "parentId": "16", "title": "KickAssTorrents (kat) Proxy, unblock | Proxy Of All Websites", "url": "https://proxyof.com/kickasstorrents-proxy-unblock/" }, { "dateAdded": 1516005769932, "id": "20", "index": 1, "parentId": "16", "title": "ExtraTorrent proxy | Proxy Of All Websites", "url": "https://proxyof.com/extratorrent-proxy/" }, { "dateAdded": 1516079973970, "id": "21", "index": 2, "parentId": "16", "title": "RARBG Rarbg Index page", "url": "https://rarbg.to/index8.php" }, { "dateAdded": 1516977988894, "id": "22", "index": 3, "parentId": "16", "title": "Download Movies, Tv Shows, Musics Torrent - Movcr", "url": "https://movcr.com/" }, { "dateAdded": 1528652465130, "id": "23", "index": 4, "parentId": "16", "title": "KAT - Kickass Torrents", "url": "https://katcrs.download/" }, { "dateAdded": 1556872698671, "id": "25", "index": 5, "parentId": "16", "title": "The Official Home of YIFY Movies Torrent Download - YTS", "url": "https://yts.am/" }, { "dateAdded": 1556877047387, "id": "27", "index": 6, "parentId": "16", "title": "YIFY Subtitles - subtitles for YIFY movies", "url": "https://www.yifysubtitles.com/" }], "dateAdded": 1556820286302, "dateGroupModified": 1557765883273, "id": "16", "index": 1, "parentId": "1", "title": "Torrent Proxy Site" }, { "dateAdded": 1517039291544, "id": "17", "index": 2, "parentId": "1", "title": "AirVūz Drone Videos – United By Drone", "url": "https://www.airvuz.com/" }, { "dateAdded": 1553150509072, "id": "18", "index": 3, "parentId": "1", "title": "Internet Archive: Digital Library of Free & Borrowable Books, Movies, Music & Wayback Machine", "url": "https://archive.org/" }, { "children": [{ "dateAdded": 1557765883273, "id": "29", "index": 0, "parentId": "30", "title": "Resources - Google Sheets", "url": "https://docs.google.com/spreadsheets/d/1xkC4qCfCSAmvx4EPUQ-VgB73Wj2lt8lczGtv3ETm3-c/edit#gid=1676630641" }, { "dateAdded": 1557765932224, "id": "31", "index": 1, "parentId": "30", "title": "BookmarkBuddy - Google Drive", "url": "https://drive.google.com/drive/folders/1tH-EKfJ-_CDCRSt4WwZ1gedu8HHFR0Ur" }, { "children": [{ "dateAdded": 1557765974569, "id": "33", "index": 0, "parentId": "34", "title": "GitHub - AnBera/bookmarkbuddy", "url": "https://github.com/AnBera/bookmarkbuddy" },{ "dateAdded": 1557765939737, "id": "32", "index": 1, "parentId": "34", "title": "AnirbanBera / linkpreview / index.js — Bitbucket", "url": "https://bitbucket.org/AnirbanBera/linkpreview/src/master/index.js" }], "dateAdded": 1557766024556, "dateGroupModified": 1557766033851, "id": "34", "index": 2, "parentId": "30", "title": "Code base" }], "dateAdded": 1557765922433, "dateGroupModified": 1557766029251, "id": "30", "index": 4, "parentId": "1", "title": "Bookmark Buddy" }], "dateAdded": 1556819554156, "dateGroupModified": 1553150509072, "id": "1", "index": 0, "parentId": "0", "title": "Bookmarks bar" }, { "children": [], "dateAdded": 1556819554156, "id": "2", "index": 1, "parentId": "0", "title": "Other bookmarks" }, { "children": [{ "children": [{ "dateAdded": 1498146026212, "id": "10", "index": 0, "parentId": "5", "title": "Build a NodeJS cinema microservice and deploying it with docker — part 1", "url": "https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b" }, { "dateAdded": 1498425848323, "id": "11", "index": 1, "parentId": "5", "title": "Simulated Raspberry Pi to cloud (Node.js) - Connect Raspberry Pi web simulator to Azure IoT Hub | Microsoft Docs", "url": "https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started" }, { "dateAdded": 1499521788121, "id": "12", "index": 2, "parentId": "5", "title": "Grammar and spellchecker – English – Reverso", "url": "http://www.reverso.net/spell-checker/english-spelling-grammar/" }, { "dateAdded": 1505136521174, "id": "14", "index": 3, "parentId": "5", "title": "UEFA Champions League - Fantasy Football - Leagues", "url": "http://uclfantasy.uefa.com/en/fantasy17/leagues" }], "dateAdded": 1556820286198, "dateGroupModified": 1556820286198, "id": "5", "index": 0, "parentId": "3", "title": "Node js" }, { "dateAdded": 1445713137500, "id": "6", "index": 1, "parentId": "3", "title": "Fantasy Premier League - The official fantasy football game of the Barclays Premier League", "url": "http://fantasy.premierleague.com/entry/1327912/event-history/10/" }, { "dateAdded": 1400399042189, "id": "7", "index": 2, "parentId": "3", "title": "Staff selection Commission syllabus", "url": "http://ssc.nic.in/syllabus/CombinedGraduateLevelExam.html" }, { "dateAdded": 1388635402089, "id": "8", "index": 3, "parentId": "3", "title": "Cognizant Mail", "url": "https://mail.cognizant.com/owa/auth/logon.aspx?url=https://mail.cognizant.com/owa/&reason=0" }], "dateAdded": 1556819554156, "dateGroupModified": 1554660844248, "id": "3", "index": 2, "parentId": "0", "title": "Mobile bookmarks" }], "dateAdded": 1558025293160, "id": "0", "title": "" };
    // flattenNode(bookmarks, flattenedBookmarks);
    // this.localBookmarks.push(...flattenedBookmarks);
    // this.addBookmarksInState(18);
    // window.onscroll = debounce(() => {
    //   //------------
    //   let scrollTop = document.documentElement.scrollTop;
    //   let windowHeight = window.innerHeight;
    //   let bodyHeight = document.documentElement.scrollHeight - windowHeight;
    //   let scrollPercentage = (scrollTop / bodyHeight);

    //   console.log(scrollTop, windowHeight, bodyHeight, scrollPercentage);

    //   // if the scroll is more than 90% from the top, load more content.
    //   if (scrollPercentage > 0.9) {
    //     // Load content
    //     //   }
    //     // //-------------
    //     // if (
    //     //   window.innerHeight + document.documentElement.scrollTop
    //     //   === document.documentElement.offsetHeight
    //     // ) {
    //     // Do awesome stuff like loading more content!
    //     this.addBookmarksInState(6);
    //   }
    // }, 100);
    // this.props.setBookmarks({ bookmarks: flattenedBookmarks });
    //============

    // let recentBookmarks = [{ "dateAdded": 1557765974569, "id": "33", "index": 0, "parentId": "34", "title": "GitHub - AnBera/bookmarkbuddy", "url": "https://github.com/AnBera/bookmarkbuddy" }];
    // // flattenNode(bookmarks, recentBookmarks);
    // // this.localRecentBookmarks.push(...recentBookmarks);
    // this.props.setRecentBookmarks({bookmarks : recentBookmarks});

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

    chrome.bookmarks.getRecent(4, bookmarksArr => {
      this.props.setRecentBookmarks({ bookmarks: bookmarksArr }); //TODO need to think of destructuring
      // this.localRecentBookmarks.push(...bookmarksArr);
      // this.setState({ recentBookmarks: bookmarksArr })
    });

    //// not working
    // chrome.topSites.get(sites => {
    //   // flattenNode(treeNode[0], flattenedBookmarks);
    //   console.log(sites);
    // })

    chrome.bookmarks.getTree(treeNode => {
      flattenNode(treeNode[0], flattenedBookmarks);
      this.localBookmarks.push(...flattenedBookmarks);
      this.addBookmarksInState(18);
      window.onscroll = debounce(() => {
        let scrollTop = document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let bodyHeight = document.documentElement.scrollHeight - windowHeight;
        let scrollPercentage = (scrollTop / bodyHeight);

        console.log(scrollTop, windowHeight, bodyHeight, scrollPercentage);

        // if the scroll is more than 70% from the top, load more content.
        if (scrollPercentage > 0.7) {
          // Load more content!
          this.addBookmarksInState(21);
        }
      }, 100);
      this.props.setBookmarks({ bookmarks: flattenedBookmarks }); //TODO need to think of destructuring
    });
  };

  setSelectedFolderAndFilter = selectedFolder => {
    this.props.setSelectedFolder(selectedFolder);
    this.props.setSearchedTerm("");
    let filteredBookmarks = [...this.props.bookmarks];
    if (selectedFolder !== "-- Select all --") {
      filteredBookmarks = filteredBookmarks.filter(
        element =>
          element.category !== "-- Select all --" &&
          element.category === selectedFolder
      );
    }
    this.setLocalBookmarks(filteredBookmarks);
    this.addBookmarksInState(15);
    this.props.setFilteredBookmarks({ bookmarks: filteredBookmarks });
  };

  addBookmarksInState = numberOfBookmarks => {
    setTimeout(() => {
      if (this.state.bookmarks.length + numberOfBookmarks < this.localBookmarks.length) {
        this.setState((prev, props) => ({
          bookmarks: this.localBookmarks.slice(
            0,
            prev.bookmarks.length + numberOfBookmarks
          )
        }));
      } else if ((this.localBookmarks.length - this.state.bookmarks.length) > 0 && 
        (this.localBookmarks.length - this.state.bookmarks.length) < numberOfBookmarks) {
        this.setState((prev, props) => ({
          bookmarks: this.localBookmarks.slice(0)
        }));
      }
    }, 0);
  };

  render() {
    // const { activeItem } = this.state;
    let Bookamrks = [...this.state.bookmarks];
    // if (this.props.FilteredBookmarks.length > 0 && this.props.searchTerm !== "-- Select all --") {
    //   this.localBookmarks = this.props.FilteredBookmarks;
    //   this.setState({bookmarks : []});
    //   this.addBookmarksInState(18);
    //   // Bookamrks = [...this.props.FilteredBookmarks];
    // } else if (this.props.searchTerm !== "" && this.props.searchTerm !== "-- Select all --") {
    //   // this.setState({bookmarks : this.props.FilteredBookmarks});
    //   this.localBookmarks = this.props.FilteredBookmarks;
    //   this.setState({bookmarks : []});
    //   this.addBookmarksInState(18);
    //   // Bookamrks = [...this.props.FilteredBookmarks];
    // } else {
    //   Bookamrks = [...this.state.bookmarks];
    // }

    return (
      // // Anytime move to row layout by uncommenting these 5 lines and uncommenting <Grid.Column> in BookmarkCard
      //   <Grid container columns={3} doubling stackable>
      //   {this.state.bookmarks.map(bookmark =>
      //     <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      //   )}
      //   </Grid>
      <>
        <div ref={this.handleContextRef} style={{ marginTop: "2em" }}>
          <Rail
            internal
            position="left"
            attached
            style={{ top: "auto", height: "80px", width: "100%" }}
          >
            <Sticky context={this.state.context}>
              {/* <Menu inverted style={{ margin: 0 }}>
                <Menu.Item>Home</Menu.Item>
                <Menu.Item>Users</Menu.Item>
                <Menu.Item position="right">Logout</Menu.Item>
              </Menu> */}

              <div style={{ backgroundColor: "#161626", textAlign:"center", height:"60px" }}>
                <img src={BookmarkbuddyLogoGrey3} alt="BookmarkBuddy"/>
              </div>
            </Sticky>
          </Rail>
          <Grid container columns="equal" stackable style={{paddingTop:"2em"}}>
            <Grid.Row>
              {this.props.recentBookmarks.map((bookmark, idx) => {
                return (
                  <Grid.Column>
                    <BookmarkRecentCard bookmark={bookmark} key={bookmark.id} />
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        </div>

        <div ref={this.handleContextRef2} style={{ padding: "1em" }}>
          <Rail
            internal
            position="left"
            attached
            style={{ top: "auto", height: "auto", width: "100%" }}
          >
            <Sticky context={this.state.context2}>
              <Segment inverted style={{ backgroundColor: "#161626" }}>
                <Grid container columns="equal" stackable>
                  {this.props.bookmarks.length > 0 && (
                    <Grid.Row>
                      <SearchComponent
                        context={this.state.context2}
                        bookmarks={Bookamrks}
                        addBookmarksInState={this.addBookmarksInState}
                        setLocalBookmarks={this.setLocalBookmarks}
                      />
                      <Grid.Column width={16}>
                        <List floated='right' horizontal>
                          <List.Item disabled href='#'>
                            Sort : 
                          </List.Item>
                          <span className="item" onClick={this.onSortCategoryClick("dateAdded")}>Date Added</span>
                          <span className="item" onClick={this.onSortCategoryClick("title")} href="#">Title</span>
                          <span className="item"  onClick={this.onSortCategoryClick("url")} href="#">Url</span>
                        </List>
                      </Grid.Column>                      
                    </Grid.Row>
                  )}
                </Grid>
              </Segment>
            </Sticky>
          </Rail>
          <Grid
            container
            columns="equal"
            stackable
            style={{ marginTop: "7em" }}
          >
            {/* {this.props.bookmarks.length > 0 && (
              <Grid.Row>
                <SearchComponent context={this.state.context2} bookmarks={Bookamrks} />
              </Grid.Row>
            )} */}
            <Grid.Row>
              <Grid.Column>
                {Bookamrks.map((bookmark, i) => {
                  if (i % 3 === 0)
                    return (
                      <BookmarkCard
                        key={bookmark.id}
                        isconvertedSuccessfully={this.props.isImagesConverted}
                        bookmark={bookmark}
                        setSelectedFolderAndFilter={
                          this.setSelectedFolderAndFilter
                        }
                        colorsMap={this.props.colorsMap}
                      />
                    );
                })}
              </Grid.Column>
              <Grid.Column>
                {Bookamrks.map((bookmark, i) => {
                  if (i % 3 === 1)
                    return (
                      <BookmarkCard
                        key={bookmark.id}
                        isconvertedSuccessfully={this.props.isImagesConverted}
                        bookmark={bookmark}
                        setSelectedFolderAndFilter={
                          this.setSelectedFolderAndFilter
                        }
                        colorsMap={this.props.colorsMap}
                      />
                    );
                })}
              </Grid.Column>
              <Grid.Column>
                {Bookamrks.map((bookmark, i) => {
                  if (i % 3 === 2)
                    return (
                      <BookmarkCard
                        key={bookmark.id}
                        bookmark={bookmark}
                        setSelectedFolderAndFilter={
                          this.setSelectedFolderAndFilter
                        }
                        colorsMap={this.props.colorsMap}
                      />
                    );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVisitedSites: sites => {
      dispatch(setMostVisitedSites(sites));
    },
    setBookmarks: bookmarks => {
      dispatch(setBookmarks(bookmarks));
    },
    setRecentBookmarks: bookmarks => {
      dispatch(setRecentBookmarks(bookmarks));
    },
    setSelectedFolder: folder => {
      dispatch(setSelectedFolder(folder));
    },
    setFilteredBookmarks: (bookmarks = []) => {
      dispatch(setFilteredBookmarks(bookmarks));
    },
    setSearchedTerm: text => {
      dispatch(setSearchedTerm(text));
    },
    callGenerateImages: urls => {
      dispatch(generatePreviewImages(urls))
    }
  };
};

const mapStateToProps = state => ({
  bookmarks: state.DashBoardReducer.Bookmarks,
  recentBookmarks: state.DashBoardReducer.recentBookmarks,
  FilteredBookmarks: state.DashBoardReducer.FilteredBookmarks,
  searchTerm: state.DashBoardReducer.searchTerm,
  selectedFolder: state.DashBoardReducer.selectedFolder,
  colorsMap: state.DashBoardReducer.colorsMap,
  isImagesConverted: state.DashBoardReducer.isImagesConverted
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkDashboard);
