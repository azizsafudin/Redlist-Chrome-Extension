var old_scroll_top = 0;
var viewportHeight = $(window).height();

$(document).scroll(()=>{
	var current_scroll_top = $(window).scrollTop();
  var scroll_delta = current_scroll_top - old_scroll_top;

    //if user scrolls more than the current scroll position
	if (current_scroll_top >= 400+old_scroll_top){
    	main();
  	}
    
  	if(old_scroll_top <= current_scroll_top){
    old_scroll_top = current_scroll_top;
	}	
});

$(document).ready(()=>{

$("abbr.livetimestamp").prepend("&#9762; ");

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
        if(e.which == 3){
        e.preventDefault();

        var url = "https://www.facebook.com"+$(this).parent("a").attr("href");
        var new_obj = { "full_url": url.toString() }
        var latest_list = [];

        chrome.storage.sync.get("list", function(items) {
          latest_list = JSON.parse(items["list"]);
          console.log(items["list"]);
        });

          latest_list.push(new_obj);
          //console.log(latest_list);

        chrome.storage.sync.set({"list": JSON.stringify(latest_list)}, function() {
        // Notify that we saved.
          alert("SAVED URL:"+url.toString());
        });
        
        }

        //middle click to get stored item.
        if(e.which == 2){
        chrome.storage.sync.get("list", function(items) {
          alert(items["list"].toString());
        });
        }       
    });

  //setInterval(function(){location.reload(true);}, 60000);

  //var data = { postURL: url }

 	// $.ajax({
	// type: "POST",
	// url: "http://188.166.214.237/api/v1/sendPost",
	// data: data,
	// success: function(){

	// },
	// dataType: "JSON"
	// });	
}


//Code to reload page when idle.
var IDLE_TIMEOUT = 60;
var _idleSecondsCounter = 0;
document.onclick = function() {
    _idleSecondsCounter = 0;
};
document.onmousemove = function() {
    _idleSecondsCounter = 0;
};
document.onkeypress = function() {
    _idleSecondsCounter = 0;
};
document.onscroll = function() {
    _idleSecondsCounter = 0;
};

window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
    _idleSecondsCounter++;
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
        location.reload(true);
    }
}