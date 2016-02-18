// By @RyuaNerin

System.addKeyBindingHandler('N'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id); 
		if (!status) return;
		System.clipboard = "https://twitter.com/#!/" + status.user.screen_name + "/status/" + status.id;
	}
);
System.addKeyBindingHandler('W'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id); 
		if (!status) return;
		var url = "https://twitter.com/#!/" + status.user.screen_name + "/status/" + status.id;
		System.launchApplication("explorer", url, 0);
	}
);
System.addKeyBindingHandler('C'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id); 
		if (!status) return;

		var text = status.text;

		var i = 0;
		for (i = 0; i < status.entities.urls.length; i++)
			text = text.replace("/" + status.entities.urls[i].display_url + "/g", status.entities.urls[i].url);

		System.clipboard = status.text;
	}
);