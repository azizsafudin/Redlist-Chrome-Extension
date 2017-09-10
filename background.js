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