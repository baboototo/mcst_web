<template>
  <div class="layout">
      <h2 class="title" v-if="boardType == '000035'">기타자료실</h2>
      <h2 class="title" v-if="boardType == '000036'">공지사항</h2>
      <h2 class="title" v-if="boardType == '000311'">지표보고서</h2>
      <div class="notice-detail">
          <div class="notice-detail-header">
              <h3>{{ detailData.boardtitle }}</h3>
          </div>
          <div class="notice-info">
              <dl class="align-end">
                  <dt v-if="boardType == '000311'">{{ detailData.stblTypeNm }}</dt>
                  <dd></dd>
                  <dt>작성자</dt>
                  <dd>{{ detailData.boardregisteruserId }}</dd>
                  <dt>등록일</dt>
                  <dd>{{ detailData.lstChnDate }}</dd>
                  <dt>조회수</dt>
                  <dd>{{ detailData.srchCnt }}</dd>
              </dl>
          </div>
          <div class="notice-txt" v-html="detailData.boardDescription"></div>
          <div class="file-down align-start">
              <p>첨부파일</p>
              <a v-for="(data, idx) in fileList" v-bind:key="idx" href="#" @click.prevent="fileDownload( data.fileMgmNo, detailData.boardId )">
                  {{ data.fileNm }}
              </a>
          </div>
          <div class="notice-prev-next">
              <a v-if="detailData.nextBoardId != null" href="#/" class="next" @click.prevent="boardDetail( detailData.nextBoardId, detailData.boardType )">
                  <span>다음글</span>
                  <span>{{ detailData.nextTitle }}</span>
              </a>
              <a v-if="detailData.preBoardId != null" href="#/" class="prev" @click.prevent="boardDetail( detailData.preBoardId, detailData.boardType )">
                  <span>이전글</span>
                  <span>{{ detailData.preTitle }}</span>
              </a>
          </div>
      </div>
      <div class="btn-layout center">
          <a href="#/" class="gray btn" @click="boardList()">목록</a>
      </div>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import * as file from '@/api/common/file.js'

export default {
  name: "BoardDetailView",

  data(){
    return {
        boardId : this.$route.params.boardId,
        boardType: this.$route.params.boardType,
        searchText: this.$route.query.searchText,
        detailData: [],
        fileList: []
    }
  },

  created() {
    this.searchBoardDetail(this.boardId, this.boardType, this.searchText)
    this.searchBoardFileList(this.boardId)
  },

  methods: {
    async searchBoardDetail(boardId, boardType, searchText) {
      const paramData = {
        boardType: boardType,
        boardId: boardId,
        searchText: searchText
      }
      const boardData = await api.searchBoardDetail(paramData)
      this.detailData = boardData.data
    },

    async searchBoardFileList(boardId) {
      const paramData = {
        boardId: boardId
      }
      const fileData = await api.searchBoardFileList(paramData)
      this.fileList = fileData.data
    },

    // 게시판 상세보기
    boardDetail(boardId, boardType, searchText) {
      this.$router.replace({
        name: '공지사항 상세',
        query: {
          boardId: boardId,
          boardType: boardType,
          searchText: searchText
        }
      }).catch(() => {
      });
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
    },

    // 게시판 목록으로 가기
    boardList() {
      alert('목록보기 눌렀음')
    },
  },

  watch: {
    $route(to, from){
        if (to.path == from.path){
            this.boardId = this.$route.query.boardId
            this.boardType = this.$route.query.boardType
            this.searchText = this.$route.query.searchText
        }
        this.searchBoardDetail(this.boardId, this.boardType, this.searchText)
        this.searchBoardFileList(this.boardId)
    }
  }
}
</script>
<style scoped>
    .align-start {
        display:flex !important;
        justify-content: flex-start !important;
    }
</style>
