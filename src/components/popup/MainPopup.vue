<template>
  <modal name="popupModal" ref="popupModal"
         :width="350"
         :height="600"
         :draggable="false"
         :resizable="false"
         :reset="true"
         :scrollable="true"
         :clickToClose="false"
         :adaptive="true">
    <div class="popup_outer">
      <div class="popup_cnt_area">
        <h1>문화셈터 이용자 만족도 조사</h1>
        <br>
        <p>
          안녕하십니까? <br>
          본 설문조사는 문화셈터 정보 이용객의 의견 청취를 <br>
          통하여 문화셈터 운영 및 개선 방향을 수립하고, <br>
          향후 제공하는 정보에 대한 만족도를 높이기 위한 <br>
          자료로 활용할 예정이오니 많은 참여바랍니다
        </p>        
        <br>
        <a href="https://stat.mcst.go.kr/mcst/srvy/webNew.html?seq=W_5238" target='_blank'>설문참여하기</a>
      </div>
      <div class="exit_area">
        <ul>
          <li><input type="checkbox" id="chkBox" v-model="isCheckedTodayClose"><i></i><label for="chkBox">오늘 하루 이 창을 열지 않음</label></li>
          <li><button type="button" class="exit" @click="popupTodayClose($event)">닫기</button></li>
        </ul>
      </div>
    </div>
  </modal>
</template>

<script>
import Cookies from 'js-cookie'
import CommonUtil from '@/assets/js/commonUtil'

export default {
  name: "MainPopup",
  data() {
    return {
      isCheckedTodayClose: false,
    }
  },
  mounted() {
    
    const popupOpenDate = new Date(2022, 11, 10)
    const popupEndDate = new Date(2022, 12, 2)
    const toDate = new Date()  

    if (popupOpenDate.getTime() <= toDate.getTime() && toDate.getTime() <= popupEndDate.getTime()) {
      const popupCloseDay = Cookies.get('popupCloseDay')
      const toDay = CommonUtil.getFormatDate(new Date, '')
      
      if (!popupCloseDay) {
        this.showPopup()
      } else {
        if (popupCloseDay === toDay) {
          this.closePopup()
        } else {
          Cookies.remove('popupCloseDay')
          this.showPopup()
        }
      }
    }
  },
  methods: {
    showPopup() {
      this.$modal.show('popupModal')
    },

    closePopup() {
      this.$modal.hide('popupModal')
    },

    popupTodayClose(event) {
      this.$nextTick(function () {
        if (event) event.preventDefault()
        if (this.isCheckedTodayClose) {
          Cookies.set('popupCloseDay', CommonUtil.getFormatDate(new Date, ''))
        }
        this.closePopup()
      })
    }
  }
}
</script>

<style scoped>
.vm--container {
  width: 0px;
  height: 0px;
  z-index: 1000;
}
/* @import url(https://cdn.rawgit.com/theeluwin/NotoSansKR-Hestia/master/stylesheets/NotoSansKR-Hestia.css); */
/* TAG RESET */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration: none;
}
button{
  border: 0px;
  background: none;
}
/* MAIN */

body, html{
  height:100%;
}
body{
  display: flex;
  justify-items: center;
  font-family:'Noto Sans Korean';
}
div{
  box-sizing:border-box;
}
.popup_outer{
  position: relative;
  margin:auto;
  width:350px;
  height:600px;
  padding:17px 13px 0px 10px;
  background: #ffffff url("../../assets/img/popup/event_bg.png") no-repeat;
  background-position: center 349px;
}
.popup_cnt_area{
  width:350px;
  height:376px;
  /*background-image: url("../../assets/img/popup/question_bg.png");*/
  background-repeat: no-repeat;
  padding:32px 47px 121px 30px
}
.popup_cnt_area h1{
  font-size: 20px;
  font-weight: 500;
  color:#003965;
  letter-spacing: -2px;
  text-align:center;
}
.popup_cnt_area h1::before,
.popup_cnt_area h1::after{
  display: inline-block;
  clear: both;
  content:"";
  width:20px;
  height:30px;
  background-repeat: no-repeat;
  background-position: 6px 0px;
}
.popup_cnt_area h1::before{
  background-image:url("../../assets/img/popup/txt_icon01.png");
}
.popup_cnt_area h1::after{
  background-image:url("../../assets/img/popup/txt_icon02.png");
}
.popup_cnt_area p{
  color:#000000;
  margin: 5px 0px 6px;
  letter-spacing: -1px;
  font-weight: 350;
}
.popup_cnt_area ul li{
  color:#1d7bc0;
  background: url("../../assets/img/popup/list_icon.png") no-repeat 2px center;
  padding-left: 15px;
}
.popup_cnt_area p,
.popup_cnt_area ul{
  padding-left: 2px;
  font-size: 13px;
}
.popup_cnt_area p,
.popup_cnt_area ul li{
  line-height: 1.5;
}
.popup_cnt_area a{
  display: block;
  margin:6px auto 0px;
  width:143px;
  height:100%;
  max-height:37px;
  padding:7px 0px;
  background-color: #1d7bc0;
  color:#ffffff;
  box-sizing: border-box;
  text-align:center;
  border-radius: 10px;
}
.exit_area{
  position:absolute;
  bottom:0px;
  width:100%;
  height:100%;
  max-height:40px;
  background-color: #003965;
  left:0px;
}
.exit_area ul{
  position: relative;
}
.exit_area ul:after{
  display: block;
  clear:both;
  content:"";
}
.exit_area ul li{
  position: relative;
  float:left;
  width:50%;
  height:40px;
  text-align: center;
}
.exit_area ul:after{
  position: absolute;
  display: block;
  clear: both;
  content: "";
  width:1px;
  height:40px;
  background-color: #abbcc9;
  top:0px;
  left:50%;
  margin-left: -0.5px;
}
.exit_area ul li label,
.exit_area ul li button{
  color:#ffffff;
  font-size: 13px;
  font-weight: 350;
}
.exit_area ul li button{
  width:100%;
  height:40px;
}
.exit_area ul li i{
  z-index: 1;
  background: url("../../assets/img/popup/chkBox_none.png") no-repeat;
}
.exit_area ul li input:checked+i{
  background: url("../../assets/img/popup/chkBox_chk.png") no-repeat;
}
.exit_area ul li input{
  opacity: 0;
  z-index: 2;
}
.exit_area ul li input,
.exit_area ul li i{
  position: absolute;
  width:21px;
  height:21px;
  top:50%;
  margin-top: -10.5px;
}
.exit_area ul li label{
  line-height:40px;
  padding-left: 24px;
}
</style>
