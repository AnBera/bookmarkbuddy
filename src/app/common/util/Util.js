import Bookmark from "../model/Bookmark";

export const flattenNode = (node, result) => {
  if (node.children) {
    node.children.forEach(child => {
      if (child.url && child.title) {
        result.push(
          new Bookmark(
            child.title,
            child.url,
            child.dateAdded,
            child.id,
            child.index,
            child.parentId,
            node.title
          )
        );
      }
      flattenNode(child, result);
    });
  }
};

//Taken from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
export const extractHostname = url => {
  var hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];
  //replace initial www.
  hostname = hostname.replace(/^www./gi, '');

  return hostname;
};

export const populateRandomColor = (folderNames) => {
  let letters = '012345'.split('');
  let color = '#';
  let colorsMap = {};
  // let alphabet = "abcdefghijklmnopqrstuvwxyz".split('');       
  // color += letters[Math.round(Math.random() * 5)];
  letters = '0123456789ABCDEF'.split('');
  for (let i = 0; i < folderNames.length; i++) {
    for (let j = 0; j < 6; j++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    colorsMap[folderNames[i]] = color;
    color = '#';
  }
  return colorsMap;
};

export const extractUrlsFromBookmarks = (bookmarks) => {
  let urls = [];

  if (bookmarks.length) {
    bookmarks.forEach((bookmark) => {
      let hostname;

      //find & remove protocol (http, ftp, etc.) and get hostname
      if (bookmark.url.indexOf("//") > -1) {
        hostname = bookmark.url.split("//")[0] + "//"+ bookmark.url.split("/")[2];
      } else {
        hostname = bookmark.url.split("/")[0];
      }
      urls.push(hostname);
    })
  }
  return urls;
}

export const chromeTimeValueToDate = (timestamp) => {
  // var microseconds = parseInt(timestamp, 10);
  //  var millis = microseconds / 1000;
   var past = new Date(1970, 0, 1).getTime();
   return new Date(past + timestamp).toDateString();

  // var myDate = new Date(); // Your timezone!
  // var epoch = myDate.getTime()/1000.0;
  // // var epoch = -11644473600000;
  // console.log(new Date(epoch + timestamp / 1000));
  // return new Date(epoch + timestamp / 1000).toDateString();
}