<template>
  <div class="layout">
    <h2 class="title blind" v-if="boardType == '000035'">기타자료실</h2>
    <h2 class="title blind" v-if="boardType == '000036'">공지사항</h2>
    <h2 class="title blind" v-if="boardType == '000311'">지표보고서</h2>
    <div class="notice-detail">
      <div class="notice-detail-header">
          <h3>{{ detailData.boardtitle }}</h3>
      </div>
      <div class="notice-info align-between" style="flex-wrap:wrap;">
        <p>{{ detailData.stblTypeNm }}</p>
        <dl class="align-end">
          <dt>작성자</dt>
          <dd>{{ detailData.boardregisteruserId }}</dd>
          <dt>등록일</dt>
          <dd>{{ detailData.lstChnDate }}</dd>
          <dt>조회수</dt>
          <dd>{{ detailData.srchCnt }}</dd>
        </dl>
      </div>
      <div class="notice-txt" v-html="detailData.boardDescription"></div>
      <div class="file-down align-start" v-if="fileList.length > 0">
        <p>첨부파일</p>
        <div>
          <a v-for="(data, idx) in fileList" v-bind:key="idx" href="javascript:;" @click.prevent="fileDownload( data.fileMgmNo, detailData.boardId )">
              {{ data.fileNm }}
          </a>
        </div>
      </div>
      <div class="notice-prev-next" :orderRowNum="orderRowNum">
        <a v-if="detailData.nextBoardId != null" href="javascript:;"  class="next" @click.prevent="boardDetail( detailData.nextBoardId, detailData.boardType, parseInt(orderRowNum)-1 )">
          <span>다음글</span>
          <span>{{ detailData.nextTitle }}</span>
        </a>
        <a v-if="detailData.preBoardId != null" href="javascript:;" class="prev" @click.prevent="boardDetail( detailData.preBoardId, detailData.boardType, parseInt(orderRowNum)+1 )">
          <span>이전글</span>
          <span>{{ detailData.preTitle }}</span>
        </a>
      </div>
    </div>
    <div class="btn-layout center">
      <a class="gray btn" href="javascript:;" @click.prevent="boardList()">목록</a>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: "BoardDetailItem",
  
  data(){
    return {
      target: this.$route.query.target,
      boardId : this.$route.query.boardId,
      boardType: this.$route.query.boardType,
      orderRowNum: this.$route.query.orderRowNum,
      searchText: this.$route.query.searchText,
      codeId: this.$route.query.codeId,
      detailData: [],
      fileList: []
    }
  },

  created() {
    this.searchBoardDetail(this.boardId, this.boardType, this.searchText, this.codeId)
    this.searchBoardFileList(this.boardId)
  },

  methods: {
    async searchBoardDetail (boardId, boardType, searchText, codeId) {
      const paramData = {
        boardType: boardType,
        boardId: boardId,
        searchText: searchText,
        stblType: codeId
      }

      await this.updateBoardHits(paramData)

      const boardData = await api.searchBoardDetail(paramData)
      let regNm = (boardData.data.boardregisteruserId == 'admin') ? '관리자' : boardData.data.boardregisteruserId
      boardData.data.boardregisteruserId = regNm
      this.detailData = boardData.data
	  },

    async searchBoardFileList (boardId) {
      const paramData = {
	      boardId: boardId
	    }
      const fileData = await api.searchBoardFileList(paramData)
      this.fileList = fileData.data
    },

    // 게시판 상세보기
	  boardDetail (boardId, boardType, orderRowNum) {
    
      // 이전글 다음글 이동시 페이지 변경
      this.orderRowNum = orderRowNum
      if (orderRowNum%10 == 0) {
        this.$route.query.page = orderRowNum/10
      } else if (!orderRowNum%10 == 0) {
        this.$route.query.page = Math.ceil(orderRowNum/10)
      }

      const paramData = {
        boardId: boardId,
        boardType: boardType
      }

      this.$router.push({name: this.$route.name, query: Object.assign({}, this.$route.query, paramData) }).catch(error => {
        if(error.name != "NavigationDuplicated" ) {
          throw error;
        }
      })
    },

    // 첨부파일 다운로드
    async fileDownload(fileMgmNo, boardId) {
      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'BOARD',
        boardId: boardId,
        fileMgmNo: fileMgmNo
      }

      // 파일 다운로드 호출
      await file.download(params)

      //파일 다운로드 로그
      const logParams = {
        downMenu: this.target,
        downCntn: fileMgmNo
      }
      await staticApi.insertExcelDownLog(logParams)
    },

    // 게시판 목록으로 가기
    boardList() {
      if (this.target) {
        this.$router.push({ name: this.target, query: Object.assign({}, this.$route.query) }).catch(() => {
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },

    // 게시판 히트수 업데이트
    async updateBoardHits(paramData) {
      await api.updateBoardHits(paramData)
    },
  },

    watch: {
        $route(to, from){
            if (to.path == from.path){
                this.boardId = this.$route.query.boardId
                this.boardType = this.$route.query.boardType
                this.searchText = this.$route.query.searchText
                this.codeId = this.$route.query.codeId
            }
            this.searchBoardDetail(this.boardId, this.boardType, this.searchText, this.codeId)
            this.searchBoardFileList(this.boardId)
        }
    },
}
</script>
<style scoped>
    .align-start {
        display:flex !important;
        justify-content: flex-start !important;
    }
</style>
