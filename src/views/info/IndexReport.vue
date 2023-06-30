<template>
  <div class="layout">
    <h2 class="title blind">지표보고서</h2>
    <div class="search-wrap align-between">
      <span class="total">전체 : <span>{{ total }}</span>건</span>
      <div class="search-box">
        <label for="codeId" class="ir">검색카테고리</label>
         <select v-model="codeId" id="codeId">
            <option value="">전체</option>
            <option v-for="(data, idx) in selectCodeList" v-bind:key="idx" :value="data.codeId">{{ data.codeKorNm }}</option>
          </select>
          <label for="txtName" class="ir">제목/내용순서</label>
          <select name="" id="txtName">
          <option value="">제목 / 내용</option>
        </select>
        <label for="searchText2" class="ir">검색창</label>
        <input type="search" v-model="searchText" id="searchText2" v-on:keyup.enter="searchBoardTotalList(1, 10, 1)"/>
        <button type="submit" @click="searchBoardTotalList(1, 10, 1)">검색</button>
      </div>
    </div>
    <IndexReportListItem :board-list-data="listData" :searchText="this.searchText" :boardName="this.boardName" @showDetailView="showDetailView"/>
    <BoardPagination :pageSetting="pageDataSetting(this.page)" @paging="pagingMethod"/>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import IndexReportListItem from '@/components/IndexReportListItem'
import BoardPagination from '@/components/BoardPagination'

export default {
  name: "IndexReport",

  components: {
    IndexReportListItem,
    BoardPagination
  },

  props: {
    paramCodeId: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      boardType: '000311',
      boardName: '지표보고서',
      searchText: '',
      codeId: this.paramCodeId,
      // codeId: 'CODE-1022000',
      listData: [],
      selectCodeList: [],
      total: 0,
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

      if (this.$route.query.searchText) {
        this.searchText = this.$route.query.searchText
      }

      if (this.$route.query.codeId) {
        this.codeId = this.$route.query.codeId
      }

      this.searchBoardTotalList(this.page)
    },

    // 게시판 상세보기 화면 이동
    showDetailView(boardId, boardType, orderRowNum) {
      const paramData = {
        boardId: boardId,
        boardType: boardType,
        target: '지표보고서',
        page: this.page + '',
        searchText: this.searchText,
        codeId: this.codeId,
        orderRowNum: orderRowNum
      }

      this.$router.push({ name: '지표보고서 상세', query: paramData })
    },

    // 게시판 전체 목록
    async searchBoardTotalList (currentPage) {
      this.startIdx = ((currentPage - 1) * this.limit) + 1
      this.endIdx = currentPage * this.limit
      this.page = currentPage

      const codeData = await api.selectCodeList()
      if (!codeData.data.length == this.selectCodeList.length) {
          codeData.data.forEach(data => this.selectCodeList.push(data))
      }

      const paramData = {
        boardType: this.boardType,
        stblType: this.codeId,
        searchText: this.searchText,
        startPage: this.startIdx,
        endPage: this.endIdx,
      }

      const boardData = await api.searchBoardList(paramData)
      this.listData = boardData.data

      const totalCnt = await api.boardCnt(paramData)
      this.total = totalCnt.cnt
      this.pageDataSetting(currentPage)
    },

    pagingMethod(page) {
      this.$router.replace({
        name: '지표보고서',
        query: {
          page: page,
          searchText: this.searchText,
          codeId: this.codeId
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
      if (to.path === from.path) {
        this.initBoard()
      }
    },
    paramCodeId: function() {
      this.codeId = this.paramCodeId
      this.searchBoardTotalList(this.startIdx, this.endIdx, this.page)
    }
  }
}
</script>

<style scoped>

</style>
