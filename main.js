function retrieveList(){
  chrome.storage.sync.get("list", function(items) {
    console.log(items.list.toString());
    var latest_list = JSON.parse(items.list)
    var content = ""

    latest_list.forEach(function(arrayItem){
		content += "<div class=\"comment-item\">"+
			"<div class=\"comment-content\">"+
				"<a href=\"https://facebook.com/"+arrayItem.user_id+"\">"+arrayItem.name+"</a>"+
			"</div>"+
			"<div class=\"comment-content\">"+
			arrayItem.message+
			"</div>"+
			"<span class=\"comment-content\">"+
				"<a class=\"menu-item\" href=\""+arrayItem.full_url+"\">View Original</a>"+
				//"<a class=\"menu-item delete\" href=\"#\" data-url=\""+arrayItem.full_url+"\">Delete</a>"+
			"</span>"+
		"</div>"
    });
    $("#replace").replaceWith(content);
  });
}

retrieveList();