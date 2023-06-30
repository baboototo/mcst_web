<template>
  <div class="layout">
    <h2 class="title blind">전자책</h2>
    <div class="search-wrap align-end">
      <div class="search-box">
        <label for="sortGubun" class="ir">검색순서</label>
        <select v-model="sortGubun" id="sortGubun">
          <option value="date">최신순</option>
          <option value="visit">조회순</option>
          <option value="title">제목순</option>
        </select>
        <label for="classCode" class="ir">검색카테고리</label>
        <select v-model="classCode" id="classCode">
          <option value="">전체</option>
          <option v-for="(data, idx) in selectCodeList" v-bind:key="idx" :value="data.code">{{ data.name }}</option>
        </select>
        <label for="boardSearchText" class="ir">검색창</label>
        <input type="search" @keyup.enter="searchTextBoardList" v-model="boardSearchText" id="boardSearchText">
        <button type="submit" @click="searchTextBoardList">검색</button>
      </div>
    </div>
    <div class="infographic-list">
      <ul class="infographic-list-inner align-between">
        <li v-for="(data, idx) in ebookDataList" v-bind:key="idx">
          <div class="info-img">
            <img :src="changeUrl(data.initpage)" @click="openEbook(data.site)" :alt="data.name" :title="data.name + ' 상세보기 새창열기'">
          </div>
          <div class="info-cnt">
            <p class="info-title" style="word-break: break-all;">{{data.name}}</p>
            <span class="info-date type02">
              <span>{{data.nowPage}} 페이지</span>
              <span>조회수 : {{data.visit | visitComma}}</span>
              <span>{{data.dates}}</span>
            </span>
            <button type="button" @click="fileDownload(data.site)" title="pdf다운로드">다운로드</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-layout center" v-if="isSearchData">
      <button type="button" class="info-more-btn" @click="searchEbookList">더보기</button>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/Ebook.js'
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: 'Ebook',
  components: {},
  created () {
    this.searchEbookList()
  },
  data () {
    return {
      sortGubun: 'date',
      classCode: '',
      boardSearchText: '',
      boardCount: 6,
      boardPageIndex: 0,
      boardStartPage: 0,
      boardEndPage: 0,
      selectCodeList: [],
      ebookDataList: [],
      isSearchData: true
    }
  },
  filters: {
    visitComma: function (value) {
      var num = new Number(value);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  methods: {

    searchTextBoardList() {
      this.boardPageIndex = 0
      this.boardStartPage = 0
      this.boardEndPage = 0
      this.selectCodeList = []
      this.ebookDataList = []
      this.isSearchData = true

      this.searchEbookList()
    },

    // 전자책 데이터 조회
    async searchEbookList () {
      // 전자책 페이징 인덱스 및 페이지 설정
      this.boardPageIndex = this.boardPageIndex + 1
      this.boardStartPage = ((this.boardPageIndex - 1) * this.boardCount) + 1
      this.boardEndPage = this.boardPageIndex * this.boardCount

      // 전자책 selectbox 조회
      const codeData = await api.selectCodeList()
      if (!codeData.data.length == this.selectCodeList.length) {
        codeData.data.forEach(data => this.selectCodeList.push(data))
      }

      // 전자책 데이터 파라미터 설정
      const paramData = {
        sortGb: this.sortGubun,
        classCode: this.classCode,
        searchText: this.boardSearchText,
        startPage: this.boardStartPage,
        endPage: this.boardEndPage
      }

      // 전자책 데이터 조회
      const boardData = await api.searchEbookList(paramData)
      if (boardData.data.length > 0) {
        boardData.data.forEach(data => this.ebookDataList.push(data))
      }

      // 전자책 데이터 개수가 게시물 조회 개수보다 작으면 더보기 버튼 숨김
      if (boardData.data.length < this.boardCount) {
        this.isSearchData = false
      }

      // 전자책 데이터가 존재하지 않을 경우 알림창 띄움
      if (boardData.data.length == 0) {
        alert("목록이 존재하지 않습니다.");
      }
    },

    // 이미지 선택 시 전자책 열기
    openEbook(site) {
      const openUrl = 'https://ebook.culturestat.mcst.go.kr/src/viewer/main.php?host=main&category=0&page=0&pagenum=0&site=' + site
      window.open(openUrl, '_blank')
    },

    // 파일 다운로드
    async fileDownload(site) {

      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'ebook',
        fileMgmNo: site
      }

      // 파일 다운로드 호출
      await file.download(params)

      //파일 다운로드 로그
      const logParams = {
        downMenu: '전자책',
        downCntn: site
      }
      await staticApi.insertExcelDownLog(logParams)

    },

    changeUrl(url) {
      return url.replace('http://', 'https://')
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1600px){

}
</style>
