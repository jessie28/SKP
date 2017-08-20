/**
 * Created by cabbage on 2017/8/17.
 */

$(function () {
    if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
        $(".p1-box-info").focusin(function (e) {
            $("#page_1").css({
                "top":"-170px"
            });
            e.preventDefault();
        }).focusout(function () {
            $("#page_1").css({
                "top":"10px"
            });
        })
    }

    var skulengthList = [11,8,4,4,5,5,5,3,6,11];
    window.num = 0;
    var subLock;//提交锁

    function showPage(old_num,num) {
        $(".page").hide();
        $("#page_"+num).show();
    }

    function showBtn(num) {
        $(".p1-btn").hide();
        $(".p1-box-title").hide();
        $("#p"+num+"-title").show()
        $("#p"+num+"-btn").show()
    }
    
    $(".js-intro").on('click',function () {
        showMan();
        showPage(0,2);
    });
    $(".js-selfInfo").on('click',function () {
        var $that = $(this);
        subLock = false;
        var page_num = $that.data('page');
        showBtn(page_num);
        showPage(page_num,1);
    });
    $(".js-begin").on('click',function () {
        var $that = $(this);
        var page_num = $that.data('page');
        showPage(page_num,3);
    });
    
    function showMan() {
        $("#page_2 .p2-d4 ul li").css({
            'background':'#fff'
        });
        var i = 0;
        showIt(i)
    }

    function showIt(i) {
        countDown(i);
        var timer = setTimeout(function () {
            console.log(i);
            if(i > 9){
                window.clearTimeout(timer);
                return false;
            }else{
                i++;
                showIt(i)
            }
        },1000);
    }

    function countDown(i) {
        $($("#page_2 .p2-d4 ul li")[i]).css({
            'background':'transparent'
        });
    }


    $(".js-submit").on('click',function () {
        var $that = $(this);
        var page_num = $that.data('page');
        var name = $("input[name='name']").val();
        var phone = $("input[name='phone']").val();
        if(name == ''){
            my_notify('请填写姓名');
            return false;
        }
        if(phone == ''){
            my_notify('请填写电话');
            return false;
        }
        subLock = true;
        showPage(page_num,3);
    });
    
    $(".js-c1").on('click',function () {
        $that = $(this);
        var now_page_id = $that.closest('.page').attr("id");
        var now_num = now_page_id.substr((now_page_id.indexOf('_')+1),1);
        showPage(now_num,3);
    })
    $(".js-c2").on('click',function () {
        var $that = $(this);
        var now_page_id = $that.closest('.page').attr("id");
        var now_num = now_page_id.substr((now_page_id.indexOf('_')+1),1);
        getSkus(window.num);
        showPage(now_num,4);
    });
    $(".js-c3").on('click',function () {
        $that = $(this);
        var now_page_id = $that.closest('.page').attr("id");
        var now_num = now_page_id.substr((now_page_id.indexOf('_')+1),1);
        showPage(now_num,6);
    });

    function getLike() {
        var n = Math.random();
        if(n>0.5){
            return false;
        }else{
            return true;
        }
    }

    function getSkus() {
        $("#page_4 .content").html('');
        var html = '<ul>';
        var length = skulengthList[window.num];
        for(var i=0;i<length;i++){
            var imgPath = '/image/skus/'+window.num+'/'+i+'.jpg';
            var className = getLike() ? 'ok js-ok' : 'wait js-wait';
            html += ' <li><img src='+imgPath+' alt=""><span class="'+className+'"></span></li>';
        }
        html += '</ul>';
        for(var j=0;j<10;j++){
            if(j == window.num){
                $("#page_4 .header .i"+j).removeClass('n'+j).addClass('c'+j).addClass('animated fadeIn infinite');
            }else{
                $("#page_4 .header .i"+j).removeClass('c'+j).removeClass('animated fadeIn infinite').addClass('n'+j);
            }
        }
        $("#page_4 .content").html(html);
    }

    $(".header").on('click','.icon',function () {
        var $that = $(this);
        window.num = $that.data('num');
        var now_page_id = $that.closest('.page').attr("id");
        var now_num = now_page_id.substr((now_page_id.indexOf('_')+1),1);
        getSkus();
        if($("#page_4").is(":hidden")){
            showPage(now_num,4);
        }
    });
    
    $("#page_4").on('click',".js-wait",function () {
        $("#page_5 .p5-text1").hide();
        $("#page_5 .right").show();
        showPage(4,5);
    });
    $("#page_4").on('click',".js-ok",function () {
        $("#page_5 .p5-text1").hide();
        $("#page_5 .sorry").show();
        showPage(4,5);
    });
    $("#page_6").on('click',".js-ok",function () {
        $("#page_5 .p5-text1").hide();
        $("#page_5 .sorry").show();
        showPage(6,5);
    });

})