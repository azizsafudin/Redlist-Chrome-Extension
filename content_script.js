var old_scroll_top = 0;
var viewportHeight = $(window).height();

$(document).scroll(()=>{
	var current_scroll_top = $(window).scrollTop();
    var scroll_delta = current_scroll_top - old_scroll_top;

    //if user scrolls more than the current scroll position
	if (current_scroll_top >= (viewportHeight/2)+old_scroll_top){
    	main();
  	}
    
  	if(old_scroll_top <= current_scroll_top){
    old_scroll_top = current_scroll_top;
	}	
});

function main(){
	$('abbr.livetimestamp').css("color", "red");
  	$('abbr.livetimestamp').attr("title", "Right click to add to the RedList!");

    $('abbr.livetimestamp').mousedown(function(e){
        if(e.which == 3){
        e.preventDefault();
        var url = "https://www.facebook.com"+$(this).parent("a").attr('href');
        alert(url);
        }       
    });

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