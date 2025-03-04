
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
      chrome.storage.sync.set({
        "tagsMap": Object.fromEntries(tagsMap),
      }).then(() => console.log("Saved tags."));
    },
    savePlayers: function () {
      chrome.storage.sync.set({
        "playersMap": Object.fromEntries(playersMap),
      }).then(() => console.log("Saved players."));
    },
    loadTags: function () {
      chrome.storage.sync.get(["tagsMap"]).then(result => {
        tagsMap = new Map(Object.entries(result.tagsMap));
        console.log("Loaded tags:", result);
      });
    },
    loadPlayers: function () {
      chrome.storage.sync.get(["playersMap"]).then(result => {
        playersMap = new Map(Object.entries(result.playersMap));
        console.log("Loaded players:", result);
      })
    },
    getPlayerTags: function (playerId) {
      return playersMap.get(playerId);
    },
  }
})();

