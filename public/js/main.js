$(function () {
	function render() {
		var maxWidth = document.documentElement.clientWidth;
		var maxHeight = document.documentElement.clientHeight;
		window.scale = 1;
		var width = 750; //750
		var height = 1206; //1206
		if (maxWidth / maxHeight > width / height) {
			window.scale = maxHeight / height;
		} else {
			window.scale = maxWidth / width;
		}
		// window.scale = 0.555;
		$("#main").css({
			"left":(maxWidth - width) / 2 + "px",
			"top":(maxHeight - height) / 2 + "px",
			"-webkit-transform":"scale(" + window.scale + ")",
			"transform":"scale(" + window.scale + ")"
		});
	}
	function p3hidden() {
		//判断ios还是安卓
		var u = navigator.userAgent, app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		//阻止ios双击事件
		var iLastTouch = null;                                //缓存上一次tap的时间
		if (isiOS)
		{
			document.body.addEventListener('touchend', function(event)
			{
				var iNow = new Date()
					.getTime();
				iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
				var delta = iNow - iLastTouch;
				if (delta < 500 && delta > 0)
				{
					event.preventDefault();
					return false;
				}
				iLastTouch = iNow;
			}, false);
		}
	}
	render();
	p3hidden();
})