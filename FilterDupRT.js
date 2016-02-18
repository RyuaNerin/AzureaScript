var myid = TwitterService.currentUser.screen_name;
var rtn = {};
var rtc = {};

TwitterService.addEventListener('preFilterProcessTimelineStatus', function(status)
{
	if (status.user.screen_name == myid)
		return false;
	
	if (status.retweeted && status.retweeted_by == myid)
		return false;

	// 리트윗 된거 아니면 초기화함
	if (!status.retweeted)
	{
		if ((status.retweeted_by in rtn) == 0)
		{
			delete rtn[status.user.screen_name];
			delete rtc[status.user.screen_name];
		}

		return false;
	}
	else
	{
		if ((status.retweeted_by in rtn) != 0)
		{
			if (rtn[status.retweeted_by] == status.user.screen_name)
			{
				if (rtc[status.retweeted_by] == 1)
					return true;
				else
					rtc[status.retweeted_by] = rtc[status.retweeted_by] + 1;
			}
			else
			{
				rtn[status.retweeted_by] = status.user.screen_name;
				rtc[status.retweeted_by] = 1;
			}
		}
		else
		{
			rtn[status.retweeted_by] = status.user.screen_name;
			rtc[status.retweeted_by] = 1;
		}
	}

	return false;
});







