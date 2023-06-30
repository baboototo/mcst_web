<template>
  <div class="cd-section" id="section03">
    <div class="cd-section-inner">

      <div class="layout">
        <div class="notice-section align-between">
          <h2 class="section-title02">
            <p>N O T I C E</p>
            <span>문화셈터의<br>소식을<br>알려드립니다.</span>
          </h2>
          <div class="notice-wrap align-start">
            <div class="notice-box">
              <div class="notice-head">
                <h3>공지사항</h3>
                <router-link :to="{name: '공지사항'}" class="more">
                  <img src="../../../assets/img/ico_more2.png" alt="더보기" title="더보기 바로가기">
                </router-link>
              </div>
              <ul class="notice-list">
                <li v-for="(noticeData, idx) in noticeBoardDataList" :key="idx">
                  <a href="javascript:;" @click="openNoticeBoard(noticeData)" title="바로가기">{{ noticeData.boardtitle }}</a>
                </li>
              </ul>
            </div>
            <div class="notice-box">
              <div class="notice-head">
                <h3>자료실</h3>
                <router-link :to="{name: '기타자료실'}" class="more">
                  <img src="../../../assets/img/ico_more2.png" alt="더보기"  title="더보기 바로가기">
                </router-link>
              </div>
              <ul class="notice-list">
                <li v-for="(etcData, idx) in etcBoardDataList" :key="idx">
                  <a href="javascript:;" @click="openEtcBoard(etcData)" title="바로가기">{{ etcData.boardtitle }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="infographic-section align-between top">
          <h2 class="section-title03">
            <p>그림으로보는<br>문화통계</p>
            <span>문화셈터의 인포그래픽을 제공합니다.</span>
            <router-link :to="{name: '인포그래픽'}" class="more">
              <img src="../../../assets/img/ico_more2.png" alt="더보기" title="더보기 바로가기">
            </router-link>
          </h2>
          <div class="infographi-wrap">
            <hr class="slide-bg">
            <swiper class="swiper" :options="infographicSwiperOption" ref="infographicSwiper">
              <swiperSlide v-for="(infographicData, idx) in infographicDataList" :key="idx">
                <a href="javascript:;" :title="infographicData.boardtitle + ' 상세보기 새창열기'">
                  <img class="infographicImg" :src="findInfographicImage(infographicData)" :alt="infographicData.boardtitle" @click="openInfographic(infographicData)">
                </a>
              </swiperSlide>
            </swiper>
            <div class="swiper-button-prev swiper-button" title="이전"></div>
            <div class="swiper-button-next swiper-button" title="다음"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import * as file from '@/api/common/file.js'

export default {
  name: "MainContents03",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    etcBoardDataList: {
      type: Array,
      default: () => []
    },
    noticeBoardDataList: {
      type: Array,
      default: () => []
    },
    infographicDataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      infographicSwiperOption: {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
          nextEl: '.infographic-section .swiper-button-next',
          prevEl: '.infographic-section .swiper-button-prev'
        }
      },
    }
  },
  methods: {
    // 공지사항 상세보기
    openNoticeBoard(noticeData) {
      const paramData = {
        target: '공지사항',
        boardId: noticeData.boardId,
        boardType: noticeData.boardType,
      }

      this.$router.push({ name: '공지사항 상세', query: paramData })
    },

    // 자료실 상세보기
    openEtcBoard(etcData) {
      const paramData = {
        target: '기타자료실',
        boardId: etcData.boardId,
        boardType: etcData.boardType,
      }

      this.$router.push({ name: '기타자료실 상세', query: paramData })
    },

    // 인포그래픽 이미지 찾기
    findInfographicImage(data) {
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
        return require('../../../assets/img/sample/info_sample01.png')
      }
      return require('../../../assets/img/sample/info_sample01.png')
    },

    // 인포그래픽 이미지 선택 시 PDF 파일 새창 열기
    openInfographic(linkData) {
      // const fileName = file.findFileName(linkData['descriptionUrl'])
      // const openUrl = process.env.VUE_APP_ADMIN_SERVER + '/resource/upload/notice/' + linkData.boardId + '/' + fileName
      // console.log(linkData.descriptionUrl)
      window.open(linkData.descriptionUrl, '_blank')
    },
  }
}
</script>

<style scoped>
.infographicImg {
  max-width: 100%;
  height: auto;
}
</style>
