<template>
  <div>
    <div class="layout">
      <div class="title-select-wrap">
        <button type="button" class="title" ref="subMenuTitle" @click="eventClickSubMenu($event.target)">{{ this.statName }}</button>
        <div ref="subMenuItem">
          <ul class="subGnb-depth03 title-menu">
            <li v-for="subMenuItem in this.subMenuItems">
              <a href="javascript:;" @click="eventClickSubMenuItem(subMenuItem.mgmNo, subMenuItem.title)">{{ subMenuItem.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mdss-yy no-select" v-show="selectedStatSubLevelItems.length > 0">
      <div class="layout">
        <div class="swiper-wrapper">
          <div class="swiper-slide" ref="statSubLevelItemDiv" v-for="(item, idx) in selectedStatSubLevelItems" :key="idx">
            <a href="javascript:;" @click="clickStatSubLevelItem($event.target, item)">{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="layout">
      <ul class="tab-btn-list align-start">
        <li :class="{on: commonTabs === 0}"><a href="javascript:;" class="tab" @click.prevent="clickCommonTab(0)">통계표</a></li>
        <li :class="{on: commonTabs === 1}"><a href="javascript:;" class="tab" @click.prevent="clickCommonTab(1)">지표보고서</a></li>
        <!--      <li :class="{on: commonTabs === 2}"><a href="javascript:;" class="tab" @click.prevent="clickCommonTab(2)">메타정보</a></li>-->
      </ul>

      <div class="stat-type-wrap">
        <div class="stat-type-content" v-show="commonTabs === 0">
          <div class="stat-type-content-inner">
            <swiper class="swiper" :options="swiperOption">
              <swiperSlide v-for="(stat, idx) in selectedStats" :key="idx" :class="{on: statTabIndex === idx}">
                <a href="javascript:;" @click.prevent="clickStatTab(idx)"> {{ selectedStats[selectedStats.length - idx - 1].statNm }}</a>
                <button type="button" class="tab-close" @click.prevent="clickStatTabClose(selectedStats[selectedStats.length - idx - 1], idx)">닫기</button>
              </swiperSlide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <div class="align-between stat-option">
            <h4 class="btn-area-title"></h4>
            <div class="btn-layout right">
              <a href="#modal8" id="showManual" class="ir">showManual</a>
              <button type="button" class="default btn" @click="showManual()" title="사용법">사용법</button>
              <button type="button" class="default btn icon-zoom" @click="clickZoom($event)" title="크게보기">크게보기</button>
            </div>
          </div>
          <div class="stat-content-area">
            <div v-for="(stat, idx) in selectedStats" :key="idx"  v-show="(selectedStats.length - statTabIndex - 1) === idx">
              <iframe title="통계표" :src="stat.statUrl" style="width: 100%; height: 675px; border:none;"></iframe>
            </div>
          </div>
        </div>

        <div class="stat-type-content" v-show="commonTabs === 1">
          <IndexBoardView :paramCodeId="statIndexReportCodeId"></IndexBoardView>
        </div>

        <div class="stat-type-content" v-show="commonTabs === 2">
          <MetaInfo :metaInfoList="statMetaInfoList"></MetaInfo>
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
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import $ from 'jquery'
import * as api from '@/api/Index.js'
import * as staticApi from '@/api/Statistics.js'
import IndexBoardView from "../../components/IndexBoardView";
import MetaInfo from "../../components/MetaInfo";

export default {
  name: "Index01",
  components: {
    swiper,
    swiperSlide,
    IndexBoardView,
    MetaInfo
  },
  props: {
    subItemId: {
      type: String,
      default: ''
    },
    subItemNm: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 9,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      subMenuItems: [],
      selectedStats: [],
      selectedStatSubLevelItems: [],
      commonTabs: 0,
      statId: this.subItemId,
      statName: this.subItemNm,
      statTabIndex: 0,
      statIndexReportCodeId: '',
      statMetaInfoList: [],
      imgManualNm: require('../../assets/img/sub_manual.png'),
      imgManualSize: 'width:1000px'
    }
  },
  computed: {
  },
  watch: {
    subItemId: function() {
      this.initViewParameterValidation(this.subItemId)
    },
    selectedStatSubLevelItems: function() {
      this.$nextTick(function () {
        const subLevelItemDiv = this.$refs.statSubLevelItemDiv
        if (subLevelItemDiv) {
          subLevelItemDiv.forEach(function(div, idx) {
            div.style.width = (100 / subLevelItemDiv.length) + '%'
          })
        }
      })
    }
  },

  created() {
    this.initViewParameterValidation(this.statId)
    this.findSubMenuItems(this.$route.meta.subMenuItemMgmNo)
    window.addEventListener('resize', this.manualResize)
    this.manualResize()
  },

  methods: {
    findSubMenuItems(statId) {
      const subMenuItem = this.$store.getters.findSubMenu(statId)
      if (subMenuItem) {
        this.subMenuItems = subMenuItem.items
      }
      return this.subMenuItems
    },

    eventClickSubMenuItem(subItemId, subItemNm) {

      this.eventClickSubMenu(this.$refs.subMenuTitle)

      const params = {
        subItemId: subItemId,
        subItemNm: subItemNm
      }
      this.$router.push( {name: this.$route.name, params: params} )
    },

    eventClickSubMenu(target) {
      if (target) {
        const subMenuItemDiv = target.nextElementSibling
        if(subMenuItemDiv && subMenuItemDiv.children) {

          const subMenuItemUl = subMenuItemDiv.querySelector('.subGnb-depth03');
          if (subMenuItemUl.style.display === 'block') {
            $(subMenuItemDiv.children[0]).stop().slideUp()
          } else {
            $(subMenuItemDiv.children[0]).stop().slideDown()
          }
        }
      }
    },

    // 지표통계 통계표 ID 확인
    initViewParameterValidation(statId) {
      if (this.$route.meta.subMenuItemMgmNo === statId) {
        const firstSubMenuItem = this.$store.getters.findSubMenu(statId)

        if (firstSubMenuItem) {
          const subMenuItem = firstSubMenuItem.items[0]
          this.statName = subMenuItem.title
          this.addIndexStat(subMenuItem.mgmNo)
        }
      } else {
        let isSubMenuItem = false;
        const subMenuItems = this.$store.getters.findSubMenu(this.$route.meta.subMenuItemMgmNo)
        if (subMenuItems){
          for (const subMenuItem of subMenuItems.items) {
            if (subMenuItem.mgmNo === statId) {
              this.statName = subMenuItem.title
              isSubMenuItem = true
            }
          }
        }
        if (isSubMenuItem) {
          this.addIndexStat(this.subItemId)
        }
      }
    },

    // 지표통계 추가
    addIndexStat(statId) {
      this.statId = statId
      this.selectedStatSubLevelItems = []

      if (this.statId) {
        this.statTabIndex = 0
        this.searchMenuStatItems(this.statId)
        this.searchIndexStatCode(this.statId)
        this.selectMetaInfoList(this.statId)
      }
    },

    // 지표통계 탭 추가
    async addStatTabItem(statId, statNm) {
      let isSelectedStatId = false
      let selectedIndex = 0
      for (const stat of this.selectedStats) {
        selectedIndex = selectedIndex + 1

        console.log(stat.statUrl);

        if (stat.statId === statId) {
          isSelectedStatId = true
          this.statTabIndex = this.selectedStats.length - selectedIndex
          break
        }
      }

      if (!isSelectedStatId) {
        const stat = {
          statId: statId,
          statNm: statNm,
          statUrl: process.env.VUE_APP_SPOTFIRE_REPORT_INDEX_URL + statId + '_chart' + '&from=https://stat.mcst.go.kr/portal/index/index01'
        }
        this.$set(this.selectedStats, this.selectedStats.length, stat)

        const logParam = {
          stblMgmNo: statId
        }
        await staticApi.insertAccessLog(logParam) // 통계표 로그 쌓기

        this.statTabIndex = 0
      }
    },

    // 지표통계 하위 메뉴 조회
    async searchMenuStatItems(upMgmNo) {
      const paramData = {
        upMgmNo: upMgmNo
      }

      // 하위메뉴 조회
      const menuStatItems = await api.searchMenuStatItems(paramData)
      const menuStatItemCount = menuStatItems.data.length

      this.selectedStatSubLevelItems = []

      if (menuStatItemCount === 1) {
        // 하위 메뉴가 하나일 경우 탭 추가
        const addStatItem = menuStatItems.data[0]
        this.addStatTabItem(addStatItem.mgmNo, addStatItem.title)
      } else {
        this.selectedStatSubLevelItems = menuStatItems.data

        if (this.selectedStatSubLevelItems) {
          this.$nextTick(function () {
            this.clickStatSubLevelItem(this.$refs.statSubLevelItemDiv[0].children[0], this.selectedStatSubLevelItems[0])
          })
        }
      }
    },

    // 지표통계 코드값을 이용해 지표 보고서 코드 조회
    async searchIndexStatCode(mgmNo) {
      const paramData = {
        mgmNo: mgmNo
      }
      const codeData = await api.searchIndexStatCode(paramData)
      if (codeData.data) {
        this.statIndexReportCodeId = codeData.data.reportTblKorNm
      }
    },

    // 지표통계 메타정보 조회
    async selectMetaInfoList(mgmNo){
      const params = {
        mgmNo: mgmNo
      }
      const metaData = await api.searchMetaInfoList(params)
      if (metaData.data) {
        this.statMetaInfoList = metaData.data
      }
    },

    // 지표통계 메인 탭 클릭 이벤트
    clickCommonTab(tabIndex) {
      this.commonTabs = tabIndex
    },

    // 지표통계 통계표 탭 클릭 이벤트
    clickStatTab(tabIndex) {
      this.statTabIndex = tabIndex
    },

    // 지표통계 통계표 탭 닫기 클릭 이벤트
    clickStatTabClose(removeStat, tabIndex) {
      let changeStatTabIndex = tabIndex

      for (let idx = 0; idx < this.selectedStats.length; idx++) {
        if (this.selectedStats[idx].statId === removeStat.statId) {

          if (tabIndex === idx) {
            changeStatTabIndex = idx - 1
          }

          // this.selectedStats.splice(idx, 1)
          this.$delete(this.selectedStats, idx)
          break
        }
      }
      if (changeStatTabIndex < 1) {
        this.statTabIndex = 0

      }
    },

    clickStatSubLevelItem(target, subLevelItemData) {
      this.$refs.statSubLevelItemDiv.forEach(obj => obj.classList.remove('on'))
      target.parentElement.classList.add('on')
      this.addStatTabItem(subLevelItemData.mgmNo, subLevelItemData.title)
    },

    // 지표통계 크기보기 버튼 클릭 이벤트
    clickZoom(event) {
      $(event.target).toggleClass("on");
      $("body").toggleClass("zoom");
      if(!$("body").hasClass("zoom")){
        $('html, body').animate({scrollTop:"200"});
      }
    },

    // 사용법 모달
    showManual(){
      this.$nextTick(function(){
        this.setModal($('#showManual'))
      })
    },

    //모달창 세팅
    setModal(target){
      let $modalCnt = $(target).attr("href")
      $modalCnt = $($modalCnt)

      this.$modalCnt = $modalCnt

      $modalCnt.before('<div id="mask"></div>')

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

      this.centerPosition()

    },

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

  }

}
</script>

<style scoped>
.search-wrap {
  padding: 0;
}

.mdss-yy{
  margin-top: 0;
  margin-bottom: 20px;
}

.mdss-yy .swiper-wrapper {
  padding: 0;
}

@media only screen and (max-width: 768px) {
  .mdss-yy .swiper-wrapper .swiper-slide{
    width:50% !important;
  }
  .no-select .swiper-wrapper{
    padding: 0px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .mdss-yy{
    height:auto;
  }
}
</style>
