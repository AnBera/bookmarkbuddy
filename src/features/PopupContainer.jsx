import React from 'react'
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Grid, Sticky, Segment, List, Rail } from "semantic-ui-react";
import SearchComponent from "./Search/SearchBookmark";
import SearchAndFilter from "./Search/SearchandFilter";
import BookmarkCard from "./BookmarkCard/BookmarkCard";
import { flattenNode } from '../app/common/util/Util';
import { populateRandomColor } from "../app/common/util/Util";

const popupContainer=()=>{
    let bookmarksTree = {
        children: [
          {
            children: [
              {
                dateAdded: 1374042255838,
                id: "15",
                index: 0,
                parentId: "1",
                title: "Work and its secret",
                url:
                  "http://www.ramakrishnavivekananda.info/vivekananda/volume_2/work_and_its_secret.htm"
              },
              {
                dateAdded: 1517039291544,
                id: "17",
                index: 2,
                parentId: "1",
                title: "AirVūz Drone Videos – United By Drone",
                url: "https://www.airvuz.com/"
              },
              {
                dateAdded: 1553150509072,
                id: "18",
                index: 3,
                parentId: "1",
                title:
                  "Internet Archive: Digital Library of Free & Borrowable Books, Movies, Music & Wayback Machine",
                url: "https://archive.org/"
              },
              {
                children: [
                  {
                    dateAdded: 1557765883273,
                    id: "29",
                    index: 0,
                    parentId: "30",
                    title: "Resources - Google Sheets",
                    url:
                      "https://docs.google.com/spreadsheets/d/1xkC4qCfCSAmvx4EPUQ-VgB73Wj2lt8lczGtv3ETm3-c/edit#gid=1676630641"
                  },
                  {
                    dateAdded: 1557765932224,
                    id: "31",
                    index: 1,
                    parentId: "30",
                    title: "BookmarkBuddy - Google Drive",
                    url:
                      "https://drive.google.com/drive/folders/1tH-EKfJ-_CDCRSt4WwZ1gedu8HHFR0Ur"
                  },
                  {
                    children: [
                      {
                        dateAdded: 1557765974569,
                        id: "33",
                        index: 0,
                        parentId: "34",
                        title: "GitHub - AnBera/bookmarkbuddy",
                        url: "https://github.com/AnBera/bookmarkbuddy"
                      },
                      {
                        dateAdded: 1557765939737,
                        id: "32",
                        index: 1,
                        parentId: "34",
                        title: "AnirbanBera / linkpreview / index.js — Bitbucket",
                        url:
                          "https://bitbucket.org/AnirbanBera/linkpreview/src/master/index.js"
                      }
                    ],
                    dateAdded: 1557766024556,
                    dateGroupModified: 1557766033851,
                    id: "34",
                    index: 2,
                    parentId: "30",
                    title: "Code base"
                  }
                ],
                dateAdded: 1557765922433,
                dateGroupModified: 1557766029251,
                id: "30",
                index: 4,
                parentId: "1",
                title: "Bookmark Buddy"
              }
            ],
            dateAdded: 1556819554156,
            dateGroupModified: 1553150509072,
            id: "1",
            index: 0,
            parentId: "0",
            title: "Bookmarks bar"
          },
          {
            children: [],
            dateAdded: 1556819554156,
            id: "2",
            index: 1,
            parentId: "0",
            title: "Other bookmarks"
          },
          {
            children: [
              {
                children: [
                  {
                    dateAdded: 1498146026212,
                    id: "10",
                    index: 0,
                    parentId: "5",
                    title:
                      "Build a NodeJS cinema microservice and deploying it with docker — part 1",
                    url:
                      "https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b"
                  },
                  {
                    dateAdded: 1498425848323,
                    id: "11",
                    index: 1,
                    parentId: "5",
                    title:
                      "Simulated Raspberry Pi to cloud (Node.js) - Connect Raspberry Pi web simulator to Azure IoT Hub | Microsoft Docs",
                    url:
                      "https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started"
                  },
                  {
                    dateAdded: 1499521788121,
                    id: "12",
                    index: 2,
                    parentId: "5",
                    title: "Grammar and spellchecker – English – Reverso",
                    url:
                      "http://www.reverso.net/spell-checker/english-spelling-grammar/"
                  },
                  {
                    dateAdded: 1505136521174,
                    id: "14",
                    index: 3,
                    parentId: "5",
                    title: "UEFA Champions League - Fantasy Football - Leagues",
                    url: "http://uclfantasy.uefa.com/en/fantasy17/leagues"
                  }
                ],
                dateAdded: 1556820286198,
                dateGroupModified: 1556820286198,
                id: "5",
                index: 0,
                parentId: "3",
                title: "Node js"
              },
              {
                dateAdded: 1445713137500,
                id: "6",
                index: 1,
                parentId: "3",
                title:
                  "Fantasy Premier League - The official fantasy football game of the Barclays Premier League",
                url:
                  "http://fantasy.premierleague.com/entry/1327912/event-history/10/"
              },
              {
                dateAdded: 1400399042189,
                id: "7",
                index: 2,
                parentId: "3",
                title: "Staff selection Commission syllabus",
                url: "http://ssc.nic.in/syllabus/CombinedGraduateLevelExam.html"
              },
              {
                dateAdded: 1388635402089,
                id: "8",
                index: 3,
                parentId: "3",
                title: "Cognizant Mail",
                url:
                  "https://mail.cognizant.com/owa/auth/logon.aspx?url=https://mail.cognizant.com/owa/&reason=0"
              }
            ],
            dateAdded: 1556819554156,
            dateGroupModified: 1554660844248,
            id: "3",
            index: 2,
            parentId: "0",
            title: "Mobile bookmarks"
          }
        ],
        dateAdded: 1558025293160,
        id: "0",
        title: ""
      };
    let flattenedBookmarks = [];
    let bookmarkCreationDates = [];
    let bookmarkUrls = [];
  //Only Bookmark Folder Tree Structure
  let bookmarkFolderTree = [];

    flattenNode(
      bookmarksTree,
      flattenedBookmarks,
      bookmarkCreationDates,
      bookmarkUrls,
      bookmarkFolderTree
  );
  let Bookamrks = flattenedBookmarks;
    return(
      <>
      <div 
      // ref={this.handleContextRef} 
      style={{ marginTop: "2em" }}>
          <Rail
            internal
            position="left"
            attached
            style={{ top: "auto", height: "80px", width: "100%" }}
          >
            <Sticky 
            // context={this.state.context}
            >
              <div
                style={{
                  backgroundColor: "#161626",
                  textAlign: "center",
                  height: "60px"
                }}
              >
                <img src={BookmarkbuddyLogoGrey3} alt="BookmarkBuddy" />
              </div>
            </Sticky>
          </Rail>
      </div>

      <div 
      // ref={this.handleContextRef2} 
      style={{ padding: "1em" }}>
          <Rail
            internal
            position="left"
            attached
            style={{ top: "auto", height: "auto", width: "100%" }}
          >
            <Sticky 
            // context={this.state.context2}
            >
              <Segment inverted style={{ backgroundColor: "#161626" }}>
                <Grid container columns="equal" stackable>
                  {flattenedBookmarks.length > 0 && (
                    <Grid.Row>
                      <SearchComponent
                        // context={this.state.context2}
                        bookmarks={Bookamrks}
                        // addBookmarksInState={this.addBookmarksInState}
                        // setLocalBookmarks={this.setLocalBookmarks}
                      />
                      <Grid.Column width={16}>
                        {/* <span className="display-count">
                          {" "}
                          Displaying {this.props.searchTerm?this.props.FilteredBookmarks.length:
                            Bookamrks.length} items{" "}
                        </span> */}
                        
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
            <Grid.Row>
              <Grid.Column>
                {Bookamrks.map((bookmark, i) => {
                    return (
                      <BookmarkCard
                        key={bookmark.id}
                        isconvertedSuccessfully={true}
                        bookmark={bookmark}
                        setSelectedFolderAndFilter={()=>{}}
                        getUpdateBookmarkTree={()=>{}}
                        updateBookamark={()=>{}}
                        colorsMap={['#000', '#fff', '#ccc']}
                        bookmarkFolderTree={()=>{}}
                      />
                    );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    )
}

export default popupContainer;