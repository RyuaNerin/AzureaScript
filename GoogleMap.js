System.addKeyBindingHandler('M'.charCodeAt(0), 0,
	function(id){
		var s = TwitterService.status.get(id);
		if(s.geo.lat != 0xffff){
			var staticMap = 'http://maps.google.com/maps/api/staticmap?size=512x512&maptype=roadmap&markers=size:mid|color:red|'+s.geo.lat+','+s.geo.lon+'&sensor=false';
			var mapUrl = 'http://maps.google.co.jp/maps?q='+s.geo.lat+','+s.geo.lon;
			System.openPreview(mapUrl, staticMap);
		}
	}
);


