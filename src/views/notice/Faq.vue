<template>
  <div class="layout">
    <h2 class="title blind">FAQ</h2>
    <dl class="accordion">
      <div class="accData" v-for="(data, idx) in listData" v-bind:key="idx">
        <dt><a @click="[accordion($event), searchBoardDetail(data.boardId, data.boardType)]"><span>Q{{ data.orderRowNum }}.</span>{{ data.boardtitle }}</a></dt>
        <dd class="view" v-show="accView">
          <div>
            <p >A{{ data.orderRowNum }}.</p>
            <p :boardDscrptn="boardDscrptn" v-html="boardDscrptn"></p>
          </div>
        </dd>
      </div>
    </dl>
    <BoardPagination :pageSetting="pageDataSetting(this.page)" @paging="pagingMethod"/>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import BoardPagination from '@/components/BoardPagination'
import $ from 'jquery';

export default {
  name: "Faq",

  components: {
    BoardPagination
  },

  data () {
    return {
      boardType: '000034',
      listData: [],
      detailData: [],
      accView: false,
      total : 0,
      page: 1,
      limit: 10,
      block: 10,
      startIdx: 1,
      endIdx: 10,
      boardDscrptn: ''
    }
  },

  created() {
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

    async searchBoardTotalList (currentPage) {
      this.startIdx = ((currentPage - 1) * this.limit) + 1
      this.endIdx = currentPage * this.limit
      this.page = currentPage

      const paramData = {
        boardType: this.boardType,
        /* searchText: this.searchText, */
        startPage: this.startIdx,
        endPage: this.endIdx,
      }

      const boardData = await api.searchBoardList(paramData)
      this.listData = boardData.data

      const totalCnt = await api.boardCnt(paramData)
      this.total = totalCnt.cnt
      this.pageDataSetting(currentPage)
    },

    async searchBoardDetail(boardId, boardType) {
      this.boardId = boardId
      this.boardType = boardType

      const paramData = {
        boardId: this.boardId,
        boardType: this.boardType,
        /* searchText: this.searchText */
      }

      const boardData = await api.searchBoardDetail(paramData)
      this.detailData = boardData.data
      this.boardDscrptn = this.detailData.boardDescription
    },

    accordion(event) {
      const accordion = document.getElementsByClassName("accordion")
      const display = $(event.target).parent().next().css("display")

      // dd태그가 보이지 않는 경우만 열릴수 있도록 제어
      if (display=="none") {
        //초기화
        $(accordion).find("dt.on").removeClass("on").next().stop().slideUp("")
        //현재설정
        $(event.target).parent().addClass("on").next().stop().slideDown("")
      } else {
        $(accordion).find("dt.on").removeClass("on").next().stop().slideUp("")
      }
    },

    pagingMethod(page) {
      this.$router.replace({                
        name: 'FAQ',
        query: {
          page: page,
          /* searchText: this.searchText */
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
.accordion dt a:hover{
  background-color: #f8f8f8;
}
</style>
