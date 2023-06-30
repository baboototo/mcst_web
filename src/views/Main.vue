<template>
  <div id="wrapper" class="container">
    <Header :isShowFocusMenuType="isShowFocusMenuType"
            :keywordDataList="keywordDataList"></Header>
    <MainContents v-if="!isMobile"
                  @changeMainPageIndex="changeMainPageIndex"
                  :etcBoardDataList="etcBoardDataList"
                  :noticeBoardDataList="noticeBoardDataList"
                  :infographicDataList="infographicDataList"
                  :ebookDataList="ebookDataList"
                  :keywordDataList="keywordDataList"></MainContents>
    <div v-else>
      <MainContents01 :keywordDataList="keywordDataList"></MainContents01>
      <MainContents02></MainContents02>
      <MainContents03 :etcBoardDataList="etcBoardDataList" :noticeBoardDataList="noticeBoardDataList" :infographicDataList="infographicDataList"></MainContents03>
      <MainContents04 :ebookDataList="ebookDataList"></MainContents04>
    </div>
    <!-- <MainPopup></MainPopup> -->
    <div v-for="(tab, index) in popList" v-bind:key="index">
      <component v-bind:is="tab.tabComponent" :boardId="tab.boardId" :popList="tab.popList" :popIndex="index" :popTitle="tab.boardTitle" :popImg="tab.boardDescription" :imgWidth="tab.imgWidth" :imgHeight="tab.imgHeight"></component>
    </div>
  </div>
</template>

<script>
import * as apiNotice from '@/api/Notice.js'
import * as apiInfographic from '@/api/Infographic.js'
import * as apiEbook from '@/api/Ebook.js'
import * as searchApi from '@/api/Search.js'

import Header from "../components/Header"
import MainContents from "../components/main/MainContents"

import MainContents01 from "../components/main/contents/MainContents01"
import MainContents02 from "../components/main/contents/MainContents02"
import MainContents03 from "../components/main/contents/MainContents03"
import MainContents04 from "../components/main/contents/MainContents04"
import MainPopup from "../components/popup/MainPopup"

export default {
  name: 'Main',
  components: {
    Header,
    MainContents,
    MainContents01,
    MainContents02,
    MainContents03,
    MainContents04,
    MainPopup
  },
  data() {
    return {
      mainPageIndex: 0,
      isShowFocusMenuType: false,
      isMobile: false,
      statBoardDataList: [],
      etcBoardDataList: [],
      noticeBoardDataList: [],
      infographicDataList: [],
      ebookDataList: [],
      keywordDataList: [],
      popList: []
    }
  },

  computed: {
    
  },

  created() {
    window.addEventListener('scroll', this.eventViewScroll)
    window.addEventListener('resize', this.eventViewResize)

    this.keywordData()  // 인기검색어

    this.eventViewResize()
    this.eventViewScroll()

    this.searchNoticeBoardList()
    this.searchEtcBoardList()
    this.searchEbookList()
    this.searchInfographicList()

    this.searchPopList()  // 팝업 리스트
  },

  destroyed() {
    window.removeEventListener('scroll', this.eventViewScroll)
    window.removeEventListener('resize', this.eventViewResize)
  },
  methods: {
    async searchPopList () {
      const popupList = await apiNotice.selectPopBoardList()
      
      let idx = 0;
      for(const popItem of popupList.data) {
        let widthIndex = popItem.boardDescription.indexOf('width: ') + 7
        let heightIndex = popItem.boardDescription.indexOf('height: ') + 8
        let wPxIndex = popItem.boardDescription.indexOf('px')
        let hPxIndex = popItem.boardDescription.indexOf('px', wPxIndex+1)
        let imgWidth = Number(popItem.boardDescription.substring(widthIndex, wPxIndex)) + 36
        let imgHeight = Number(popItem.boardDescription.substring(heightIndex, hPxIndex)) + 132
        
        if(imgWidth > 600){
          imgWidth = 600
        }

        if(imgHeight > 700){
          imgHeight = 700
        }

        const param = {
          tabComponent: () => import('../components/popup/MainPopup_new'),
          boardId: popItem.boardId,
          popList: popupList.data[idx],
          boardTitle: popItem.boardtitle,
          boardDescription: popItem.boardDescription,
          imgWidth: imgWidth,
          imgHeight: imgHeight
        }

        this.popList.push(param)
        idx ++
      }
    },

    eventViewResize() {
      if (window.innerWidth < 1200 || window.innerHeight < 800) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },

    eventViewScroll() {
      if (window.scrollY > 10) {
        this.isShowFocusMenuType = true
      } else {
        this.isShowFocusMenuType = false
      }
    },

    async keywordData(){
      // console.log(this.$store.getters.trendKeywords)
      // if(this.$store.getters.trendKeywords == ''){
      //   this.keywordDataList = []
      // }else{
      //   this.keywordDataList = this.$store.getters.trendKeywords[0].items
      // }

      const keywordData = await searchApi.selectSrchLang()
      if (keywordData.data.length > 0) {
        this.keywordDataList = keywordData.data
      }

    },

    changeMainPageIndex(pageIdx) {
      this.mainPageIndex = pageIdx
      if (pageIdx == 2) {
        this.isShowFocusMenuType = true
      } else {
        this.isShowFocusMenuType = false
      }
    },

    // 공지사항 데이터 조회
    async searchNoticeBoardList () {
      const paramData = {
        boardType: '000036',
        startPage: 0,
        endPage: 4
      }

      const boardData = await apiNotice.searchBoardList(paramData)
      this.noticeBoardDataList = boardData.data
    },

    // 자료실 데이터 조회
    async searchEtcBoardList () {
      const paramData = {
        boardType: '000035',
        startPage: 0,
        endPage: 4
      }

      const boardData = await apiNotice.searchBoardList(paramData)
      this.etcBoardDataList = boardData.data
    },

    // 인포그래픽 데이터 조회
    async searchInfographicList() {
      // 인포그래픽 데이터 파라미터 설정
      const paramData = {
        boardType: '000266',
        startPage: 0,
        endPage: 10
      }

      // 인포그래픽 데이터 조회
      const boardData = await apiInfographic.searchBoardList(paramData)
      if (boardData.data.length > 0) {
        this.infographicDataList = boardData.data
      }
    },

    // 전자책 데이터 조회
    async searchEbookList () {
      // 전자책 데이터 파라미터 설정
      const paramData = {
        sortGb: 'date',
        startPage: 0,
        endPage: 10
      }

      // 전자책 데이터 조회
      const boardData = await apiEbook.searchEbookList(paramData)
      if (boardData.data.length > 0) {
        this.ebookDataList = boardData.data
      }

      // 전자책 데이터 개수가 게시물 조회 개수보다 작으면 더보기 버튼 숨김
      if (boardData.data.length < this.boardCount) {
        this.isSearchData = false
      }
    }    
  }
}
</script>

<style>
@import '../assets/css/main.css';

#app { height: 100% }
#wrapper { height: 100%; }

</style>
