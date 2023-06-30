<template>
  <div class="layout">
    <h2 class="title blind">인포그래픽</h2>
    <div class="search-wrap align-end">
      <div class="search-box">
        <label for="boardSearchText" class="ir">검색창</label>
        <input type="search" v-model="boardSearchText" id="boardSearchText">
        <button type="submit" @click="searchTextBoardList">검색</button>
      </div>
    </div>
    <div class="infographic-list">
      <ul class="infographic-list-inner align-between">
        <li v-for="(data, idx) in infoDataList" v-bind:key="idx">
          <div class="info-img">
            <img :src="findImage(data)" :alt="data.boardtitle" @click="fileLink(data)" :title="data.boardtitle + ' 상세보기 새창열기'">
          </div>
          <div class="info-cnt">
            <p class="info-title">{{data.boardtitle}}</p>
            <span class="info-date">{{data.lstChnDate}}</span>
            <button type="button" @click="fileDownload(data)" title="pdf다운로드">다운로드</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-layout center" v-if="isSearchData">
      <button type="button" class="info-more-btn" @click="searchBoardList">더보기</button>
    </div>

  </div>
</template>

<script>
import * as api from '@/api/Infographic.js'
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: 'Infographic',
  components: {},
  created () {
    this.searchBoardList()
  },
  data () {
    return {
      blankImg: '../../assets/img/sample/info_sample01.png',
      boardType: '000266',
      boardSearchText: '',
      boardCount: 6,
      boardPageIndex: 0,
      boardStartPage: 0,
      boardEndPage: 0,
      infoDataList: [],
      isSearchData: true
    }
  },
  methods: {
    searchTextBoardList() {
      // 인포그래픽 페이징 인덱스 및 페이지 설정
      this.boardPageIndex = 0
      this.boardStartPage = 0
      this.boardEndPage = 0
      this.infoDataList = []
      this.isSearchData = true

      this.searchBoardList()
    },

    // 인포그래픽 데이터 조회
    async searchBoardList() {
      // 인포그래픽 페이징 인덱스 및 페이지 설정
      this.boardPageIndex = this.boardPageIndex + 1
      this.boardStartPage = ((this.boardPageIndex - 1) * this.boardCount) + 1
      this.boardEndPage = this.boardPageIndex * this.boardCount

      // 인포그래픽 데이터 파라미터 설정
      const paramData = {
        boardType: this.boardType,
        searchText: this.boardSearchText,
        startPage: this.boardStartPage,
        endPage: this.boardEndPage
      }

      // 인포그래픽 데이터 조회
      const boardData = await api.searchBoardList(paramData)
      if (boardData.data.length > 0) {
        boardData.data.forEach(data => this.infoDataList.push(data))
      }

      // 인포그래픽 데이터 개수가 개시물 조회 개수보다 작으면 더보기 버튼 숨김
      if (boardData.data.length < this.boardCount) {
        this.isSearchData = false
      }

    },

    // 인포그래픽 이미지 선택 시 PDF 파일 새창 열기
    fileLink(linkData) {
      // const fileName = file.findFileName(linkData['descriptionUrl'])
      // const openUrl = process.env.VUE_APP_ADMIN_SERVER + '/resource/upload/notice/'+ linkData.boardId + '/' + fileName
      
      window.open(linkData.descriptionUrl, '_blank')
    },

    // 파일 다운로드
    async fileDownload(data) {
      let fileMgmNo = ''
      for (const fileData of data['attachFileList']) {
        if (fileData['fileTypeCd'] === 'pdf') {
          fileMgmNo = fileData.fileMgmNo
          break;
        }
      }

      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'board',
        boardId: data.boardId,
        fileMgmNo: fileMgmNo
      }

      // 파일 다운로드 호출
      await file.download(params)

      //파일 다운로드 로그
      const logParams = {
        downMenu: '인포그래픽',
        downCntn: fileMgmNo
      }
      await staticApi.insertExcelDownLog(logParams)

    },

    // 인포그래픽 썸네일 이미지 검색 후 썸테일 URL 반환
    findImage(data) {
      try {
        // 인포그래픽 첨부파일 목록에서 PNG 파일을 찾아 URL 반환
        let fileTypeCd = ''
        for (const imgFileData of data['attachFileList']) {
          fileTypeCd = imgFileData['fileTypeCd'].toLowerCase()
          if (fileTypeCd == 'png' || fileTypeCd == 'bmp' || fileTypeCd == 'jpg') {
            return imgFileData['directoryPath'].replace('http://', 'https://')
          }
        }
      } catch (e) {
        return require("../../assets/img/sample/info_sample01.png")
      }
      return require("../../assets/img/sample/info_sample01.png")
    }
  }

}
</script>

<style scoped>
@media only screen and (max-width: 1600px){

}
</style>
