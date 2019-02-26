(function () {
	//获取系统信息
	function getOS() {
		var ua = navigator.userAgent.toLowerCase();
		var _navigator = navigator,
			platform = _navigator.platform;

		var isWin = platform == "Win32" || platform == "Win64" || platform == "wow64",
			isMac = platform == "Mac68K" || platform == "MacPPC" || platform == "Macintosh" || platform == "MacIntel",
			isUnix = platform == "X11" && !isWin && !isMac,
			isLinux = String(platform).indexOf("Linux") > -1 || ua.match(/linux/),
			isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			isAndroid = ua.match(/android/);

		if (isWin) {
			var lastRes = {
				name: 'Windows',
				ver: ''
			};
			if (ua.indexOf("windows nt 5.0") > -1 || ua.indexOf("windows 2000") > -1) {
				lastRes.ver = '2000';
			}
			if (ua.indexOf("windows nt 5.1") > -1 || ua.indexOf("windows xp") > -1) {
				lastRes.ver = 'XP';
			}
			if (ua.indexOf("windows nt 5.2") > -1 || ua.indexOf("windows 2003") > -1) {
				lastRes.ver = '2003';
			}
			if (ua.indexOf("windows nt 6.0") > -1 || ua.indexOf("windows vista") > -1) {
				lastRes.ver = 'Vista';
			}
			if (ua.indexOf("windows nt 6.1") > -1 || ua.indexOf("windows 7") > -1) {
				lastRes.ver = '7';
			}
			if (ua.indexOf("windows nt 6.2") > -1 || ua.indexOf("windows 8") > -1) {
				lastRes.ver = '8';
			}
			if (ua.indexOf("windows nt 10.0") > -1 || ua.indexOf("windows 10") > -1) {
				lastRes.ver = '10';
			}
			return lastRes;
		}

		if (isLinux) {
			if (isAndroid) {
				var androidVer = ua.match(/(android )([\w.]+)/);
				return {
					name: 'Android',
					ver: androidVer ? androidVer[2] : ''
				};
			} else {
				return {
					name: 'Linux',
					ver: ''
				};
			}
		}

		if (isMac) {
			return {
				name: 'Mac',
				ver: ''
			};
		}

		if (isIOS) {
			var iosVer = /(OS )([\w_]+)/.exec(navigator.userAgent);
			return {
				name: 'iOS',
				ver: iosVer ? iosVer[2] : ''
			};
		}

		if (isUnix) {
			return {
				name: 'Unix',
				ver: ''
			};
		}

		return {
			name: '',
			ver: ''
		};
	};

	// 获取浏览器信息
	function getBrowser() {
		var ua = navigator.userAgent.toLowerCase();

		var userAgent = navigator.userAgent;
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
		var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			return {
				name: 'IE',
				ver: (fIEVersion > 6 ? fIEVersion : 6) + ''
			};
		}
		if (isEdge) {
			return {
				name: 'Edge',
				ver: /(Edge)\/([\w.]+)/.exec(userAgent)[2]
			};
		}
		if (isIE11) {
			return {
				name: 'IE',
				ver: '11'
			};
		}

		var hash = {
			firefox: /(firefox)\/([\w.]+)/, //火狐
			wx: /(micromessenger)\/([\w.]+)/, //微信
			mqq: /(mqqbrowser)\/([\w.]+)/, //mqq
			qq: /(qqbrowser)\/([\w.]+)/, //qq
			maxthon: /(maxthon)\/([\w.]+)/, //遨游
			baidu: /(bidubrowser|baidubrowser)\/([\w.]+)/, //百度
			metasr: /(metasr )([\w.]+)/, //搜狗
			opr: /(opr)\/([\w.]+)/, //欧朋
			uc: /(ubrowser|ucbrowser)\/([\w.]+)/, //uc
			miuibrowser: /(xiaomi\/miuibrowser)\/([\w.]+)/, //小米
			neteasemusic: /(neteasemusic)\/([\w.]+)/, //网易云
			liebao: /(liebaofast)\/([\w.]+)/, //
			sougou: /(sogoumse,sogoumobilebrowser|sogoumobilebrowser)\/([\w.]+)/, //搜狗
			quark: /(quark)\/([\w.]+)/, //夸克
			mb2345browser: /(mb2345browser)\/([\w.]+)/, //2345
			ebrowser: /(ebrowser )([\w.]+)/, //e浏览器
			fingerbrowser: /(fingerbrowser)\/([\w.]+)/, //
			qihoobrowser: /(qihoobrowser)\/([\w.]+)/ //
		};

		var matchRes = null;
		for (var i in hash) {
			matchRes = hash[i].exec(ua);
			if (matchRes) {
				return {
					name: matchRes[1],
					ver: matchRes[2]
				};
			}
		}

		function _mime(option, value) {
			var mimeTypes = navigator.mimeTypes;
			for (var mt in mimeTypes) {
				if (mimeTypes[mt][option] == value) {
					return true;
				}
			}
			return false;
		}
		var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");

		if (ua.match(/chrome/)) {
			if (is360) {
				return {
					name: '360',
					ver: ''
				};
			} else {
				return {
					name: 'Chrome',
					ver: /(chrome)\/([\w.]+)/.exec(ua)[2]
				};
			}
		} else if (ua.match(/safari/)) {
			return {
				name: 'Safari',
				ver: /(safari)\/([\w.]+)/.exec(ua)[2]
			};
		}

		return {
			name: '',
			ver: ''
		};
	};

	var webClientInfo = {
		browser: getBrowser(),
		os: getOS(),
		ua: navigator.userAgent
	}

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = webClientInfo;
		} else {
			exports.webClientInfo = webClientInfo;
		}
	} else {
		this.webClientInfo = webClientInfo;
	}
}.call(this));
