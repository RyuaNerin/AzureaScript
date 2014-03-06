//
// Simple Profile
// By. Itsurea
//
function getWorldTime(data) {
	var now = new Date(data);
	tzOffset = 9;
	var tz = now.getTime() + (now.getTimezoneOffset() * 60000) + (tzOffset * 3600000);
	now.setTime(tz);
	week = Array("일","월","화","수","목","금","토");
	day = week[now.getDay()];

	var s = 
		leadingZeros(now.getFullYear(), 4) + '/' +
		leadingZeros(now.getMonth() + 1, 2) + '/' +
		leadingZeros(now.getDate(), 2) + ' ' +
		day + ' ' +
		leadingZeros(now.getHours(), 2) + ':' +
		leadingZeros(now.getMinutes(), 2) + ':' +
		leadingZeros(now.getSeconds(), 2);

	return s;
}
function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits)
		for (i = 0; i < digits - n.length; i++)
			zero += '0';

	return zero + n;
}
function profile(id) {
	var st = TwitterService.status.get(id);
	if (!st) return;

	var twitter = TwitterService.call('/users/show.json?include_entities=false&screen_name=' + st.user.screen_name);
	//twitter.charset = 'euc-kr';
	var myfw = TwitterService.call('/followers/ids.json?count=1000');
	
	var tweet = 0;
	var fw = 0;
	var fi = 0;
	var fav = 0;
	var fwing = true;
	var create = "";
	var fchk = "";
	var prt = "";
	
	if (twitter.match('"statuses_count":[ ]*([0-9]+)'))
		tweet = RegExp.$1;
	
	if (twitter.match('"followers_count":[ ]*([0-9]+)'))
		fw = RegExp.$1;
	
	if (twitter.match('"friends_count":[ ]*([0-9]+)'))
		fi = RegExp.$1;
	
	if (twitter.match('"favourites_count":[ ]*([0-9]+)'))
		fav = RegExp.$1;
	
	if (twitter.indexOf('"following":[ ]*true'))
		fwing = true;
	else
		fwing = false;
	
	if (twitter.match('"created_at":[ ]*"([^"]*)"'))
	{
		create = RegExp.$1;
		create = create.replace('+0000','UTC+0000');
	}
	
	if (myfw.match(st.user.id + ",|" + st.user.id + "]"))
		if (fwing)
			fchk = "↔";
		else
			fchk = "→";
	else
		if (fwing)
			fchk = "←";
		else
			fchk = "─";
	
	if (TwitterService.currentUser.id == st.user.id)
		fchk = "〓";

	if (st.user.protected)
		prt = " Protected";
	else
		prt = "";

	System.alert(fchk + " " + st.user.name + " (@" + st.user.screen_name + ")" + prt +
	"\n팔로잉 : " + fi +
	"\n팔로워 : " + fw +
	"\n트윗수 : " + tweet +
	"\n관심글 : " + fav +
	"\n계정 생성일 : " + getWorldTime(create)
	);
};

System.addKeyBindingHandler('I'.charCodeAt(0), 0, profile);