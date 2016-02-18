//
// Filtering Bot Tweets
//
// By @RyuaNerin

var dropClient = [ "twittbot.net", "SaucerInfo", "TweetMag1c for Android", "REFLEC BEAT colette AC", "このまま眠りつづけて死ぬ", "ツイート数カウントくん", "占ぃったー", "うんこはにがくてうまい", "ツイ廃あらーと", "なるほどコカインマンじゃねーの", "リプライ数チェッカ", "ReflecInfo", "우사긔 봇", '알람런 AlarmRun (Social Alarm)', 'IFTTT'];

Array.prototype.Contains = function(s)
{
	for (var i = 0; i < this.length; ++i )
		if(this[i] == s)
			return true;

	return false;
};

TwitterService.addEventListener("preFilterProcessTimelineStatus", function(status)
{
	return !status.retweeted && dropClient.Contains(status.source);
});