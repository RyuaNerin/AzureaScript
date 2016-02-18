var myid = TwitterService.currentUser.id;
var mysn = TwitterService.currentUser.screen_name;

// 유저 아이디를 ' 으로 감싸서 넣으면 됨 , 으로 구분
// 예)
// var dropUser = [ 'olleh', 'olleh_cs', 'oisoo' ];
var dropUser = [  ];

Array.prototype.Containss = function(s)
{
	for (var i = 0; i < this.length; ++i )
		if(this[i] == s)
			return true;
	
	return false;
};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(status)
{
	if (dropUser.Containss(status.retweeted_by))
		return true;

	if (status.user.id == myid)
		return false;

	if (status.in_reply_to_status_id == myid)
		return false;

	if (status.text.indexOf(mysn) >= 0)
		return false;
	
	for (var i = 0; i < dropUser.length; ++i )
		if (status.text.indexOf(dropUser[i]) >= 0)
			return true;

	if (dropUser.Containss(status.user.screen_name))
		return true;

	return false;
});