//
// Filtering Bot Tweets
//
// By @RyuaNerin

var dropClient = [ "twittbot.net", "SaucerInfo", "TweetMag1c for Android", "REFLEC BEAT colette AC", "このまま眠りつづけて死ぬ", "ツイート数カウントくん", "占ぃったー", "うんこはにがくてうまい", "ツイ廃あらーと", "なるほどコカインマンじゃねーの", "リプライ数チェッカ", "ReflecInfo"];

Array.prototype.indexOf = function(s)
{
	for (var i = 0; i < this.length; ++i )
		if(this[i] == s) return i;

	return -1;
};

TwitterService.addEventListener("preFilterProcessTimelineStatus", function(status)
{
	return dropClient.indexOf(status.source) != -1;
});

System.addKeyBindingHandler('N'.charCodeAt(0), 0,
	function(id)
	{
		var s = TwitterService.status.get(id);
		if (!s) return;
		System.clipboard = s.source;
	}
);

