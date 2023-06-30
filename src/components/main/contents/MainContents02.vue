<template>
  <div class="cd-section" id="section02">
    <div class="cd-section-inner">
      <div class="layout">
        <h2 class="section-title">문화체육관광 통계 현황</h2>
        <div class="tab_menu align-around top">
          <label for="mSelect" class="ir">문화체육관광 통계 카테고리</label>
          <select name="" id="mSelect" class="m-select" @change="clickStatBoardTab($event.target.value)">
            <option value="0">문화</option>
            <option value="1">예술</option>
            <option value="2">문화산업</option>
            <option value="3">관광</option>
            <option value="4">스포츠</option>
            <option value="5">종합</option>
          </select>
          <ul class="list align-between">
            <li v-for="(statMenuName, idx) in statBoardMenuList" :key="idx" :class="{is_on: statBoardTabIndex == idx}">
              <a href="javascript:;" @click="clickStatBoardTab(idx)" class="tab-btn">{{ statMenuName }}</a>
            </li>
          </ul>
          <div class="cont_area">
            <div v-for="(statMenuName, idx) in statBoardMenuList" :key="idx" v-if="statBoardTabIndex == idx">
              <ul class="align-between">
                <li v-for="(subMenu, mIdx) in statBoardSubMenuList" :key="mIdx" v-if="subMenu.topMenu === statMenuName">
                  <a href="javascript:;" @click="clickGoSubject(subMenu)" title="바로가기">{{ subMenu.tblKorNm }}</a>
                </li>
              </ul>
              <div class="board-tab" v-show="statBoardRankList.length > 0">
                <div class="board-title">
                  <h3><strong>{{ statMenuName }}</strong> 분야에서 많이 보는 통계표</h3>
                </div>
                <ul class="board-list">
                  <li v-for="(statRank, rIdx) in statBoardRankList" :key="rIdx" v-if="statRank.topMenu === statMenuName">
                    <a href="javascript:;" @click="clickStatOpen(statRank.tblMgmNo)" title="새창으로">{{ statRank.tblKorNm }} [{{ statRank.subMenu  }}] </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Main.js'

export default {
  name: "MainContents02",
  data() {
    return {
      statBoardMenuList: ['문화', '예술', '문화산업', '관광', '스포츠', '종합'],
      statBoardSubMenuList: [],
      statBoardRankList: [],
      statBoardTabIndex: 0,
    }
  },
  watch: {
  },

  created() {
    this.clickStatBoardTab(0)
    this.searchMainStatBoardData()
  },

  methods: {
    async searchMainStatBoardData() {

      const paramData = {}
      const boardData = await api.searchMainStatBoardData(paramData)

      if (boardData.data) {
        this.statBoardSubMenuList = boardData.data['statBoardMenu']
        this.statBoardRankList = boardData.data['statBoardRank']
      }
    },

    clickStatBoardTab (index) {
      this.statBoardTabIndex = index
    },

    clickStatOpen(tblMgmNo) {
      window.open('/portal/staticPop/' + tblMgmNo + '/' + 1)
    },

    clickGoSubject(statBoardSubItem) {
      this.$router.push({ name: statBoardSubItem.topMenu, params: {subItemId: statBoardSubItem.tblMgmNo}})

      // if (statBoardSubItem.topMenu === '문화' || statBoardSubItem.topMenu === '예술') {
      //   this.$router.push({ name: '문화예술통계', params: {subItemId: statBoardSubItem.tblMgmNo}})
      //
      // } else if (statBoardSubItem.topMenu === '문화산업') {
      //   this.$router.push({ name: '문화산업통계', params: {subItemId: statBoardSubItem.tblMgmNo}})
      //
      // } else if (statBoardSubItem.topMenu === '관광') {
      //   this.$router.push({ name: '관광통계', params: {subItemId: statBoardSubItem.tblMgmNo}})
      //
      // } else if (statBoardSubItem.topMenu === '스포츠') {
      //   this.$router.push({ name: '체육통계', params: {subItemId: statBoardSubItem.tblMgmNo}})
      //
      // } else if (statBoardSubItem.topMenu === '종합') {
      //   this.$router.push({ name: '문화산업통계', params: {subItemId: statBoardSubItem.tblMgmNo}})
      // }
    }


  },
}
</script>

<style scoped>

</style>
