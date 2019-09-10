/*global chrome*/
const creteNewTabEvent = (tab) => {
    chrome.tabs.create({'url': chrome.extension.getURL('index.html?fullscreen=true')}, function(tab) {
      // Tab opened.
    });
    // window.open('http://localhost:3000?fullScreen=true')
  }

  document.addEventListener('DOMContentLoaded', function () {
    let openFullScreenButton = document.querySelector('#openFull');
    if(openFullScreenButton)
      openFullScreenButton.addEventListener('click', creteNewTabEvent);
  });
  
  // chrome.browserAction.onClicked.removeListener(creteNewTabEvent);
  // chrome.browserAction.onClicked.addListener(creteNewTabEvent);

// if(!chrome.browserAction.onClicked.hasListener(creteNewTabEvent)) {
//   chrome.browserAction.onClicked.addListener(creteNewTabEvent);
// }