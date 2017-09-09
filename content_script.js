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
	main();
})

function main(){
  	$('abbr.livetimestamp')
  	.attr("title", "Right click to add to the List!")
  	.css("font-weight", "bold")
  	.css("color", "red");

  	$('abbr.livetimestamp').hover(
    function() {
        var $this = $(this); // caching $(this)
        $this.data('initialText', $this.text());
        $this.text("Add to the List!");
    },
    function() {
        var $this = $(this); // caching $(this)
        $this.text($this.data('initialText'));
    }
);
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