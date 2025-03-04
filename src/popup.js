'use strict';

import './popup.css';
import {TF} from './TF';

// TABS
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
//default tab
document.getElementById('players').style.display = "block";
document.getElementById('playersTab').className += " active";

document.getElementById('playersTab').addEventListener('click', (e) => {
  openTab(e, 'players');
});

document.getElementById('tagsTab').addEventListener('click', (e) => {
  openTab(e, 'tags');
});

document.getElementById('settingsTab').addEventListener('click', (e) => {
  openTab(e, 'settings');
});

document.getElementById('tagsAddTag').addEventListener('click', (e) => {
  const tagName = document.getElementById('tagsNewTagName').value;
  const tagPriority = parseInt(document.getElementById('tagsNewTagPriority').value);
  chrome.runtime.sendMessage({
    command: 'addTag',
    name: tagName,
    priority: tagPriority,
  }).then(r => console.log('Added new tag:', r));
});



(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const counterStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['count'], (result) => {
        cb(result.count);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          count: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  // function setupCounter(initialValue = 0) {
  //   document.getElementById('counter').innerHTML = initialValue;
  //
  //   document.getElementById('incrementBtn').addEventListener('click', () => {
  //     updateCounter({
  //       type: 'INCREMENT',
  //     });
  //   });
  //
  //   document.getElementById('decrementBtn').addEventListener('click', () => {
  //     updateCounter({
  //       type: 'DECREMENT',
  //     });
  //   });
  // }
  //
  // function updateCounter({ type }) {
  //   counterStorage.get((count) => {
  //     let newCount;
  //
  //     if (type === 'INCREMENT') {
  //       newCount = count + 1;
  //     } else if (type === 'DECREMENT') {
  //       newCount = count - 1;
  //     } else {
  //       newCount = count;
  //     }
  //
  //     counterStorage.set(newCount, () => {
  //       document.getElementById('counter').innerHTML = newCount;
  //
  //       // Communicate with content script of
  //       // active tab by sending a message
  //       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //         const tab = tabs[0];
  //
  //         chrome.tabs.sendMessage(
  //           tab.id,
  //           {
  //             type: 'COUNT',
  //             payload: {
  //               count: newCount,
  //             },
  //           },
  //           (response) => {
  //             console.log('Current count value passed to contentScript file');
  //           }
  //         );
  //       });
  //     });
  //   });
  // }
  //
  // function restoreCounter() {
  //   // Restore count value
  //   counterStorage.get((count) => {
  //     if (typeof count === 'undefined') {
  //       // Set counter value as 0
  //       counterStorage.set(0, () => {
  //         setupCounter(0);
  //       });
  //     } else {
  //       setupCounter(count);
  //     }
  //   });
  // }
  //
  // document.addEventListener('DOMContentLoaded', restoreCounter);
  //
  // // Communicate with background file by sending a message
  // chrome.runtime.sendMessage(
  //   {
  //     type: 'GREETINGS',
  //     payload: {
  //       message: 'Hello, my name is Pop. I am from Popup.',
  //     },
  //   },
  //   (response) => {
  //     console.log(response.message);
  //   }
  // );
  //

})();
