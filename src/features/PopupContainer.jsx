/*global chrome*/
import React, { useEffect, useState } from 'react';
import BookmarkbuddyLogoGrey3 from "./../app/assets/images/BookmarkbuddyLogoGrey3.png";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import SearchComponent from "./Search/SearchBookmark";
import SearchAndFilter from "./Search/SearchandFilter";
import BookmarkCard from "./BookmarkCard/BookmarkCard";
import { flattenNode, extractHostname } from '../app/common/util/Util';
import { populateRandomColor } from "../app/common/util/Util";

const PopupContainer=()=>{
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
    // let flattenedBookmarks = [];
    let bookmarkCreationDates = [];
    let bookmarkUrls = [];
  //Only Bookmark Folder Tree Structure
  let bookmarkFolderTree = [];

  // var port = chrome.extension.connect({
  //   name: "Sample Communication"
  // });
  // console.log(port);
  // port.postMessage("Hi BackGround");
  // port.onMessage.addListener(function(msg) {
  // // setFlattenedBookmarks(msg);
  // flattenedBookmarks = msg;
  // console.log("message recieved \n" + JSON.stringify(flattenedBookmarks));
  // });

  let [flattenedBookmarks, setFlattenedBookmarks] = useState([]);

    // useEffect(() => {
    //       setUsers({ user: 'bob' });
    // }, [
    //    //here you could pass dependencies, or leave it empty to call this effect only on first render
    // ]);

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

  //   flattenNode(
  //     bookmarksTree,
  //     flattenedBookmarks,
  //     bookmarkCreationDates,
  //     bookmarkUrls,
  //     bookmarkFolderTree
  // );
  let Bookamrks = flattenedBookmarks;
    return(
      <>
      <div>
      <SearchComponent
                        // context={this.state.context2}
                        bookmarks={Bookamrks}
                        // addBookmarksInState={this.addBookmarksInState}
                        // setLocalBookmarks={this.setLocalBookmarks}
                      />
      </div>
      {Bookamrks.length > 0 && (
        <div className="recommendation-card-container">
        {console.log("inside render")}{console.log(Bookamrks)}
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
        <div>
        <Button Id="openFull" basic color="green" inverted>
              <Icon name="external alternate" /> Open Full view
            </Button>
        </div>
      </>
    )
}

export default PopupContainer;