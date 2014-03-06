System.addKeyBindingHandler('U'.charCodeAt(0), 0,
	function(id)
	{
		var st = TwitterService.status.get(id);
		if (!st) return;
		
		var twitter = TwitterService.call('/statuses/show.json?id=' + st.id);

		var tx = "";		
		var fv = 0;
		var rt = 0;

		if (twitter.match('"retweet_count":[ ]*([0-9]+)'))
			rt = RegExp.$1;
		
		if (twitter.match('"favorite_count":[ ]*([0-9]+)'))
			fv = RegExp.$1;

		
		System.alert(
			st.user.name + " (@" + st.user.screen_name + ")" +
			"\n" + st.text +
			"\n" +
			"\n리트윗 : " + rt +
			"\n관심글 : " + fv);
	}
);