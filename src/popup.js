'use strict';

import './popup.css';
import {TF} from './TF';
import { UTILS } from './UTILS';

(function () {

// TABS
  function openTab(evt, tabName) {

    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    // evt.currentTarget.className += " active";
  }
  function generateTableFromMap(map) {
    // Create the table element
    const table = document.createElement('table');

    // Create the table header
    const headerRow = table.insertRow();
    const th1 = document.createElement('th');
    th1.textContent = 'Name';
    const th2 = document.createElement('th');
    th2.textContent = 'Priority';
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);

    map.forEach((value, key) => {
      const row = table.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();

      cell1.textContent = key;
      cell2.textContent = value;
    });
    return table;
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
    }).then(r => console.log('[popup.js]\t', r));
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.command) {
      case 'updateTagsDisplay': {
        const deserializedTagsMap = UTILS.unserializeMap(request.tagsMap);
        console.log('[popup.js] Received tags map: ', deserializedTagsMap);
        const tableContainer = document.getElementById('tagsTableContainer');
        if (tableContainer.children.length > 0) {
          tableContainer.removeChild(tableContainer.children[0]);
        }
        const table = generateTableFromMap(deserializedTagsMap);
        tableContainer.appendChild(table);
      }
    }
  })
})();
