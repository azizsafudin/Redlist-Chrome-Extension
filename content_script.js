var old_scroll_top = 0;
var viewportHeight = $(window).height();
var latest_list = [];
var access_token = "";
var access_token_set = false;

//TODO: Set site_name from URL in tabs, not hardcoded.
var site_name   = "facebook";

//update latest_list.
chrome.storage.sync.get("list", function(items) {
  latest_list = JSON.parse(items.list);
  console.log(items.list);
});

//update access_token.
chrome.storage.sync.get("access_token", function(items) {
  access_token = items.access_token;
  if(access_token == undefined || access_token == null || access_token == ""){
    alert("Access Token is not set. \nRight click to get and load an access token."+
    		"\nGo to: https://developers.facebook.com/tools/explorer/ to get your temporary token.");
    access_token_set = false;
  }else{
    alert("Access Token \""+access_token.substring(0,20)+"...\" is loaded.");
    access_token_set = true;
  }
});



$(document).ready(()=>{

  if(access_token_set){
    $("abbr.livetimestamp").prepend("&#9762; ")
    .attr("title", "Click Redlist icon in the toolbar to reload!"); 
    main();
  }
})

function main(){
    //cosmetics
  	$("abbr.livetimestamp")
  	.attr("title", "Right click to Redlist this comment!");

  	$("abbr.livetimestamp").hover(
      function() {
          var $this = $(this); // caching $(this)
          $this.data("initialText", $this.text());
          $this.css("color", "crimson");
          $this.css("font-weight", "bold")
          $this.text("Redlist it!");
      },
      function() {
          var $this = $(this); // caching $(this)
          $this.text($this.data("initialText"));
      }
    );


    $("abbr.livetimestamp").mousedown(function(e){

        //Right Click
        if(e.which == 3){
        e.preventDefault();

        //TODO: Move this to a separate function

        //get URL of post/comment/reply.
        var url = "https://www.facebook.com"+$(this).parent("a").attr("href");

        //retrieve data from URL string.
        //This entire block of code needs to be refactored to include other types of fb urls.
        var fb_params = processURL(url, site_name);
        var base_url = "https://graph.facebook.com/";
        var request_str = fb_params[0];        
        if(fb_params[1] != null){
          request_str += "_"+fb_params[1];
        }
        if(fb_params[2] != null){
          request_str += "_"+fb_params[2];
        }
        var request_url = base_url+request_str+"?access_token="+access_token;
      
        $.get(request_url, function(data, status){
            //constructing new object to add to the list.
            var new_obj = { 
              "full_url"          : url.toString(),
              "post_id"           : fb_params[0],
              "comment_id"        : fb_params[1],
              "reply_comment_id"  : fb_params[2],
              "name"              : data.from.name,
              "user_id"           : data.from.id,
              "message"           : data.message,
              "created_time"      : data.created_time,
            }
            var msg_str = "[RedListed] \n"+data.from.name+":\n"+data.message+"\n[RedListed]";
            //Add new_obj to list?
            var push = true;
            //loop through list to check if object already exists
            latest_list.forEach(function(arrayItem)
              {
                if(arrayItem.full_url == new_obj.full_url)
                {
                  //Don't add new_obj to list.
                  push = false;
                } 
              });

            if(push){
              latest_list.push(new_obj);
            }
            chrome.storage.sync.set({"list": JSON.stringify(latest_list)}, function() {
              // Notify that we saved.
              if(push){
                alert(msg_str);
              }else{
                alert("URL already Redlisted.");
              }
            });
        });
        
        }

        //Middle click to get stored item.
        if(e.which == 2){
          retrieveList();
        }       
    });
}

function retrieveList(){
  chrome.storage.sync.get("list", function(items) {
    alert(items.list.toString());
    console.log(items.list.toString());
  });
}

function processURL(url_str, site){
  var url_obj = new URL(url_str);
  var arr = [];

  //process URL for facebook
  if(site == "facebook"){
    var split = url_str.split("posts/")[1];
    var post_id = split.split("?")[0];

    arr[0] = post_id;
    arr[1] = url_obj.searchParams.get("comment_id");
    arr[2] = url_obj.searchParams.get("reply_comment_id");

    return arr;
  }
  return arr;
}

// function getRedlistedUserId(user_id){
//   latest_list.forEach(function(arrayItem){
//     if(arrayItem.user_id == user_id){
//       return true;
//     }
//     return false;
//   });
// }

// //May or may not be working. But its not needed at the moment.
// $(document).scroll(()=>{
//  var current_scroll_top = $(window).scrollTop();
//   var scroll_delta = current_scroll_top - old_scroll_top;

//     //if user scrolls more than the current scroll position
//  if (current_scroll_top >= 400+old_scroll_top){
//      main();
//   }
    
//   if(old_scroll_top <= current_scroll_top){
//     old_scroll_top = current_scroll_top;
//  } 
// });

//Code to reload page when idle.
// var IDLE_TIMEOUT = 60;
// var _idleSecondsCounter = 0;
// document.onclick = function() {
//     _idleSecondsCounter = 0;
// };
// document.onmousemove = function() {
//     _idleSecondsCounter = 0;
// };
// document.onkeypress = function() {
//     _idleSecondsCounter = 0;
// };
// document.onscroll = function() {
//     _idleSecondsCounter = 0;
// };

// window.setInterval(CheckIdleTime, 1000);

// function CheckIdleTime() {
//     _idleSecondsCounter++;
//     if (_idleSecondsCounter >= IDLE_TIMEOUT) {
//         location.reload(true);
//     }
// }