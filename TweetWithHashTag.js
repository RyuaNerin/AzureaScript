// By @RyuaNerin

System.addKeyBindingHandler('G'.charCodeAt(0), 0, 
	function(id)
	{
		var s = TwitterService.status.get(id);
		if (!s) return;
		if (s.text.match('(#[^ #@]*)'))
		{
			TextArea.text = ' ' + RegExp.$1
			TextArea.show();
			TextArea.setFocus();
			TextArea.cursor = 0;
			return false;
		}
	}
);