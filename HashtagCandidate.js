// ハッシュタグのリスト
var candidates = [];
var candidates_hash = {};

// 前方一致で最初にマッチするインデックスを返す
Array.prototype.lowerBound = function(s)
{
	for(var i = 0; i < this.length; ++i)
		if(this[i].length >= s.length)
			if(this[i].slice(0, s.length).toUpperCase() == s.toUpperCase())
				return i;
};

// 前方一致でマッチする項目を抽出する
Array.prototype.subset = function(s)
{
	var arr = [];
	var idx = this.lowerBound(s);
	for(var i = idx; i < this.length; ++i)
		if(this[i].length >= s.length)
			if(this[i].slice(0, s.length).toUpperCase() == s.toUpperCase())
				arr.push(this[i]);
			else
				break;
			
		else
			break;
	
	return arr;
};

// ハッシュタグ編集中なら#の位置をかえす。
// そうでないならundefined
function hashtagEditing(tex, beg)
{
	var hbeg;
	var hash = false;
	for(var i = beg - 1; i >= 0; --i)
	{
		if(!tex.charAt(i).match(/[^@# ]/))
		{
			if(tex.charAt(i) == '#')
			{
				hbeg = i;
				hash = true;
				break;
			}
			else
			{
				return undefined;
			}
		}
	}
	if(!hash) return undefined;
	return hbeg;
}

// ハッシュタグ補完を処理する
function processCandidate(fwd)
{
	var r = TextArea.selectedRange;
	var beg = (r & 0xffff);
	var hbeg = beg;
	var end = (r >> 16) & 0xffff;
	var tex = TextArea.text;
	if(arguments.length == 2)
	{
		tex = tex.slice(0, beg) + arguments[1] + tex.slice(end);
		beg += 1;
		end = beg;
	}
	hbeg = hashtagEditing(tex, beg);
	if(hbeg == undefined) return false;
	var cds = candidates.subset(tex.slice(hbeg, beg));
	var idx = cds.lowerBound(tex.slice(hbeg, end));
	idx += fwd ? 1 : -1;
	if(idx == cds.length) idx = 0;
	if(cds.length == 0 || cds[idx] == undefined) return arguments.length == 0;
	tex = tex.slice(0, hbeg) + cds[idx] + tex.slice(end);
	TextArea.text = tex;
	TextArea.select(beg, cds[idx].length + hbeg);
	return true;
}

// 文字入力されたときのイベント処理。
TextArea.addEventListener('char', function(c){
	if(c == '#'){
		// とりあえずハッシュタグを突っ込む
		var r = TextArea.selectedRange;
		var beg = (r & 0xffff);
		var hbeg = beg;
		var end = (r >> 16) & 0xffff;
		var cur = TextArea.cursor;
		var tex = TextArea.text;
		var partA = tex.slice(0, cur);
		var partB = tex.slice(cur);
		var candidate = false;
		if (beg != end && hashtagEditing(tex, beg) != undefined) return true;
		if (candidates.length > 0)
		{
			tex = partA + candidates[0] + partB;
			candidate = true;
		}
		else
		{
			tex = partA + '#' + partB;
		}

		TextArea.text = tex;
		TextArea.cursor = cur + 1;
		if(candidate)
			TextArea.select(cur + 1, cur + candidates[0].length);
		
		return true;
	}
	else if(c==' ')
	{
		// 選択範囲があってかつ、ハッシュタグの範囲であれば選択を解除して半角スペースを入力
		var r = TextArea.selectedRange;
		var beg = (r & 0xffff);
		var hbeg = beg;
		var end = (r >> 16) & 0xffff;
		var tex = TextArea.text;
		if(beg == end) return false;
		hbeg = hashtagEditing(tex, beg);
		if(hbeg == undefined) return false;
		tex = tex.slice(0, end) + ' ' + tex.slice(end);
		TextArea.text = tex;
		TextArea.cursor = end + 1;
		return true;
	}
	else
		{
		// ハッシュタグとして有効な文字ならさらに補完
		if(c.match(/[^@# ]/))
			return processCandidate(true, c);
	}
});

// KeyDownをフック
TextArea.addEventListener('keydown', function(c, m){
	if(c==9)
		return processCandidate((m & 1) == 0);
});

// TL更新完了イベントをフック
// ハッシュタグリストを更新する

TwitterService.addEventListener('preProcessTimelineStatus', function(status){
	var s = "";

	for (var i = 0; i < status.entities.hashtags.length; i++)
	{
		s = status.entities.hashtags[i].text;

		if(candidates_hash[s] == undefined){
			candidates_hash[s] = 1;
			candidates.push(s);
			candidates.sort();
		}
	}

});


// 終了イベントをフック
// 補完リストを保存する
System.addEventListener('quit',
function()
{
	var value = candidates.join('\n');
	if(value[0] == '\n') value = value.slice(1);
	FileSystem.privateStore.write('list.txt', value, 3);
});

// 保存された補完リストを読み込む
if(FileSystem.privateStore.exists('list.txt'))
{
	var value = FileSystem.privateStore.read('list.txt');
	if(value != '')
	{
		candidates = value.split('\n');
		candidates.sort();
		for(var i = 0; i < candidates.length; ++i) candidates_hash[candidates[i]] = 1;
	}
}