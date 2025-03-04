'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
// const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
// console.log(
//   `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//     {
//         type: 'GREETINGS',
//         payload: {
//             message: 'Hello, my name is Con. I am from ContentScript.',
//         },
//     },
//     (response) => {
//         console.log(response.message);
//     }
// );

// Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === 'COUNT') {
//         console.log(`Current count is ${request.payload.count}`);
//     }
//
//     // Send an empty response
//     // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
//     sendResponse({});
//     return true;
// });

function iterate_over_slots() {
  var slots = document.evaluate('//div[contains(@class, "lobbySlot")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < slots.snapshotLength; i++) {
    var slot = slots.snapshotItem(i);
    var filled = slot.classList.contains("filled");
    if (filled) {
      var profile = slot.getElementsByTagName('a').item(0).href;
      // var rating = slot.getElementsByClassName('rating')[0];
      var id = /^http[s]*\:\/\/tf2center\.com\/profile\/(\d+)$/.exec(profile);
      if (id !== null) {
        id = id[1];
        console.log("Player", i, "id:", id);
      }
      else {
        console.log(slot, "no id64 matched for slot");
        continue;
      }
    }
  }

  setTimeout(() => {iterate_over_slots();}, 1000); // delay
}

// If valid tf2 center lobby -> run
if (/^http[s]*\:\/\/tf2center\.com\/lobbies\/(\d+)\/*$/.exec(document.URL) !== null) {
  chrome.storage.sync.get({
    debug: true,
  }, function(options) {
    if (options.debug) console.log("In a lobby !"); // get steamids, inject html/css
    iterate_over_slots();
  });
} else {
  console.warn("Not in a lobby, not doing anything...");
}

