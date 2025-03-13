export const UTILS = (function() {
  // Public
  return {
    serializeMap: function (map) {
      return Object.fromEntries(map);
    },
    unserializeMap: function (serializedMap) {
      return new Map(Object.entries(serializedMap));
    }
  }
})();

