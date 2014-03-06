// By - @iTsurea
// By - Azurea wiki http://azurea.info/ja/wiki/index.php?cmd=read&page=Scripts%2FOpenImages.js
// twitrpix / img.ly / pikchur / grab.by / via.me By - @RyuaNerin
//
// Last Update: 2012-08-25 01:25

var supportedSuffixes = ['.png', '.jpg', '.gif'];
String.prototype.endsWith = function(suffix)
{
	var sub = this.length - suffix.length;
	return (sub >= 0) && (this.lastIndexOf(suffix) === sub);
};
function GetImageURL(url)
{
	if (url.match("status/([0-9]+)/photo/1"))
	{
		var call = TwitterService.call('/statuses/show.json?id=' + RegExp.$1 + '&include_entities=true');
		if (call.match('"media_url":"([^"]*)"'))
			return RegExp.$1;
	}

	if (url.indexOf('twitter.com') > -1)
	{
		if (url.match("/([0-9]+)/photo/1"))
		{
			var call = TwitterService.call('/statuses/show.json?id=' + RegExp.$1 + '&include_entities=true');
			if (call.match('"media_url":"([^"]*)"'))
				return RegExp.$1;
		}
	}

	if (url.match("p.twipple.jp/(.+)"))
		return 'http://p.twpl.jp/show/orig/' + RegExp.$1;

	if (url.match("lockerz.com/s/(.+)"))
		return 'http://api.plixi.com/api/tpapi.svc/imagefromurl?url=http://plixi.com/p/' + RegExp.$1 + "&size=big";

	if (url.match("twitrpix.com/(.+)"))
			return 'http://img.twitrpix.com/' + RegExp.$1;

	if (url.match("img.ly/(.+)"))
			return 'http://img.ly/show/full/' + RegExp.$1;

	if (url.match("pikchur.com/(.+)"))
			return 'http://img.pikchur.com/pic_' + RegExp.$1 + '_l.jpg';

	if (url.match("pk.gd/(.+)"))
		return 'http://img.pikchur.com/pic_' + RegExp.$1 + '_l.jpg';

	if (url.indexOf('grab.by') > -1)
		if (Http.downloadString(url).match("<img id=\"thegrab\" src=\"([^\"]+)\""))
			return RegExp.$1;

	if (url.match("via.me/-(.+)"))
		if (Http.downloadString("https://api.via.me/v1/posts/" + RegExp.$1 + "?client_id=6aw0nyfokllplyk2dvubk6r3r").match('"media_url":[ ]*"([^"]+)"'))
			return RegExp.$1;
	
	if (url.match("puu.sh/[a-zA-Z0-9]+"))
		return url;

	if (url.match("pckles.com/.*?"))
		return url;
	
	if (url.match("twitpic.com/([a-zA-z0-9]*)"))
		return "http://www.twitpic.com/show/full/" + RegExp.$1;
    

	for(var i = 0; i < supportedSuffixes.length; ++i)
		if(url.endsWith(supportedSuffixes[i]))
			return url;

	return System.getPreviewUrl(url);
}

System.addKeyBindingHandler('V'.charCodeAt(0), 1,
	function(id)
	{
		var urls = [], i = -1;
		TwitterService.status.getUrls(id, urls);
		var statusid = TwitterService.status.get(id);
		if (!statusid) return;
		
		while (urls[++i])
		{
			var url = urls[i];
			if (url.indexOf('pic.twitter.com') > -1)
			{
				var call = TwitterService.call('/statuses/show.json?id=' + statusid.id + '&include_entities=true');
				if (call.match('"media_url":"([^"]+)"'))
					url = RegExp.$1.replace(/\\/g, "") + ":large";
				else
					url = null;
			}
			else
			{
				url = GetImageURL(urls[i]);
			}

			if (url && url != '')
				System.openPreview(urls[i], url);
		}
	}
);
System.addKeyBindingHandler('W'.charCodeAt(0), 1,
	function openbrowser(id)
	{
		var urls = [], i = -1;
		TwitterService.status.getUrls(id, urls);
		while (urls[++i])
			System.openUrl(urls[i]);
	}
);
System.addOpenUrlHandler(
	function(url)
	{
		var s = GetImageURL(url);
		if (s)
			return s;
	}
);