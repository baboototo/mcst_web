<template>
  <div class="layout">
    <h2 class="title blind">설문조사</h2>
    <table class="survey-table">
      <caption class="ir">설문조사</caption>
      <colgroup>
        <col style="width:90px;">
        <col style="width:110px;">
        <col>
        <col>
        <col style="width:110px;">
      </colgroup>
      <thead class="ir">
        <tr>
          <th scope="col">번호</th>
          <th scope="col">조사종류</th>
          <th scope="col">조사명</th>
          <th scope="col">기간</th>
          <th scope="col">조사상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, idx) in listData" v-bind:key="idx" @click.prevent="moveSrvyPage( data.designTpCd, data.rschSeqNo )" title="새창열기">
          <td>
            <div class="align-around">
              <div>
                {{ data.orderRowNum }}
              </div>
              <div>
                <div :class="{'mo-survey-result' : data.rschStNm == '조사완료' , 'mo-survey-result ing' : data.rschStNm == '진행중'}">
                  {{ data.rschStNm }}
                </div>
                <div class="mo-type">{{ data.rschTpNm }}</div>
              </div>
            </div>
          </td>
          <td><div class="type">{{ data.rschTpNm }}</div></td>
          <td class="text-align-left">{{ data.rschNm }}</td>
          <td>{{ data.rschDte }}</td>
          <td>
            <div :class="{'survey-result' : data.rschStNm == '조사완료' , 'survey-result ing' : data.rschStNm == '진행중'}">
              {{ data.rschStNm }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <BoardPagination :pageSetting="pageDataSetting(this.page)" @paging="pagingMethod"/>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import BoardPagination from '@/components/BoardPagination'

export default {
  name: "Survey",

  components: {
    BoardPagination
  },

  data () {
    return {
      searchText: '',
      listData : [],
      total : 0,
      page: 1,
      limit: 10,
      block: 10,
      startIdx: 1,
      endIdx: 10
    }
  },

  created () {
    this.initBoard()
  },

  mounted() {
    if(window.innerWidth <= 768){
      this.block = 5
    }
  },

  methods: {
    initBoard() {
      if (this.$route.query.page) {
        this.page = this.$route.query.page
      }
      /*
            if (this.$route.query.searchText) {
              this.searchText = this.$route.query.searchText
            }
      */
      this.searchBoardTotalList(this.page)
    },

    // 게시판 전체 목록
    async searchBoardTotalList (currentPage) {
      this.startIdx = ((currentPage - 1) * this.limit) + 1
      this.endIdx = currentPage * this.limit
      this.page = currentPage

      const paramData = {
        boardType: this.boardType,
        /*
        searchText: this.searchText,
        */
        startPage: this.startIdx,
        endPage: this.endIdx,
      }

      const boardData = await api.searchRschBoardList(paramData)
      this.listData = boardData.data

      const totalCnt = await api.srvyListTotalCnt(paramData)
      this.total = totalCnt.cnt
      this.pageDataSetting(currentPage)
    },

    // 설문조사 화면 이동
    async moveSrvyPage (designTpCd, rschSeqNo) {
      const paramData = {
        rschSeqNo: rschSeqNo
      }
      await api.searchSrvyDetail(paramData)

      var openUrl = ""
      openUrl = 'https://stat.mcst.go.kr/mcst/srvy/webNew.html?seq=W_' + rschSeqNo
      window.open(openUrl, '_blank')
    },

    pagingMethod(page) {
      this.$router.replace({
        name: '설문조사',
        query: {
          page: page,
          /*
          searchText: this.searchText
          */
        }
      }).catch(()=>{});
    },

    pageDataSetting(currentPage){
      const totalPage = Math.ceil(this.total / this.limit)
      const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
      const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null

      let startIndex = (Math.ceil(currentPage / this.block) - 1) * this.block + 1
      let endIndex = startIndex + this.block > totalPage ? totalPage : startIndex + this.block - 1
      let list = []
      for (let index = startIndex; index <= endIndex; index++) {
        list.push(index)
      }
      return { first, end, list, currentPage, totalPage }
    }
  },
  watch: {
    $route(to, from){
      if (to.path == from.path) {
        this.initBoard()
      }
    }
  },
}

</script>

<style scoped>
.survey-table tr:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
.survey-table tr:hover .text-align-left {
  color: #7775ae;
}
</style>
