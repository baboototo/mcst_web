<template>
    <div class="pd7">
        <div class="btn-layout right">
            <h4 class="btn-area-title">{{ staticInfoData.tblKorNm }}</h4>
            <span class="btn-inner-unit" v-show="gubun === '1'">( 단위 : {{ staticInfoData.msrUnitNm}} )</span>
            <button type="button" class="default btn" style="display:none;">다운로드</button>
            <button type="button" class="default btn" @click.prevent="showBasicInfo(staticInfoData.tblMgmNo)"
                    v-show="gubun === '1' && staticInfoData.tblMgmNo != 'STBL-1028174'">기본정보</button>
            <button type="button" class="default btn" @click.prevent="showManual()">사용법</button>
            <button type="button" class="default btn" @click.prevent="showPivotTable(staticInfoData.tblMgmNo)"
                    v-show="gubun === '1' && staticInfoData.tblMgmNo != 'STBL-1028174'">피벗테이블</button>
            <button type="button" class="default btn" :class="{no: staticInfoData.cmmtDesc === null}" @click.prevent="showComment(staticInfoData.cmmtDesc)"
              v-show="gubun === '1' && staticInfoData.tblMgmNo != 'STBL-1028174'">주석</button>
        </div>
        <a href="#modal6" id="showComments"></a>
        <a href="#modal7" id="showBasicInfo"></a>
        <a href="#modal8" id="showManual"></a>
        <div class="stat-content-area">
            <div id="spotfireViewFrm">
                <iframe title="통계표" id="spotfireFrame" :src="url" frameborder="0" style="width: 100%; height: 530px;"></iframe>
            </div>
        </div>


        <!-- 모달 : 주석 -->
        <div class="modal_cnt" id="modal6" style="display:none;">
            <div class="modal-header">
                <h2>주석</h2>
                <a href="#" class="close_btn"><img src="../../assets/img/popup_close.png" alt="닫기" @click.prevent="closeModal"></a>
            </div>
            <div class="modal-content">
                <p class="remark" v-html="cmmtDesc"></p>
            </div>
        </div>

        <!-- 모달 : 기본정보 -->
        <div class="modal_cnt" id="modal7" style="display:none;">
            <div class="modal-header">
                <h2>기본정보</h2>
                <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../../assets/img/popup_close.png" alt="닫기"></a>
            </div>
            <div class="modal-content">
                <div class="agreement_page02" v-if="staticBasicData != ''" style="display:table">
                <dl class="align-start popup-table">
                    <dt style="text-align:center;">통계표명</dt>
                    <dd>{{ staticBasicData.tblKorNm }}</dd>
                </dl>
                <dl class="align-start popup-table">
                    <dt style="text-align:center;">목록</dt>
                    <dd>{{ staticBasicData.pathNm }}</dd>
                </dl>
                <dl class="align-start popup-table">
                    <dt style="text-align:center;">조사명</dt>
                    <dd>{{ staticBasicData.statKorNm }}</dd>
                </dl>
                <dl class="align-start popup-table">
                    <dt style="text-align:center;">입력연도</dt>
                    <dd>{{ staticBasicData.tblYearMonth }}</dd>
                </dl>
                <!-- <dt style="text-align:center;">표두항목</dt>
                <dd></dd>
                <dt style="text-align:center;">표측항목</dt>
                <dd></dd> -->
                </div>

            </div>
        </div>

        <!-- 모달 : 사용법 -->
        <div class="modal_cnt" id="modal8" style="display:none;" :style=imgManualSize>
          <div class="modal-header">
            <h2>사용법</h2>
            <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../../assets/img/popup_close.png" alt="닫기"></a>
          </div>
          <div class="modal-content" style="max-height:550px; overflow:auto;">
            <img :src=imgManualNm width="100%" alt="사용법">
          </div>
        </div>

    </div>
</template>

<script>
import * as api from '@/api/Statistics.js'
import $ from 'jquery'

