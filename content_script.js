//Jquery works here

// $("abbr.livetimestamp").hide();

$('abbr.livetimestamp').on('click', function(e){
	e.preventDefault();
alert($(this).parent().attr('href'));
});

alert("RedList Chrome Extension is loaded.");
