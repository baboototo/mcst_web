<template>
  <modal name="popupModal" ref="popupModal"
         :width="600"
         :height="700"
         :draggable="false"
         :resizable="false"
         :reset="true"
         :scrollable="true"
         :clickToClose="false"
         :adaptive="true">
    <div id="layer-popup">
      <div class="popup-header">
        <h2>2022 국민여가활동조사 실시 안내</h2>
        <button type="button" class="popup-close" @click="popupTodayClose($event)">
          <img src="../../assets/img/popup_close.png" alt="팝업닫기" title="팝업닫기">
        </button>
      </div>
      <div class="popup-cnt">
        <div class="img-area">
          <img src="../../assets/popupImg/kyeogaPopup.jpg" alt="메인 팝업 이미지" title="메인 팝업 이미지">
        </div>
        <div class="popup--option">
          <input type="checkbox" v-model="isCheckedTodayClose" style="width:20px;height:20px;" id="chk" name="chk">
          <label for="chk">하루동안 보지 않기</label>
          <button type="button" class="popup-close" @click="popupTodayClose($event)" style="margin-left:10px;"> [닫기] </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Cookies from 'js-cookie'
import CommonUtil from '@/assets/js/commonUtil'

export default {
  name: "MainPopupKyeoga",
  data() {
    return {
      isCheckedTodayClose: false,
      titleFont:'font-size:20px;font-weight:600;padding:10px 0;',
      cntFont:'font-size:14px'
    }
  },
  mounted() {

    const popupOpenDate = new Date(2022, 7, 31)
    const popupEndDate = new Date(2022, 9, 31)
    const toDate = new Date()

    if (popupOpenDate.getTime() <= toDate.getTime() && toDate.getTime() <= popupEndDate.getTime()) {
      const popupCloseDay = Cookies.get('kyeogaPopupCloseDay')
      const toDay = CommonUtil.getFormatDate(new Date, '')
      if (!popupCloseDay) {
        this.showPopup()
      } else {
        if (popupCloseDay === toDay) {
          this.closePopup()
        } else {
          Cookies.remove('kyeogaPopupCloseDay')
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
          Cookies.set('kyeogaPopupCloseDay', CommonUtil.getFormatDate(new Date, ''))
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
.direct-link{
  width:auto !important;
  border: 2px solid #5a57aa;
  padding:10px 15px;
  display: inline-block;
  margin:20px 0;
}
.link:hover{
  color:#5a57aa;
  text-decoration: underline;
}
#layer-popup{position: absolute;width:100%;height:100%;border: 1px solid #acacac;background-color: #f7f7f7;}
#layer-popup .popup-header{position: relative;width:100%;height:55px;line-height: 55px;background-color: #5a57aa;padding:0 20px;}
#layer-popup .popup-header h2{color:#ffffff;font-weight: 500;font-size: 17px;padding-left:8px;}
#layer-popup .popup-header .popup-close{position: absolute;top:16px;right:21px;}
#layer-popup .popup-option{width:100%;height:51px;line-height: 52px; border-width: 1px 0 1px 0;border-style: solid;border-color:#d3d3d3;background-color: #ffffff;padding:0 20px;}
#layer-popup .popup-option .tip{font-size: 12px;color:#5a57aa;font-weight: 400;background: url("../../assets/img/popup/icon_popup_close.png") no-repeat 0 center;padding-left: 24px;float:left;}
#layer-popup .popup-option .zoom-option{float:right;}
#layer-popup .popup-option .zoom-option li{float:left;}
#layer-popup .popup-option .zoom-option li button{width:32px;height:23px;border: 1px solid #8a9faf;box-sizing: border-box;padding:4px 0 0 2px}
#layer-popup .popup-option .zoom-option li .zoom-up{border-radius: 10px 0 0 10px;}
#layer-popup .popup-option .zoom-option li .zoom-down{border-radius: 0 10px 10px 0;}
#layer-popup .popup-cnt{background-color: #ffffff;padding:18px;width:100%;height:calc(100% - 90px);overflow: auto;overflow-x: hidden;text-align:center}
#layer-popup .popup-cnt > div{width:100%;}
#layer-popup .popup-cnt .graph02{margin-top:12px;}
#layer-popup .popup-cnt img{max-width: 100%;}
.popup--option > *{font-weight: 400;}
.vm--overlay[data-modal="popupModal"] {
  width: 0px;
  height: 0px;
  background: transparent;
}
.qr-code{
  /* border: 1px solid #5a57aa;
  padding:10px; */
  /* width:220px !important;
  height:220px; */
  text-align: center;
}
.popup--option{
    position: absolute;
    bottom:0;
    /* text-align: right; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #ffffff;
    left: 0;
    height: 35px;
    padding:0 10px;
    border-top: 1px solid #cccccc;
}
.popup--option > *{
  font-size: 16px;
}
.popup--option input[type='checkbox']{
  margin-right:6px;
}
.img-area{
  /* display: flex;
  align-content: flex-start;
  align-items:end; */
}
</style>
