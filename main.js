function retrieveList(){
  chrome.storage.sync.get("list", function(items) {
    alert(items.list);
    console.log(items.list.toString());
    var list_obj = JSON.parse(items.list)
    var content = ""

    list_obj.forEach(function(arrayItem){
		content += "<div class=\"comment-item\">"+
			"<div class=\"comment-content\">"+
				"<a href=\"https://facebook.com/"+arrayItem.user_id+"\">"+arrayItem.name+"</a>"+
			"</div>"+
			"<div class=\"comment-content\">"+
			arrayItem.message+
			"</div>"+
			"<span class=\"comment-content\">"+
				"<a class=\"view_original\" href=\""+arrayItem.full_url+"\">View Original</a>"+
			"</span>"+
		"</div>"
    });
    $("#replace").replaceWith(content);
  });
}

retrieveList();