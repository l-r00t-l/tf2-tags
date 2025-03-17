import {UTILS} from './UTILS';

export const TF = (function () {
  "use strict";
  var playersMap = new Map();
  var tagsMap = new Map();

  // public
  return {
    // Load saved tags and players db
    init: function () {
      this.loadTags();
      this.loadPlayers();
    },
    // For dev
    initWithDefaults: function () {
      TF.addTag("Neutral", 0);
      TF.addTag("Good", 100);
      TF.addTag("Retard", -1);
      TF.saveTags();
      TF.addPlayerTag(0, "Good");
    },
    addPlayerTag: function (playerId, tag) {
      console.log("addPlayerTag", playerId, tag);
      if(!tagsMap.has(tag)) {
        console.error("Tag", tag, "missing in the tagsMap.");
        return;
      }
      if(playersMap.has(playerId))
        playersMap.set(playerId, playersMap.get(playerId).push(tag));
      else
        playersMap.set(playerId, [tag]);
    },
    addTag: function (name, priority) {
      tagsMap.set(name, priority);
      console.log("Added new tag:",name, priority);
    },
    saveTags: function () {
      const serializedTags = UTILS.serializeMap(tagsMap);
      chrome.storage.sync.set({
        "tagsMap": serializedTags,
      }).then(() => {
        console.log("Saved tags.")
        chrome.runtime.sendMessage({
          command: "updateTagsDisplay",
          tagsMap: serializedTags
        }).then(r => console.log("[TF.js | saveTags()] Requested tags html update."));
      });
    },
    savePlayers: function () {
      chrome.storage.sync.set({
        "playersMap": UTILS.serializeMap(playersMap),
      }).then(() => console.log("Saved players."));
    },
    loadTags: function () {
      chrome.storage.sync.get(["tagsMap"]).then(result => {
        tagsMap = UTILS.deserializeMap(result.tagsMap);
        console.log("Loaded tags:", result);
        chrome.runtime.sendMessage({
          command: "updateTagsDisplay",
          tagsMap: result.tagsMap
        }).then(r => console.log("[TF.js | loadTags()] Requested tags html update."));
      });
    },
    loadPlayers: function () {
      chrome.storage.sync.get(["playersMap"]).then(result => {
        playersMap = UTILS.deserializeMap(result.playersMap);
        console.log("Loaded players:", result);
      })
    },
    getTags: function () {
      return tagsMap;
    },
    getPlayerTags: function (playerId) {
      return playersMap.get(playerId);
    },
  }
})();

