/*global chrome*/
const creteNewTabEvent = (tab) => {
    chrome.tabs.create({'url': chrome.extension.getURL('index.html?fullscreen=true')}, function(tab) {
      // Tab opened.
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#openFull').addEventListener('click', creteNewTabEvent);
  });
  
  // chrome.browserAction.onClicked.removeListener(creteNewTabEvent);
  // chrome.browserAction.onClicked.addListener(creteNewTabEvent);

// if(!chrome.browserAction.onClicked.hasListener(creteNewTabEvent)) {
//   chrome.browserAction.onClicked.addListener(creteNewTabEvent);
// }