/*global chrome*/
// let bookmarkTree;
let flattenedBookmarks = [], bookmarkCreationDates = [], bookmarkUrls = [], bookmarkFolderTree = [];

const flattenNode = (node, result, bookmarkCreationDates, bookmarkUrls, bookmarkFolderTree, parentFolder) => {
    if (node.children) {
      //if it is a folder
      let folderObj={};  
      folderObj.id=node.id;
      folderObj.children=[];
      folderObj.dateAdded= node.dateAdded;
      folderObj.index= node.index;
      folderObj.parentId=node.parentId;
      folderObj.title=node.title;
      folderObj.isSelected=false;
      folderObj.isOpen=false;
      folderObj.parent = parentFolder;
      bookmarkFolderTree.push(folderObj);
  
      node.children.forEach(child => {
        //if it is a bookmark
        if (child.url && child.title) {
          result.push(
              {
                title: child.title,
                url:child.url,
                dateAdded:child.dateAdded,
                id:child.id,
                index:child.index,
                parentId:child.parentId,
                category:node.title
              }
          );
          //data for bookmark analytics TODO need to think of optimization
          bookmarkCreationDates.push(child.dateAdded);
          bookmarkUrls.push(child.url);
        }
        flattenNode(child, result, bookmarkCreationDates, bookmarkUrls, folderObj.children, folderObj);
      });
      
    }
  };

  const getChromeBookmarkTree = () => {
    chrome.bookmarks.getTree(treeNode => { 
        // bookmarkTree = treeNode;
        flattenNode(treeNode[0], flattenedBookmarks, bookmarkCreationDates, bookmarkUrls, bookmarkFolderTree);
        console.log(flattenedBookmarks);
    });
  }

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
         console.log("message recieved" + msg);
        //  port.postMessage("Hi from background Script");
         port.postMessage(flattenedBookmarks);
    });
});

chrome.bookmarks.onCreated.addListener(getChromeBookmarkTree);
chrome.bookmarks.onRemoved.addListener(getChromeBookmarkTree);
chrome.bookmarks.onChanged.addListener(getChromeBookmarkTree);


getChromeBookmarkTree();