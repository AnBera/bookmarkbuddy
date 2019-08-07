import Bookmark from "../model/Bookmark";
import moment from "moment";

export const flattenNode = (node, result, bookmarkCreationDates) => {
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
        bookmarkCreationDates.push(child.dateAdded);
      }
      flattenNode(child, result, bookmarkCreationDates);
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
        hostname = bookmark.url.split("//")[0] + "//" + bookmark.url.split("/")[2];
      } else {
        hostname = bookmark.url.split("/")[0];
      }
      urls.push(hostname);
    })
  }
  return urls;
}

export const chromeTimeValueToDate = (timestamp) => {
   var microseconds = parseInt(timestamp, 10);
   var millis = microseconds / 1000;
   
   let momentTime = moment.unix(millis).format('dddd, MMMM Do, YYYY h:mm:ss A');
   var weeknumber = moment(moment.unix(millis).format('MM-DD-YYYY'), "MMDDYYYY").isoWeek();
   
   var past = new Date(1970, 0, 1).getTime();
  return new Date(past + timestamp).toDateString();

  // var myDate = new Date(); // Your timezone!
  // var epoch = myDate.getTime()/1000.0;
  // // var epoch = -11644473600000;
  // console.log(new Date(epoch + timestamp / 1000));
  // return new Date(epoch + timestamp / 1000).toDateString();
}

export const groupDatesByMonth = (dates) => {
    // var dates = [ "1396-10-11 09:07:21" ];
    
    var resultingXYCoordinateData = [];
    var groupByYearMonth = dates.reduce( function (acc, date) {
    
      var yearMonthCombination = moment(date).year()+'-'+moment(date).month();
      
      // check if the week number exists
      if (typeof acc[yearMonthCombination] === 'undefined') {
        acc[yearMonthCombination] = [];
      }
      
      acc[yearMonthCombination].push(date);
      
      return acc;
    
    }, {});

    let yearMonthKeys = Object.keys(groupByYearMonth).sort();
    yearMonthKeys.forEach((yearMonthCombination, index) => {
      resultingXYCoordinateData.push({x:yearMonthCombination, 
        y:groupByYearMonth[yearMonthCombination].length + (resultingXYCoordinateData[index-1] ? resultingXYCoordinateData[index-1].y : 0)  })
    })
    
    console.log(groupByYearMonth);
    console.log(resultingXYCoordinateData);
    return resultingXYCoordinateData;
}

export const generateUrlImagePair = async(bookmarks) => {
  let urls = [];

  if (bookmarks.length) {
      
    bookmarks.forEach((bookmark) => {
      let imageName=generateImageName(bookmark.url);
      urls.push({
        url: bookmark.url,
        imageName:imageName
      });
    })
  }
  return await urls;
}

export const generateImageName = (url) => {
 try{
  let wordstoRemove = ["http://", "https://", "www.",".html"];
  let expStr = wordstoRemove.join("|");  
  return url.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ').replace(/[/.%:*^<>|=(@#-_&"';~`)]/g ,'').trim()+".png";
 } 
 catch(err){console.error(err);}
}

export const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}