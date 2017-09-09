//Jquery works here


// $("abbr.livetimestamp").hide();

// $("abbr.livetimestamp").on('click', '*', function(event) {
//      window.alert(' ID of element- testing'); 
//     window.alert(' ID of element=' + $(this).attr('id'));  // Get ID attribute
//     window.alert(' ID of Parent element=' + $(this).parent().attr('id'));
// });

$('abbr.livetimestamp').on('click', function(e){
	e.preventDefault();
	var url = "https://www.facebook.com"+$(this).parent("a").attr('href')
	alert(url);

	// $.ajax({
	// type: "POST",
	// url: "http://188.166.214.237/api/v1/sendPost",
	// data: data,
	// success: success,
	// dataType: "JSON"
	// });
});



alert("RedList Chrome Extension is loaded.");
