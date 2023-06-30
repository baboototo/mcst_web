<template>
  <div>
    <div v-show="!isShowBoardContents">
      <IndexReportListItem :boardListData="listData" :searchText="this.searchText" :boardName="this.boardName" @showDetailView="showDetailView" />
      <BoardPagination :pageSetting="pageDataSetting(this.page)" @paging="searchBoardTotalList"/>
    </div>
    <div v-show="isShowBoardContents">
      <BoardContents :paramBoardType="boardType" :paramBoardId="boardId" :paramCodeId="codeId" @callBackBoardListView="callBackBoardListView()" ></BoardContents>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import IndexReportListItem from '@/components/IndexReportListItem'
import BoardPagination from "./BoardPagination"
import BoardContents from "./BoardContents"

export default {
  name: "IndexBoardView",

  components: {
    IndexReportListItem,
    BoardPagination,
    BoardContents
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
      listData: [],
      total: 0,
      page: 1,
      limit: 10,
      block: 10,
      startIdx: 1,
      endIdx: 10,
      boardId: '',
      isShowBoardContents: false
    }
  },

  watch: {
    paramCodeId: function() {
      this.codeId = this.paramCodeId
      this.page = 1

      this.searchBoardTotalList(this.page)
    }
  },

  mounted() {
    if(window.innerWidth <= 768){
      this.block = 5
    }
  },

  methods: {
    // 지표보고서 게시물 조회
    async searchBoardTotalList (currentPage) {
      this.startIdx = ((currentPage - 1) * this.limit) + 1
      this.endIdx = currentPage * this.limit
      this.page = currentPage

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
      if (totalCnt.cnt) {
        this.total = totalCnt.cnt
        this.pageDataSetting(currentPage)
      }
    },

    // 지표보고서 게시물 상세보기
    showDetailView(boardId, boardType) {
      this.boardId = boardId
      this.boardType = boardType
      this.isShowBoardContents = true
    },

    // 지표보고서 게시물 목록보기
    callBackBoardListView() {
      this.isShowBoardContents = false
    },

    // 지표보고서 게시물 페이징
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
  }
}
</script>

<style scoped>

</style>
