/*

去广告surge脚本
起点开屏页正则
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v4\/client\/getsplashscreen
起点每日导读
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/dailyrecommend\/getdailyrecommend
起点强制跳转精选页面修改为不跳转
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v2\/deeplink\/geturl
起点客户端getconf
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/client\/getconf
起点去除下方(精选 发现 中间的)活动tab
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/adv\/getadvlistbatch\?positions=iOS_tab
穿山甲正则(如vgtime调用了)
^https:\/\/api-access\.pangolin-sdk-toutiao\.com\/api\/ad\/union\/sdk\/get_ads
优量汇广告
^https:\/\/mi\.gdt\.qq\.com\/gdt_mview\.fcg\?
vgtime开屏页正则
^http:\/\/app02\.vgtime\.com:8080\/vgtime-app\/api\/v2\/init\/ad\.json
腾讯新闻开屏页正则
^https:\/\/news\.ssp\.qq\.com\/app
腾讯新闻新闻列表正则
^https:\/\/r\.inews\.qq\.com\/getQQNewsUnreadList
腾讯新闻专题新闻列表正则
^https:\/\/r\.inews\.qq\.com\/getQQNewsMixedList
腾讯新闻话题新闻列表正则
^https:\/\/r\.inews\.qq\.com\/getTopicSelectList
腾讯新闻专题-视频精选
^https:\/\/r\.inews\.qq\.com\/getQQNewsSpecialListItemsV2
QQ音乐开屏广告
^https:\/\/us\.l\.qq\.com\/exapp
*/

let url = $request.url;
let method = $request.method;
let body = JSON.parse($response.body);

let notifiTitle = "去广告脚本错误";
let getMethod = "GET";
let postMethod = "POST";

