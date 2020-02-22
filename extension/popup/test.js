function toggleSettings(){
    chrome.storage.sync.get({
      enabled: true,
    }, function(items) {
      chrome.storage.sync.set({
      enabled: !items.enabled
      }, function(){
        !items.enabled ? document.getElementById("isEnabled").innerText = "Disable BaitHate" : document.getElementById("isEnabled").innerText = "Enable BaitHate";
      });
    });
    
    
  }

  function loadSettings(){
    chrome.storage.sync.get({
      enabled: true,
    }, function(items) {
      items.enabled ? document.getElementById("isEnabled").innerText = "Disable BaitHate" : document.getElementById("isEnabled").innerText = "Enable BaitHate"
      document.getElementById("checker").checked = items.enabled;
    });
  }

  document.getElementById("checker").addEventListener("click", toggleSettings);
  loadSettings();