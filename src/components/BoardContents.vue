<template>
  <div>
    <div class="notice-detail" style="margin-top: 10px;">
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
        <a v-for="(data, idx) in fileList" v-bind:key="idx" href="#" @click.prevent="fileDownload( data.fileMgmNo, detailData.boardId )">
          {{ data.fileNm }}
        </a>
      </div>
      <div class="notice-prev-next" :paramCodeId="codeId">
        <a v-if="detailData.nextBoardId != null" href="#/" class="next" @click.prevent="searchBoardDetail( detailData.nextBoardId, detailData.boardType, codeId)">
          <span>다음글</span>
          <span>{{ detailData.nextTitle }}</span>
        </a>
        <a v-if="detailData.preBoardId != null" href="#/" class="prev" @click.prevent="searchBoardDetail( detailData.preBoardId, detailData.boardType, codeId)">
          <span>이전글</span>
          <span>{{ detailData.preTitle }}</span>
        </a>
      </div>
    </div>
    <div class="btn-layout center">
      <a href="#/" class="gray btn" @click="callBackBoardListView()">목록</a>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: "BoardContents",
  props: {
    paramBoardId: {
      type: String,
      default: ''
    },
    paramBoardType: {
      type: String,
      default: ''
    },
    paramCodeId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      boardId: this.paramBoardId,
      boardType: this.paramBoardType,
      codeId: this.paramCodeId,
      searchText: '',
      detailData: {},
      fileList: []
    }
  },

  watch: {
    paramBoardId: function() {
      this.searchBoardDetail(this.paramBoardId, this.paramBoardType, this.paramCodeId)
    }
  },

  methods: {
    async searchBoardDetail(boardId, boardType, codeId) {
      this.boardId = boardId
      this.boardType = boardType
      this.codeId = codeId

      const paramData = {
        boardId: this.boardId,
        boardType: this.boardType,
        searchText: this.searchText,
        stblType: this.codeId
      }

      await this.updateBoardHits(paramData)

      const boardData = await api.searchBoardDetail(paramData)
      let regNm = (boardData.data.boardregisteruserId == 'admin') ? '관리자' : boardData.data.boardregisteruserId
      boardData.data.boardregisteruserId = regNm
      this.detailData = boardData.data

      const fileData = await api.searchBoardFileList(paramData)
      this.fileList = fileData.data

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
        downMenu: '지표보고서',
        downCntn: fileMgmNo
      }
      await staticApi.insertExcelDownLog(logParams)
    },

    // 게시판 히트수 업데이트
    async updateBoardHits(paramData) {
      await api.updateBoardHits(paramData)
    },

    callBackBoardListView() {
      this.$emit('callBackBoardListView')
    }
  }
}
</script>

<style scoped>

</style>
