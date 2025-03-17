'use strict';
import { TF } from './TF';
import {UTILS} from './UTILS';
// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'GREETINGS') {
//     const message = `Hi ${
//       sender.tab ? 'Con' : 'Pop'
//     }, my name is Bac. I am from Background. It's great to hear from you.`;
//
//     // Log message coming from the `request` parameter
//     console.log(request.payload.message);
//     // Send a response message
//     sendResponse({
//       message,
//     });
//   }
// });

// TODO Remove in release
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'tagsMap') {
      const serializedTagsMap = UTILS.serializeMap(TF.getTags());
      console.log("[background.js] serialized tags: ", serializedTagsMap);
      chrome.runtime.sendMessage({
        command: 'updateTagsDisplay',
        tagsMap: serializedTagsMap,
      }).then(() => console.log("[background.js] Requested update of tags display."));
    }
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var resp = "";
  switch (request.command) {
    case 'addTag': {
      TF.addTag(request.name, request.priority);
      resp = "Added new tag:" + request.name + " priority:" + request.priority;
      break;
    }
  }

  sendResponse(resp);
})

TF.initWithDefaults();
TF.savePlayers();
TF.loadPlayers();
