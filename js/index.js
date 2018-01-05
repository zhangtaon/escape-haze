//    Zepto(function($){
$(function(){
    newHeight = $(window).height();//得到屏幕的高
    newWidth = $(window).width();//得到屏幕的宽
    $(".win-height").css('height',newHeight);
    $(".win-width").css('width',newWidth);

    /*
     浏览器事件类型
     'transition':'transitionend',
     'OTransition':'oTransitionEnd',
     'MozTransition':'transitionend',
     'WebkitTransition':'webkitTransitionEnd',
     'MsTransition':'msTransitionEnd'
     */
    var jumpBtn = $(".jump-btn");

    //获取当前浏览器前缀
    var getVendorPrefix = function() {
        var body = document.body || document.documentElement,
            style = body.style,
            vendor = ['webkit', 'khtml', 'Moz', 'ms', 'o'],
            i = 0;

        while (i < vendor.length) {
            // 此处进行判断是否有对应的内核前缀
            if (typeof style[vendor[i] + 'Transition'] === 'string') {
                return vendor[i];
            }
            i++;
        }
    };
    var vendorPrefix = getVendorPrefix();
    //构建当前浏览器对应的事件名称
    var transitionend = (vendorPrefix==""|| vendorPrefix=="Moz")?"transitionend":vendorPrefix+"TransitionEnd";

    //构建当前浏览器对应的动画状态名称
    var animationPlayState = vendorPrefix==""?"animationPlayState":vendorPrefix+"AnimationPlayState";

    var powerWarp; //能得到的最大能量
    var powerVal;//能量值
    var observerNumber;//高度监听
    var jumpNumber;//目标高度数字
    var showJumpNumber=0;//高度数字
    var effectStatus=[false,false];//0位小人动画结束状态标示，1位点击弹框中的按钮状态

    //设置高度数字
    var setJumpNumber = function(delayNumber){
        observerNumber = setTimeout(function(){
//            console.log("showJumpNumber:",showJumpNumber,"jumpNumber:",jumpNumber);
            if(showJumpNumber!=jumpNumber){
                showJumpNumber+=100;
                $(".jump_num").text(showJumpNumber);
                setJumpNumber(30);
            }else{
                clearTimeout(observerNumber);
                observerNumber = null;
            }
        },delayNumber||400);
    };

    //清空高度数字
    var clearJumpNumber = function () {
        showJumpNumber=0
    };
    //禁用jump按钮
    var disableJumpBtn = function(){
        $(".disabled").css("display","block");
    };
    //启用jump按钮
    var ableJumpBtn = function(){
        $(".disabled").css("display","none");
    };
    //停止能量槽聚集能量
    var stopPower = function(power){
//            power.css(animationPlayState,"paused");
        $("#stop").attr("checked","checked");
        //警用jump按钮
        disableJumpBtn();
    };
    //重置能量槽
    var resetPower = function(flag){
//            $(".power").css(animationPlayState,"running");
        if(effectStatus[0] && effectStatus[1]){//两个状态都完成后重置能量槽
            effectStatus[0] = false;
            effectStatus[1] = false;
            $("#reset").attr("checked","checked");
//            $("#start").attr("checked","checked");
            setTimeout(function(){
                if(flag){
                    $(".h_meter").eq(0).text(0);
                }else{
                    $(".h_meter").eq(1).text(0);
                }
                $(".jump_num").text(0);
                $("#start").attr("checked","checked");
            },100);
        }
    };
    //获取能量值
    var getPower = function(){
        var power = $(".power");
        stopPower(power);
        var powerMaxVal = power.get(0).offsetHeight;
        powerVal = ((powerMaxVal-power.get(0).offsetTop)/powerMaxVal).toFixed(2)*100;
        jumpNumber = Math.round(10000*powerVal/1000)*10;
//        console.log("powerMaxVal.....powerMaxVal....:",powerVal+"%",jumpNumber);
    };
    //people起跳动画回调方法
    var jumbCallBack = function(){
        getPower();
        clearJumpNumber();
        setJumpNumber();
        var showNext = function(){
            var people =  $($(".page3_peo .show").get(0));
            people.toggleClass("show");
            people.next().toggleClass("show");
        };
        var step2 = function(){
            showNext();
            $(".page3_peo").css("bottom","55%");
        };
        var step3 = function(){
            showNext();
        };
        var step4 = function(){
            showNext();
        };
        showNext();
        setTimeout(step2,400);
        setTimeout(step3,800);
        setTimeout(step4,1000);
    };
    //people降落动画回调方法
    var dropCallBack = function(peo){
        var showPrev = function(flag){
            var curPeople =  $(peo.find(".show").get(0));
            curPeople.toggleClass("show");
            if(flag){
                curPeople.prev().prev().prev().toggleClass("show");
            }else{
                curPeople.prev().toggleClass("show");
            }
        };
        var step2 = function(){
            showPrev(true);
        };
        var step3 = function(){
            showPrev();
            ableJumpBtn();
            effectStatus[0]=true;
            resetPower();

        };
        setTimeout(step2,600);
        setTimeout(step3,1000);
    };
//    jumpBtn.on("click",jumbCallBack);
      jumpBtn.on("touchstart",jumbCallBack);

    //初始时底边距值
    var peoBottom = $(".page3_peo").css("bottom");

    //people落地方法
    var peoDrop = function(){
        var peo = $(".page3_peo");
        peo.css("bottom","10%");
        dropCallBack(peo);
    };
    //people容器动画结束监听事件
    var peoTransitionEndEvent = function(event){
        var bottom = $(event.target).css("bottom");
        if(bottom == peoBottom){
            return;
        }
        if(powerVal>40){
            $(".page3_move").css("bottom","-"+powerVal+"%");

            //隐藏影子
            $(".page3_bg_disc").css("display","none");
        }else{
            showDialog();
            peoDrop();
        }
    };
    $(".page3_peo").on(transitionend,peoTransitionEndEvent);
    //背景动画结束监听事件
    var bgTransitionEndEvent = function(event){
        var moveBg = $(".page3_move");
        if(moveBg.css("bottom")!="0px"){
            showDialog(jumpNumber>6999);
            moveBg.css("bottom","0px");
        }else{
            //显示影子
            $(".page3_bg_disc").css("display","block");
            peoDrop();
        }
    };
    //弹框显示结果
    var showDialog = function(flag){
        if(flag){
            $(".h_meter").eq(0).text(jumpNumber);
            $(".success_dialog").css("display","block");
        }else{
            $(".h_meter").eq(1).text(jumpNumber);
            $(".error_dialog").css("display","block");
        }
    };
    $(".page3_move").on(transitionend,bgTransitionEndEvent);
    $(".reset").on("click",function(){
        $(".page3_hide").css("display","none");
        effectStatus[1]=true;
        resetPower(jumpNumber>6999);
    });
});