export default {
  name: "StaticPop",

  data() {
      return {
        tblMgmNo : this.$route.params.tblMgmNo,
        gubun : this.$route.params.gubun,
        staticInfoData : [],
        url: '',
        cmmtDesc: '',
        staticBasicData: [],
        imgManualNm: require('../../assets/img/sub_manual.png'),
        imgManualSize: 'width:1000px'
      }
  },

  created() {
      this.staticInfo()
      window.addEventListener('resize', this.manualResize)
      this.manualResize()
  },

  methods: {
    // 사용법 이미지 resize
    manualResize(){
      if (window.innerWidth <= 768) { // 모바일
        this.imgManualNm = require('../../assets/img/sub_manual_m.png')
        this.imgManualSize = ''
      } else if(window.innerWidth > 768 && window.innerWidth <= 1024) { // 태블릿
        this.imgManualNm = require('../../assets/img/sub_manual_t.png')
        this.imgManualSize = ''
      } else{ // PC
        this.imgManualNm = require('../../assets/img/sub_manual.png')
        this.imgManualSize = 'width:1000px'
      }
      this.centerPosition()
    },

    async staticInfo() {

      const params = {  // 통계표 상세조회 param
          tblMgmNo: this.tblMgmNo
      }
      const staticInfoData = await api.stblInfoList(params)

      if(this.gubun == 1){
        if(this.tblMgmNo === 'STBL-1028174'){ //주요관광지점 입장객 통계
          this.url = 'https://vstat.culturestat.mcst.go.kr/spotfire/wp/ViewAnalysis.aspx?file=/REPORT/STBL-1014278/STBL-1028174_NEW'
        }else{
          this.url = process.env.VUE_APP_SPOTFIRE_SUBJECT_URL + staticInfoData.data.rowCnt + "_" + staticInfoData.data.colCnt + '_NEW&configurationBlock=tblMgmNo=%22'+ this.tblMgmNo +'%22;'
        }
      }else{
        this.url = process.env.VUE_APP_SPOTFIRE_REPORT_INDEX_URL + this.tblMgmNo + '_chart' + '&from=https://stat.mcst.go.kr/portal/subject/subject01'
      }

      this.staticInfoData = staticInfoData.data

      const logParam = {
        stblMgmNo: this.tblMgmNo
      }
      await api.insertAccessLog(logParam) // 통계표 로그 쌓기

    },

    // 통계표 기본정보
    async showBasicInfo(menuId){
      const param = {
        tblMgmNo: menuId
      }
      const basicData = await api.selectBasicInfo(param)
      this.staticBasicData = basicData.data

      this.$nextTick(function(){
        this.setModal($('#showBasicInfo'))
      })

    },

    // 통계표 주석
    showComment(cmmtDesc){
      this.cmmtDesc = cmmtDesc
      if(cmmtDesc != null){
        this.$nextTick(function(){
          this.setModal($('#showComments'))
        })
      }
    },

    // 통계표 피벗테이블 - 기존 팝업창 그대로 사용
    showPivotTable(tblMgmNo){
      window.open("https://stat.mcst.go.kr/mcst/WebPortal/public/subject/pivotSubject.html?tblMgmNo="+tblMgmNo, "_blank")
    },

    // 사용법 모달
    showManual(){
      this.$nextTick(function(){
        this.setModal($('#showManual'))
      })
    },

    // 모달창 세팅
    setModal(target){
      let $modalCnt = $(target).attr("href")
      $modalCnt = $($modalCnt)

      this.$modalCnt = $modalCnt

      $modalCnt.before('<div id="mask"></div>')
	    this.centerPosition()

      $(window).on("resize", this.centerPosition)

      $("#mask").add($modalCnt).stop().fadeIn("fast")
      $modalCnt.attr("tabIndex", 0).focus()

      $modalCnt.find("a:first, a:last").on("blur",function  () {
        setTimeout(function  () {
          if (!$modalCnt.find("a").is(":focus")) {
            $modalCnt.find(".close_btn").click()
          }
        },10)
      })

    },

    // 모달창 사이즈 조정
    centerPosition(){
      let topPos=($(window).height()-$(this.$modalCnt).outerHeight())/2
      let leftPos=($(window).width()-$(this.$modalCnt).outerWidth())/2

      $(this.$modalCnt).css({top:topPos , left:leftPos})
    },

    // 모달창 닫기
    closeModal(){
      $("#mask").add(this.$modalCnt).stop().fadeOut("fast",function  () {
        $("#mask").remove()
      })
    },

  }
}
</script>

<style scoped>
    .pd7 {
        padding: 7px;
    }
    .default.btn.no {
        background-color: #aeaeae;
        border: 1px solid #7d7d7d;
        cursor: default;
    }
    .default.btn {
        margin-right: 5px !important;
    }
@media only screen and (max-width: 768px){
    .btn-layout{
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .btn-layout button{
      flex-grow: 1;
      flex-shrink: 1;
      font-size: 12px;
      min-width: auto;
    }
    /* .btn-layout button:nth-of-type(2){
      flex-grow: 1;
    }
    .btn-layout button:nth-of-type(3){
      flex-grow: 1;
    }
    .btn-layout button:nth-of-type(4){
      flex-grow: 1;
    }
    .btn-layout button:nth-of-type(5){
      flex-grow: 1;
    } */
    .btn-inner-unit{
      padding:10px 0;
    }
    .btn-area-title{
      width:100%;
      text-align: left;
      padding: 2px 0 0 7px;
      line-height: 1.2em;
      background-size: 5px;
      background-position: 0px 5px;
    }
    .default.btn{
      margin-right: 0 !important;
    }
}
</style>
