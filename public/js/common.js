

$(function(){

  familySite();
  tableCheckbox();

  (function(){ // 외부 라이브러리와 충돌을 막고자 모듈화.
    // 브라우저 및 버전을 구하기 위한 변수들.
    'use strict';
    var agent = navigator.userAgent.toLowerCase(),
      name = navigator.appName,
      browser;

    // MS 계열 브라우저를 구분하기 위함.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
      browser = 'ie';
      if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
        agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
        browser += parseInt(agent[1]);
      } else { // IE 11+
        if(agent.indexOf('trident') > -1) { // IE 11
          $("html").smoothWheel();
          ieHeaderScrollControll();
        } else if(agent.indexOf('edge/') > -1) { // Edge
          browser = 'edge';
        }
      }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
      if(agent.indexOf('opr') > -1) { // Opera
        browser = 'opera';
      } else if(agent.indexOf('chrome') > -1) { // Chrome
        browser = 'chrome';
      } else { // Safari
        browser = 'safari';
      }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
      browser = 'firefox';
    }

    // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
    document.getElementsByTagName('html')[0].className = browser;
  }());


  function ieHeaderScrollControll(){
    $(window).on("scroll",function(){
      var scrollTop = $(window).scrollTop();
      var subTitle = $("#container .content-wrap .sub-title");
      var subGnb = $("#subGnb");
      var subCnt = $(".sub-content");
      if(scrollTop >= 179){
        subTitle.css({position:"fixed"});
        subGnb.css({position:"fixed",top:"98px"});
        subCnt.css({marginTop:"321px"});
      }else{
        subGnb.css({position:"absolute",top:"278px"});
        subTitle.css({position:"static"});
        subCnt.css({marginTop:"0px"});
      }
    })
  }

  function familySite() {
    var $family=$("#footer .family");
    $family.find(">a").on("click",function(){
      $(this).toggleClass("on");
      $(this).next().stop().slideToggle();
    });
    $(document).on("click", function (event) {
      if(event.target.id != "selText"){
        if($family.find(">ul").css("display") == "block"){
          $family.find(">a").click();
        }
      }
    });
  }

  function tableCheckbox(){
    var tableCheck = $(".mdss-table tbody tr td");
    $.each(tableCheck, function(idx, itm){
      var checkBox = $(itm).find(".tbl-checkbox-box input");
      checkBox.on("click",function(){
        var checked = checkBox.is(':checked');
        if(checked){
          checkBox.parent().parent().parent().addClass("on");
        }else{
          checkBox.parent().parent().parent().removeClass("on");
        }
      });
    });
  }
});
