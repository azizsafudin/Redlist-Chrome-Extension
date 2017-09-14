var whitelistUrl = ["https://www.facebook.com/*", "http://www.facebook.com/*", "*://facebook.com/*/posts/*"];
var startMsg =      "Welcome to RedList Chrome Extension!"+
                    "\n• Use this plugin to collect \"interesting\" comments."+
                    "\n• Right click to view options."+
                    "\n• This plugin requires a facebook access_token to work."+
                    "\n• Generate one at https://developers.facebook.com/tools/explorer/"+
                    "\n• Click on a comment or reply timestamp, then refresh the page."+
                    "\n• If nothing works, your token might be invalid or expired."+
                    "\n\nContact me: aziz@modlabs.co";

var getTokenURL = "https://developers.facebook.com/tools/explorer/";


// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {

  //Remove this when deploying. (Resets list).
  // chrome.storage.sync.set({"list": []}, function() {
  //   console.log("Loaded new empty list.");
  // });

  alert(startMsg);

  //create context menu items.
  chrome.contextMenus.create({
    "title": "View your current Redlist",
    "id": "viewList",
    "documentUrlPatterns":whitelistUrl,
    contexts:["all"], 
  });
  chrome.contextMenus.create({type:'separator'});
  chrome.contextMenus.create({
    "title": "Get an access token",
    "id": "getToken",
    "documentUrlPatterns":whitelistUrl,
    contexts:["all"], 
  });
  chrome.contextMenus.create({
    "title": "Load an access token",
    "id": "loadToken",
    "documentUrlPatterns":whitelistUrl,
    contexts:["all"], 
  });
  chrome.contextMenus.create({type:'separator'});
  chrome.contextMenus.create({
    "title": "Credits",
    "id": "showCredits",
    "documentUrlPatterns":whitelistUrl,
    contexts:["all"], 
  });


  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'https://facebook.com/' },
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

    alert(startMsg);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "viewList") { 
      window.open("index.html","MainPage");
    }
    if (info.menuItemId === "showCredits") { 
      window.open("credit.html","CreditsPage");
    }
    if (info.menuItemId === "getToken") {
      window.open(getTokenURL, "getToken");
    }
    if (info.menuItemId === "loadToken") {
      var access_token = prompt("Insert Access Token here")
      chrome.storage.sync.set({"access_token": access_token}, function() {
      // Notify that we saved.
      if(access_token == null || access_token == ""){
        alert("Empty field. No token saved.")
      }else{
        alert("Access Token saved locally.");
      }
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });

    }
});