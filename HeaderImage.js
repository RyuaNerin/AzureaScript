// View Header Image

System.addKeyBindingHandler('I'.charCodeAt(0), 1, viewProfile);
System.addKeyBindingHandler('I'.charCodeAt(0), 2, viewHeader);

function viewProfile(id) {
	var st = TwitterService.status.get(id);
	if (!st) return;

	var twitter = TwitterService.call('/users/show.json?include_entities=false&screen_name=' + st.user.screen_name);
	
	if (twitter.match('"profile_image_url_https"[ ]*:[ ]*"([^"]+)"'))
		System.openPreview("http://twitter.com/" + st.user.screen_name, RegExp.$1.replace(/\/\//g, "/").replace(/\\/g, "").replace("_normal", ""));
};

function viewHeader(id) {
	var st = TwitterService.status.get(id);
	if (!st) return;

	var twitter = TwitterService.call('/users/profile_banner.json?screen_name=' + st.user.screen_name).replace(/\/\//g, "/").replace(/\\/g, "");

	if (twitter.match('(https://[^/]+/profile_banners/[0-9]+/[0-9]+/)'))
		System.openPreview("http://twitter.com/" + st.user.screen_name, RegExp.$1 + "web_retina");
};