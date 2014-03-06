// Azurea Custom via
// By @RyuaNerin

// A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
// in FIPS PUB 180-1
// Version 2.1a Copyright Paul Johnston 2000 - 2002.
// Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
// Distributed under the BSD License
// See http://pajhome.org.uk/crypt/md5 for details.

/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.
*/

// Alt + C : OAuth 발급여부 확인
// Alt + L : OAuth 발급
// Alt + D : OAuth 발급 삭제

var hexcase = 0;
var b64pad  = "";
var chrsz   = 8;
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function core_sha1(x, len)
{
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;
    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
}
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

function getNonce()
{
	return Math.floor(Math.random() * 16777216).toString(16);
}
function getTimestamp()
{
	return parseInt(+new Date() / 1000, 10);
}
function urlEncode(string)
{
	function hex(code)
	{
		var hex = code.toString(16).toUpperCase();
		if (hex.length < 2)
			hex = 0 + hex;
		return '%' + hex;
	}

	if (!string)
		return '';

	string = string + '';
	var reserved_chars = /[ \r\n!*"'();:@&=+$,\/?%#\[\]<>{}|`^\\\u0080-\uffff]/,
	str_len = string.length, i, string_arr = string.split(''), c;

	for (i = 0; i < str_len; i++)
	{
		if (c = string_arr[i].match(reserved_chars))
		{
			c = c[0].charCodeAt(0);

			if (c < 128)
				string_arr[i] = hex(c);
			else if (c < 2048)
				string_arr[i] = hex(192+(c>>6)) + hex(128+(c&63));
			else if (c < 65536)
				string_arr[i] = hex(224+(c>>12)) + hex(128+((c>>6)&63)) + hex(128+(c&63));
			else if (c < 2097152)
				string_arr[i] = hex(240+(c>>18)) + hex(128+((c>>12)&63)) + hex(128+((c>>6)&63)) + hex(128+(c&63));
		}
	}

	return string_arr.join('');
};



System.addKeyBindingHandler("1".charCodeAt(0), 1, function() { System.setActiveProfile(0); });
System.addKeyBindingHandler("2".charCodeAt(0), 1, function() { System.setActiveProfile(1); });
System.addKeyBindingHandler("3".charCodeAt(0), 1, function() { System.setActiveProfile(2); });
System.addKeyBindingHandler("4".charCodeAt(0), 1, function() { System.setActiveProfile(3); });
System.addKeyBindingHandler("5".charCodeAt(0), 1, function() { System.setActiveProfile(4); });
System.addKeyBindingHandler("6".charCodeAt(0), 1, function() { System.setActiveProfile(5); });
System.addKeyBindingHandler("7".charCodeAt(0), 1, function() { System.setActiveProfile(6); });
System.addKeyBindingHandler("8".charCodeAt(0), 1, function() { System.setActiveProfile(7); });
System.addKeyBindingHandler("9".charCodeAt(0), 1, function() { System.setActiveProfile(8); });
System.addKeyBindingHandler("0".charCodeAt(0), 1, function() { System.setActiveProfile(9); });

var via_usable = true;

var ConsumerToken = System.settings.getValue("user.RyuaNerin.CustomVia", "ConsumerToken");
var ConsumerSecret = System.settings.getValue("user.RyuaNerin.CustomVia", "ConsumerSecret");
if (!ConsumerToken || !ConsumerSecret || (ConsumerToken == "") || (ConsumerSecret == ""))
{
	ConsumerToken = "";
	ConsumerSecret = "";

	ConsumerToken = System.inputBox("Consumer Token", "", false);
	if (ConsumerToken && (ConsumerToken != ""))
	{
		ConsumerSecret = System.inputBox("Consumer Secret", "", false);
		
		if (!ConsumerToken || !ConsumerSecret || (ConsumerToken == "") || (ConsumerSecret == ""))
		{
			via_usable = false;
		}
		else
		{
			System.settings.setValue("user.RyuaNerin.CustomVia", "ConsumerToken", ConsumerToken);
			System.settings.setValue("user.RyuaNerin.CustomVia", "ConsumerSecret", ConsumerSecret);
			System.settings.reconfigure();
		}
	}
}

if (via_usable)
{
	TwitterService.addEventListener("preSendUpdateStatus", TweetByCustomVia);
	System.addKeyBindingHandler("C".charCodeAt(0), 4, CheckProfile);
	System.addKeyBindingHandler("D".charCodeAt(0), 4, DeleteOAuth);
	System.addKeyBindingHandler("L".charCodeAt(0), 4, GenarateOAuth);
}

var activedProfile = -1;
var UserToken = "";
var UserTokenSecret = "";
var UserScreenName = "";

function LoadToken()
{
	if (activedProfile != System.activeProfile)
	{
		activedProfile = System.activeProfile;
		UserToken = System.settings.getValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserToken");
		UserTokenSecret = System.settings.getValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserTokenSecret");
		UserScreenName = System.settings.getValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "ScreenName");
	}

	if (!UserToken || !UserTokenSecret || (UserToken == "") || (UserTokenSecret == ""))
		return false;
	else
		return true;
}
function CheckProfile()
{
	if (LoadToken())
		System.alert("현재 프로필은 Custom Via 를 사용하고 있습니다\n로그인된 ID : @" + UserScreenName + "\nCustom Via 사용하지 않기 : Alt + D");
	else
		System.alert("현재 프로필은 Custom Via 를 사용하고 있지 않습니다\nCustom Via 사용하기 : Alt + L");
}
function TweetByCustomVia(status)
{
	if (!LoadToken()) return;

	TextArea.hide();

	TweetWithCustomVia(status.in_reply_to_status_id, status.text);

	TextArea.in_reply_to_status_id = 0;
	TextArea.text = "";
	
	return true;
}
function TweetWithCustomVia(in_reply_to_status_id, str)
{
	var hash_parameter = "";

	var result = false;

	if (in_reply_to_status_id > 0) hash_parameter = "in_reply_to_status_id=" + in_reply_to_status_id + "&";

	hash_parameter += "oauth_consumer_key=" + ConsumerToken + "&oauth_nonce=" + getNonce() + "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" + getTimestamp() + "&oauth_token=" + UserToken + "&oauth_version=1.0&status=" + urlEncode(str);
	var hash_string = "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&" + urlEncode(hash_parameter);
	var oauth_signature = b64_hmac_sha1(ConsumerSecret + "&" + UserTokenSecret, hash_string);
	hash_parameter = hash_parameter + "&oauth_signature=" + urlEncode(oauth_signature) + "%3D";

	Http.postRequestAsync("https://api.twitter.com/1.1/statuses/update.json?" + hash_parameter, "", false, 
			function(status)
			{
				if (status.statusCode != "200")
				{
					if (status.body.indexOf("User is over daily status update limit") !== -1)
					{
						System.showNotice("HTTP 오류 0:  update Limit exceeded");
						System.activeProfile++;
					}
					else if(status.statusCode == "401")
					{
						System.showNotice("HTTP 오류 401: Unauthorized");
					}
					else if (status.statusCode == "403")
					{
						System.showNotice("HTTP 오류 403: Update Status");
					}
					else
					{
						System.showNotice("HTTP 오류 " + status.statusCode);
					}
					

					if (TextArea.text == "")
					{
						TextArea.in_reply_to_status_id = in_reply_to_status_id;
						TextArea.text = str;
						TextArea.show();
						TextArea.setFocus();
					}
				}
			}
		);
}
function DeleteOAuth()
{
	if (!LoadToken())
	{
		System.alert("현재 프로필은 Custom Via 를 사용하고 있지 않습니다\nCustom Via 사용하기 : Alt + L");
		return;
	}

	System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserToken", "");
	System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserTokenSecret", "");
	System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "ScreenName", "");
	System.settings.reconfigure();

	System.alert("현재 프로필의 Custom Via 인증 정보를 삭제했습니다");

	UserToken = null;
	UserTokenSecret = null;
}
function ParseQuerystringParameter(parameterName, text)
{
	var expr = new RegExp(parameterName + "=([^&]+)", "gi");
	var matching = expr.exec(text);
	if (!matching)
		return null;

	return RegExp.$1;
}
function GenarateOAuth()
{
	if (LoadToken())
	{
		System.alert("이미 Custom via 를 사용중입니다!\nCustom Via 사용하지 않기 : Alt + D");
		return;
	}

	var hash_parameter = "oauth_callback=oob&oauth_consumer_key=" + ConsumerToken + "&oauth_nonce=" + getNonce() + "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" + getTimestamp() + "&oauth_version=1.0";
	var hash_string = "POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&" + urlEncode(hash_parameter);

	var oauth_signature = b64_hmac_sha1(ConsumerSecret + "&", hash_string);

	hash_parameter = hash_parameter + "&oauth_signature=" + urlEncode(oauth_signature) + "%3D";
	Http.postRequestAsync("https://api.twitter.com/oauth/request_token?" + hash_parameter, "", false,
		function(status1)
		{
			if (!status1 || (status1.statusCode != "200"))
			{
				System.alert("에러가 발생하였습니다!");
				return;
			}

			var OAuthToken = ParseQuerystringParameter("oauth_token", status1.body);
			var OAuthTokenSecret = ParseQuerystringParameter("oauth_token_secret", status1.body);
			
			System.launchApplication("explorer", "\"https://api.twitter.com/oauth/authorize?oauth_token=" + OAuthToken + "\"", 1);
			
			var pin = System.inputBox("핀번호", "", false);

			hash_parameter = "oauth_callback=oob&oauth_consumer_key=" + ConsumerToken + "&oauth_nonce=" + getNonce() + "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" + getTimestamp() + "&oauth_token=" + OAuthToken + "&oauth_verifier=" + pin + "&oauth_version=1.0";
			hash_string = "POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Faccess_token&" + urlEncode(hash_parameter);
			oauth_signature = b64_hmac_sha1(ConsumerSecret + "&" + OAuthTokenSecret, hash_string);
			hash_parameter = hash_parameter + "&oauth_signature=" + urlEncode(oauth_signature) + "%3D";
			http = Http.postRequestAsync("https://api.twitter.com/oauth/access_token?" + hash_parameter, "", false,
				function(status2)
				{
					if (!status2 || (status2.statusCode != "200"))
					{
						System.alert("에러가 발생하였습니다!");
						return;
					}
					UserToken = ParseQuerystringParameter("oauth_token", status2.body);
					UserTokenSecret = ParseQuerystringParameter("oauth_token_secret", status2.body);
					UserScreenName = ParseQuerystringParameter("screen_name", status2.body);

					System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserToken", UserToken);
					System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "UserTokenSecret", UserTokenSecret);
					System.settings.setValue("user.RyuaNerin.CustomVia.Profile" + System.activeProfile, "ScreenName", UserScreenName);
					System.settings.reconfigure();

					System.alert("현재 프로필은 Custom Via 를 사용합니다\n로그인된 ID : @" + UserScreenName + "\nCustom Via 사용하지 않기 : Alt + D");
				}
			);
		}
	);
}