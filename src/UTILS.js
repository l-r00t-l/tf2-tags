export const UTILS = (function() {
  // Public
  return {
    serializeMap: function (map) {
      return Object.fromEntries(map);
    },
    deserializeMap: function (serializedMap) {
      return new Map(Object.entries(serializedMap));
    }
  }
})();