if (url.indexOf("magev6.if.qidian.com/argus/api/v4/client/getsplashscreen") != -1 && method == getMethod) {
	console.log('起点-开屏页');
	if (body.Data == undefined || body.Data.List == undefined) {
		console.log("body:" + $response.body);
	} else {
		body.Data.List = null;
		console.log('成功')
	}
} else if (url.indexOf("magev6.if.qidian.com/argus/api/v2/deeplink/geturl") != -1 && method == getMethod) {
	console.log('起点-不跳转精选页');
	if (body.hasOwnProperty('Data') && body.Data.hasOwnProperty('ActionUrl') && body.Data.ActionUrl === 'QDReader://Bookstore') {
		body.Data = null;
		console.log('成功')
	} else {
		console.log('无需处理,body:' + $response.body)
	}
} else if (url.indexOf("magev6.if.qidian.com/argus/api/v1/adv/getadvlistbatch?positions=iOS_tab") != -1 && method == getMethod) {
	console.log('起点-iOS_tab');
	if (body.Data === undefined || body.Data.iOS_tab === undefined) {
		console.log("body:" + $response.body);
	} else {
		if (body.Data.iOS_tab.length == 0) {
			console.log('返回配置空')
		} else {
			body.Data.iOS_tab = [];
			console.log('成功')
		}
	}
} else if (url.indexOf("magev6.if.qidian.com/argus/api/v1/dailyrecommend/getdailyrecommend") !== -1 && method === getMethod) {
	console.log('起点-每日导读');
	if (body.hasOwnProperty('Data') && body.Data !== null && body.Data.length !== 0) {
		body.Data = [];
		console.log('成功')
	} else {
		console.log('每日导读无数据')
	}
} else if (url.indexOf("magev6.if.qidian.com/argus/api/v1/client/getconf") != -1 && method == postMethod) {
	console.log('起点-getconf');
	if (body.Data === undefined) {
		console.log("body:" + $response.body);
	} else {
		if (body.Data.ActivityPopup === undefined || body.Data.ActivityPopup.Data == undefined) {
			console.log("body:" + $response.body);
		} else {
			body.Data.ActivityPopup = null;
			console.log('ActivityPopup(活动弹窗)成功')
		}
		if (body.Data.hasOwnProperty('WolfEye') && body.Data.WolfEye === 1) {
			console.log('WolfEye修改为0');
			body.Data.WolfEye = 0
		} else {
			console.log('无需修改WolfEye')
		}
		if (body.Data.ActivityIcon === undefined || body.Data.ActivityIcon.Type !== 0) {
			console.log("body:" + $response.body);
		} else {
			if (body.Data.ActivityIcon.EndTime === 0) {
				console.log('无ActivityIcon配置')
			} else {
				body.Data.ActivityIcon.StartTime = 0;
				body.Data.ActivityIcon.EndTime = 0;
				delete body.Data.ActivityIcon.Actionurl;
				delete body.Data.ActivityIcon.Icon;
				console.log('ActivityIcon成功')
			}
		}
		if (body.Data.EnableSearchUser === undefined || body.Data.EnableSearchUser != "0") {
			console.log("body:" + $response.body);
		} else {
			body.Data.EnableSearchUser = "1";
			console.log('允许搜索用户成功')
		}
		if (body.Data.hasOwnProperty('EnableClipboardReading')) {
			if (body.Data.EnableClipboardReading === 1) {
				body.Data.EnableClipboardReading = 0;
				console.log('不允许读取剪切板')
			} else {
				console.log('无需修改剪切板配置')
			}
		} else {
			console.log("body:" + $response.body);
		}
	}
} else if (url.indexOf("api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk") != -1 && method == postMethod) {
	console.log('穿山甲-get_ads');
	if (body.message === undefined) {
		console.log("body:" + $response.body);
		if (body.status_code === undefined) {
		} else {
			console.log('广告为空')
		}
	} else {
		body.message = null;
		console.log('成功')
	}
} else if (url.indexOf("app02.vgtime.com:8080/vgtime-app/api/v2/init/ad.json") != -1 && method == postMethod) {
	console.log('vgtime-开屏页');
	if (body.data == undefined || body.data.ad === undefined) {
		console.log("body:" + $response.body);
	} else {
		body.data.ad = null;
		console.log('成功')
	}
} else if (url.indexOf("news.ssp.qq.com/app") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-开屏页')
} else if (url.indexOf("r.inews.qq.com/getQQNewsUnreadList") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-要闻/财经等')
} else if (url.indexOf("r.inews.qq.com/getQQNewsMixedList") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-专题列表-MixedList')
} else if (url.indexOf("r.inews.qq.com/getTopicSelectList") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-话题列表')
} else if (url.indexOf("r.inews.qq.com/getQQNewsSpecialListItemsV2") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-视频精选(专题)')
} else if (url.indexOf("r.inews.qq.com/getTwentyFourHourNews") != -1 && method == postMethod) {
	qqNewsAdList(body, '腾讯新闻-热点精选')
} else if (url.indexOf('us.l.qq.com/exapp?') != -1 && method == getMethod) {
	console.log('qq音乐-开屏页');
	if (body.data === undefined) {
		console.log("body:" + $response.body);
	} else {
		let dataObj = body.data;
		let count = 0;
		for (const k in dataObj) {
			let listObj = dataObj[k].list;
			for (let i = 0; i < listObj.length; i++) {
				if (listObj[i].is_empty === undefined) {
					console.log("body:" + $response.body);
					break
				}
				if (listObj[i].is_empty === 0) {
					listObj[i].is_empty = 1;
					count++
				}
			}
		}
		console.log('成功count:' + count)
	}
} else if (url.indexOf('mi.gdt.qq.com') !== -1 && method === getMethod) {
	console.log('优量汇');
	if (body.hasOwnProperty('ret')) {
		if (body.ret === 0) {
			body.ret = 102006;
			console.log('修改ret成功')
		} else {
			console.log(`ret不为0, 不处理`)
		}
	} else {
		console.log("body:" + $response.body);
	}
} else if (url.indexOf('open.e.kuaishou.com') !== -1 && method === postMethod) {
	console.log('快手联盟');
	if (body.result === 1) {
		body.result = 40003;
		console.log('修改result成功')
	} else {
		console.log('无需修改result')
	}
} else {
	$notification.post(notifiTitle, "路径/请求方法匹配错误:", method + "," + url)
}

body = JSON.stringify(body);

$done({
    body
});


function qqNewsAdList(body, name) {
	console.log(name);
	if (body.adList === undefined) {
		console.log('无广告')
	} else {
		body.adList = null;
		console.log('成功')
	}
}
function zhihuAds(body, name) {
	console.log(name);
	let launch;
	if (body.launch == undefined) {
		console.log("body:" + $response.body);
		$notification.post(notifiTitle, name, "launch字段为undefined")
	} else {
		launch = JSON.parse(body.launch)
	}
	if (launch.ads === undefined) {
		console.log("body:" + $response.body);
		$notification.post(notifiTitle, name, "launch-ads字段为undefined")
	} else {
		launch.ads = [];
		console.log('成功')
	}
	body.launch = JSON.stringify(launch)
}
function getUrlParamValue(url, queryName) {
	let i = url.indexOf("?");
	if (i != -1 && i != url.length - 1) {
		let arr = url.substring(i + 1).split('&');
		for (let x = 0; x < arr.length; x++) {
			let pair = arr[x].split('=');
			if (pair.length == 2) {
				if (pair[0] == queryName) {
					return pair[1]
				}
			} else {
				console.log('url:' + url);
				$notification.post(notifiTitle, '获取url参数', "pair错误")
			}
		}
	} else {
		console.log('url:' + url);
		$notification.post(notifiTitle, '获取url参数', "i错误");
		return null
	}
	return null
}
