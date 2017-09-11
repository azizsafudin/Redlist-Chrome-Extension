// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  
  chrome.storage.sync.set({"list": []}, function() {
    console.log("Loaded new empty list.");
  });

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'facebook.com/' },
          })
        ],
            // And shows the extension's page action.
            actions: [ new chrome.declarativeContent.ShowPageAction()
          ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab){

    chrome.storage.sync.set({"access_token": prompt("Insert Access Token here")}, function() {
      // Notify that we saved.
      alert("Access Token saved locally.");
    });

    chrome.storage.sync.get("list", function(items) {
      latest_list = JSON.parse(items.list);
      console.log(items.list);
    });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
});