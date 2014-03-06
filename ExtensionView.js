// By @RyuaNerin
System.addKeyBindingHandler('B'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id);
		if (!status) return;
		System.views.openView(5, status.user.screen_name);
	}
);
System.addKeyBindingHandler('G'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id);
		if (!status) return;
		System.views.openView(8, status.user.screen_name);
	}
);
System.addKeyBindingHandler('R'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id);
		if (!status) return;
		System.views.openView(9, status.user.screen_name);
	}
);
System.addKeyBindingHandler('A'.charCodeAt(0), 2, 
	function(id)
	{
		var status = TwitterService.status.get(id);
		if (!status) return;
		System.views.openView(3, status.user.screen_name);
	}
);

System.addKeyBindingHandler('B'.charCodeAt(0), 1, 
	function(id)
	{
		System.views.openView(5, TwitterService.currentUser.screen_name);
	}
);
System.addKeyBindingHandler('G'.charCodeAt(0), 1, 
	function(id)
	{ 
		System.views.openView(8, TwitterService.currentUser.screen_name);
	}
);
System.addKeyBindingHandler('R'.charCodeAt(0), 1, 
	function(id)
	{
		System.views.openView(9, TwitterService.currentUser.screen_name);
	}
);
System.addKeyBindingHandler('A'.charCodeAt(0), 1, 
	function(id)
	{
		System.views.openView(3, TwitterService.currentUser.screen_name);
	}
);