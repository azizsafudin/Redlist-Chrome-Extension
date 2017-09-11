// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  
  chrome.storage.sync.set({"list": []}, function() {
    console.log("Loaded new empty list.");
  });

  alert(
    "Welcome to RedList Chrome Extension!"+
    "\n• Use this plugin to collect \"interesting\" comments."+
    "\n• This plugin only works on facebook URLs containing the word \"/post/\"."+
    "\n• This plugin requires a facebook access_token to work."+
    "\n• Generate one at https://developers.facebook.com/tools/explorer/"+
    "\n• Click on a comment or reply timestamp, then refresh the page."+
    "\n• If nothing works, your token might be invalid or expired."
    )

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'posts/' },
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

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
});