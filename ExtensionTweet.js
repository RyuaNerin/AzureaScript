//
// Extension Tweet
// By. Itsurea
//
// W(QT) By @RyuaNerin


System.addKeyBindingHandler('W'.charCodeAt(0), 0, 
	function(id)
	{
		var status = TwitterService.status.get(id);
		if (!status) return;

		TextArea.text = ' RT @' + status.user.screen_name + ': ' + status.text;
		
		if (status.retweeted)
			TextArea.in_reply_to_status_id = status.retweeted_id;
		else
			TextArea.in_reply_to_status_id = status.id;
			
		// 수동 RT 링크 수정
		
		var i = 0;
		for (i = 0; i < status.entities.urls.length; i++)
			TextArea.text = TextArea.text.replace(status.entities.urls[i].display_url, status.entities.urls[i].url);
		
		TextArea.show();
		TextArea.setFocus();
		TextArea.cursor = 0;
	}
);
Array.prototype.contains = function(element)
{
	for (var i = 0; i < this.length; i++)
		if (this[i].toLowerCase() == element.toLowerCase())
			return true;
	return false;
}
System.addKeyBindingHandler('E'.charCodeAt(0), 0, 
	function(status_id)
	{
		var status = TwitterService.status.get(status_id);
		if (!status) return;

		var status_users = [];
		TwitterService.status.getUsers(status_id, status_users);

		var me = TwitterService.currentUser.screen_name;
		var new_users = new Array();

		new_users.push(status.user.screen_name);
		for (var i = 0; i < status_users.length; i++)
			if (status_users[i].toLowerCase() != me.toLowerCase())
				if (!new_users.contains(status_users[i]))
					new_users.push(status_users[i]);

		TextArea.show();
		TextArea.text = '@' +  new_users.join(' @') + ' ';
		TextArea.in_reply_to_status_id = status_id;
		TextArea.setFocus();
		TextArea.cursor = TextArea.text.length;  
	}
);
System.addKeyBindingHandler('D'.charCodeAt(0), 2,
	function(id) {
		var status = TwitterService.status.get(id);
		if (!status) return;
		var me = TwitterService.currentUser.screen_name;
		var user = status.user.screen_name;
		var rtchk = status.retweeted_by;
		var home_time = System.views.currentView;
		var selectid = home_time.selectedItem.id;
		if (user == me)
			TwitterService.status.destroy(id);

		if (rtchk == me)
			TwitterService.status.destroy(id);
	}
);