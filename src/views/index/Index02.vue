<template>
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
    <ul class="tab-btn-list align-start">
      <li :class="{on: commonTabs === 0}"><a href="#" class="tab" @click.prevent="clickCommonTab(0)">지표</a></li>
      <li :class="{on: commonTabs === 1}"><a href="#" class="tab" @click.prevent="clickCommonTab(1)">나라지표안내</a></li>
    </ul>

    <div class="stat-type-wrap">
      <!-- 지표 -->
      <div class="stat-type-wrap align-start top e-stat-wrap" v-show="commonTabs === 0">
        <div class="e-stat-list">
          <div class="stat-type-header">
              <h3>통계표</h3>
          </div>
          <ul class="stat-type-list align-start">
            <li>
              <ul class="stat-depth02">
                <li v-for="(data, idx) in statisticsListData" v-bind:key="idx" :class="{on: selectedMenu === data.listMgmNo }">
                  <a href="#" @click.prevent="searchDepthStatistics(data.listMgmNo)">{{ data.listKorNm }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="e-stat-cnt-wrap">
            <div class="e-stat-cnt-txt" >
                <h4>간략개요</h4>
                <div class="summary_cnt" v-for="(data, idx) in statisticsDtlData" v-bind:key="idx" v-html="data.ebaroDesc"></div>
                <!-- 
                <br><p>주요 국가의 자국영화점유율 지표의 개념</p>
                <ul>
                    <li>자국영화점유율은 해당 국가의 영화산업에 있어 제작역량을 파악하는 주요한 지표이다.</li>
                    <li>자국영화점유율로 상품이자 문화로서 영화가 자국 소비자에게 어느정도 호응을 얻고있는지 가늠할수 있다.</li>
                </ul>
                 -->
            </div>
            <div class="e-stat-cnt-txt type02" v-for="(data, idx) in statisticsDtlData" v-bind:key="idx">
                <h4>미리보기</h4>
                <a :href="data.baroLinkAddr" class="default btn" target="_blank">e-나라지표 바로가기</a>
                <div class="e-stat-graph-box">
                  <div style="width:100%;overflow:auto;">
                    <iframe :src="data.imgLinkaddr" title="e-나라지표 통계그래프" frameborder="0" style="width: 100%;min-width:585px;height: 420px; vertical-align: middle;"></iframe>
                  </div>
                </div>
            </div>
        </div>
      </div>
      
      <!-- 나라지표안내 -->
      <div class="stat-type-content" v-show="commonTabs === 1">
        <div class="meta-data">
          <table>
            <caption>나라지표안내테이블</caption>
            <colgroup>
              <col>
              <col>
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">e나라 지표란?</th>
                <td>
                <b>e-나라지표시스템을 통해 객관성과 투명성으로 다시 태어나는 우리나라, 국민 여러분과 함께 만들어 가겠습니다. </b><br/><br/>
                21세기 지식정보화 사회를 맞아 세계를 선도적으로 이끌 주역으로 도약하기 위한 첫걸음은 우리의 현주소를 정확히 짚어보고 평가하는 것입니다.
                통계는 과거에 대한 평가, 현위치 진단 그리고 미래상황에 대한 예측을 가능하게 하는 가장 객관적이고 명확한 척도입니다.
                e-나라지표 시스템은 국정 전분야에 걸친 각종 국정통계에 대해 정확한 통계와 추이, 생생한 통계의미 분석등을 제공함으로써 국민, 전문가, 정책결정자들
                모두에게 국정을 알기 쉽게 설명하고, 모니터링할 수 있도록 할 뿐만 아니라 필요한 국정통계정보를 손쉽게 접근할 수 있도록 하고자 함에 있습니다.
                </td>
              </tr>
              <tr>
                <th scope="row">e나라지표 서비스 내용</th>
                <td>
                <b>정부기관에서 엄선한 지표들을 통하여 사회, 경제, 정치, 문화 등 다양한 방면에서의 우리나라 현위치를 보여줍니다.</b><br/><br/>
                e-나라지표 시스템에서 제공하는 지표들은 국가 공식 승인 통계자료뿐만 아니라, 현황이나 각종 행정자료들을 가공한 내용들도 포함합니다.
                시계열 자료를 통하여 정책 결과의 변동을 볼 수 있으며, 이를 그래프로 도식화하여 쉽게 그 추이를 알 수 있게 하였습니다.
                또한, 이용자들의 이해를 돕고자 지표에 대한 분석 자료를 함께 제공합니다.
                </td>
              </tr>
              <tr>
                <th scope="row">e나라지표의 기대효과</th>
                <td>
                <b>정책입안자와 정책결정자에게는 </b><br/><br/>
                우리나라의 현 위치를 객관적인 통계자료와 지표에 근거하여 정확하게 파악하게 합니다. 현 정부의 정책성과를 과거 정부와 비교하여 평가할 수 있게 할 뿐 아니라, 향후 국정이 나아가야 할 방향을 보여줍니다.  <br/><br/>

                <b>일반국민들에게는 </b><br/><br/>
                그동안 접근하기 어려웠던 여러 정보들을 한 곳에서 손쉽게 검색할 수 있습니다. 국정이라고 하면 어렵게만 느끼고 있던 국민들의 관심을 유발하게 국정에 참여하고픈 동기부여 기능을 합니다. 알기 쉬운 나라지표로 우리나라의 이모저모를 가늠해 볼 수 있습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Index.js'
import $ from 'jquery'

export default {
  name: "Index02",
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
      statisticsListData: [],
      statisticsDtlData: [],
      subMenuItems: [],
      commonTabs: 0,
      statId: this.subItemId,
      statName: this.subItemNm,
      statTabIndex: 0,
      selectedMenu: ''
    }
  },
  watch: {
    subItemId: function() {
      this.statisticsListData.splice(0)
      this.initViewParameterValidation(this.subItemId)
    },
  },

  created () {
    this.initViewParameterValidation(this.statId)
    this.findSubMenuItems(this.$route.meta.subMenuItemMgmNo)
  },

  methods: {
    // 공통 탭 클릭 이벤트
    clickCommonTab(tabIndex) {
      this.commonTabs = tabIndex
    },

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

    // e나라지표 통계표 ID 확인
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

    // e나라지표 추가
    addIndexStat(statId) {
      this.statId = statId

      if (this.statId) {
        this.statTabIndex = 0
        this.statisticsList(this.statId)
      }
    },

    // 통계표 목록 초기 세팅
    async statisticsList (upListMgmNo) {

			const paramData = {
				upListMgmNo: upListMgmNo
			}

			const boardData = await api.searchEbarometersList(paramData)

			if (boardData.data.length > 0) {
        for (let i = 0; i < boardData.data.length; i++) {
          const useYn = boardData.data[i].useYn;
          if (useYn == 'Y') { // useYn 이 'Y'일때만 통계표 리스트에 넣기
            this.statisticsListData.push(boardData.data[i])
          }
        }
      }

      // 통계 메뉴의 첫번째 데이터 먼저 뜨게 하기
      for (let i = 0; i < this.statisticsListData.length; i++) {
        if (i == 0) {
         const firstDataNo = this.statisticsListData[i].listMgmNo
         this.searchDepthStatistics(firstDataNo)
        } else {
          break
        }
      }
		},

    // 통계표 클릭시
    async searchDepthStatistics(listMgmNo) {
      const paramData = {
        listMgmNo: listMgmNo
      }
      const dtlData = await api.searchEbarometersDtl(paramData)
			this.statisticsDtlData = dtlData.data
      this.selectedMenu = listMgmNo
    }
  }
}
</script>

<style scoped>
  .summary_cnt {
    padding-left: 10px;
    color: #666666;
    font-size: 16px;
  }
  .meta-data{
    margin-top: 54px;
  }
  .meta-data table th{
    padding: 15px 0 8px 20px;
    vertical-align: top;
  }
</style>
