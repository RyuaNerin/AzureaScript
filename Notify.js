var TOAST_MESSAGE = 0x100000;
var username = '@' + TwitterService.currentUser.screen_name + '$|@' + TwitterService.currentUser.screen_name + ' ';

TwitterService.addEventListener('preProcessTimelineStatus', 
	function(status)
	{
		//if (status.text.indexOf(username) > -1)
		if (status.text.match(username))
			if (status.created_at > (Math.round(new Date().getTime() / 1000.0) - 10))
				if (status.retweeted)
					System.showMessage(status.text, 'RT : ' + status.retweeted_by, TOAST_MESSAGE);
				else
					System.showMessage(status.text, 'MT : ' + status.user.screen_name, TOAST_MESSAGE);
	}
);

TwitterService.userStream.addEventListener('receiveDirectMessage', 
	function(message) 
	{
		System.showMessage(message.text, 'DM : ' + message.sender.screen_name, TOAST_MESSAGE);
	}
);
/*
TwitterService.userStream.addEventListener('receiveFavorite',
	function(source, target, target_object)
	{
		System.showMessage(target_object.text, 'Fv : ' + source.screen_name, TOAST_MESSAGE);
	}
);
*/