var jQuery=$.noConflict();

var newHeight = 0;//屏幕的高
var newWidth = 0;//屏幕的宽
var scrollChange = 0;//是否滚动
//翻页
var pageKey = 0;
var pageSize = 3;

//横竖屏监控
function hengshuping(){  
	if(window.orientation==180||window.orientation==0){        
		//alert("竖屏状态！")          
	}
	if(window.orientation==90||window.orientation==-90){        
		alert("请竖屏浏览！")            
	} 
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

jQuery(function(){

	//自适应宽、高
	newHeight = $(window).height();//得到屏幕的高
	newWidth = $(window).width();//得到屏幕的宽
	$(".win-height").css('height',newHeight);
	$(".win-width").css('width',newWidth);
	alert(newHeight)

	
	/*$(window).resize(function(){
		newHeight = $(window).height();
		$(".win-height").css('height',newHeight);
		newWidth = $(window).width();
		$(".win-width").css('width',newWidth);
		
	});
	if(newHeight>450){//屏幕高度判断
		$(".page1_left img").css('height','100%');
		$(".page1_right img").css('height','100%');
	}else{
		$(".page1_left img").css('height','110%');
		$(".page1_right img").css('height','110%');
	}*/
	page_one_animate();
	page_bind();

});


//第一屏动画效果
/*function page_one_animate(){
	scrollChange = 0;
	jQuery('.arrow').hide();
	jQuery('.page1').show();
	jQuery(".page1_left")
		.stop()
		.css('left' , '-100%')
		.delay(100)//等待页面加载
		.animate({
			'left' : '0%',
		},1500);
	
	jQuery(".page1_right")
		.stop()
		.css('right' , '-100%')
		.delay(100)//等待页面加载
		.animate({
			'right' : '0%',
		},1500)
		.delay(2000)
		.animate({
			'right' : '0%',
		},0,function(){
			pageKey++;
			customAnimate();
		});
}

function initAnimate(){
	jQuery(".arrow").hide();
	scrollChange = 0;
  if(pageKey == 0){//第一屏
	  page_one_animate();
  }
  if(pageKey == 1){//第一屏
	  
	  jQuery(".arrow").show();
  }

}

function customAnimate(){
	if(pageKey >= pageSize) pageKey = pageSize - 1;
	if(pageKey <= 0) pageKey = 0;
	initAnimate();
	thisTop = pageKey * newHeight + 'px';
	jQuery("div#moveDiv").animate({'top':'-' +thisTop},10);
	
	if(pageKey == 1){
		jQuery(".page2_1")
		.delay(4000)
		.animate({
			'right' : '0%',
		},0,function(){
			pageKey++;
			customAnimate();
		});
		
	}
	
	if(pageKey == 2){
		jQuery(window).scroll(function(){

			if(jQuery(window).scrollTop() == 0 && scrollChange == 1){
			
				window.location.reload();
			}else{
			scrollChange = 1;
			}
		});
	}
	
	
}


//绑定效果
function page_bind(){
	//绑定箭头
	jQuery(".arrow").bind('click',function(){
		pageKey++;
		//scrollChange = 0;
		customAnimate();
	});
	
	//箭头抖动
	setInterval(function(){
		arrow_bottom = parseInt(jQuery(".arrow").css('bottom'));
		if(arrow_bottom ==0){
			arrow_bottom = 2;
		}else{
			arrow_bottom =0;
		}
				
		jQuery(".arrow").css('bottom',arrow_bottom+'px');
	},200);
	
}

//微信分享用 开始
var descContent = "";
var shareTitle = "组 · 合---云、移动、物联网高峰论坛";
var appid = '';
var rootUrl = "http://114.112.98.110/web_group";

function shareFriend() {
    var imgUrl = rootUrl + '/images/share.jpg';
    var lineLink = rootUrl;
    WeixinJSBridge.invoke('sendAppMessage',{
                            "appid": appid,
                            "img_url": imgUrl,
                            "img_width": "640",
                            "img_height": "640",
                            "link": lineLink,
                            "desc": descContent,
                            "title": shareTitle
                            }, function(res) {
                            _report('send_msg', res.err_msg);
                            });
}
function shareTimeline() {
		var imgUrl = rootUrl + '/images/share.jpg';
    var lineLink = rootUrl;
    WeixinJSBridge.invoke('shareTimeline',{
                            "img_url": imgUrl,
                            "img_width": "640",
                            "img_height": "640",
                            "link": lineLink,
                            "desc": descContent,
                            "title": shareTitle
                            }, function(res) {
                            _report('timeline', res.err_msg);
                            });
}
function shareWeibo() {
		var imgUrl = rootUrl + '/images/share.jpg';
    var lineLink = rootUrl;
    WeixinJSBridge.invoke('shareWeibo',{
                            "content": descContent,
                            "url": lineLink,
                            }, function(res) {
                            _report('weibo', res.err_msg);
                            });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            shareFriend();
            });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareTimeline();
            });

        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo();
            });
        }, false);*/
//微信分享用 结束
