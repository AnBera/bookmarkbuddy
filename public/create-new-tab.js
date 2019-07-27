/*global chrome*/
const creteNewTabEvent = (tab) => {
    chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
      // Tab opened.
    });
  }
  
  chrome.browserAction.onClicked.removeListener(creteNewTabEvent);
  chrome.browserAction.onClicked.addListener(creteNewTabEvent);

// if(!chrome.browserAction.onClicked.hasListener(creteNewTabEvent)) {
//   chrome.browserAction.onClicked.addListener(creteNewTabEvent);
// }