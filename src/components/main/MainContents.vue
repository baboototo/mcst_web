<template>
    <swiper class="swiper" style="width: 100%; height: 100%;" :options="mainSwiperOption" @slideChange="changeMainSwiperPage" ref="mainSwiper">
      <swiper-slide>
        <MainContents01 :keywordDataList="keywordDataList"></MainContents01>
      </swiper-slide>
      <swiper-slide>
        <MainContents02></MainContents02>
      </swiper-slide>
      <swiper-slide>
        <MainContents03 :etcBoardDataList="etcBoardDataList" :noticeBoardDataList="noticeBoardDataList" :infographicDataList="infographicDataList"></MainContents03>
      </swiper-slide>
      <swiper-slide>
        <MainContents04 :ebookDataList="ebookDataList"></MainContents04>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import MainContents01 from "./contents/MainContents01"
import MainContents02 from "./contents/MainContents02"
import MainContents03 from "./contents/MainContents03"
import MainContents04 from "./contents/MainContents04"

export default {
  name: 'MainContents',
  components: {
    swiper,
    swiperSlide,
    MainContents01,
    MainContents02,
    MainContents03,
    MainContents04
  },
  props: {
    statBoardDataList: {
      type: Array,
      default: () => []
    },
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
    ebookDataList: {
      type: Array,
      default: () => []
    },
    keywordDataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      mainSwiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        speed: 800,
        allowTouchMove: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
    }
  },

  methods: {
    changeMainSwiperPage() {
      this.$emit("changeMainPageIndex", this.$refs.mainSwiper.swiper.activeIndex)
    },
  }
}
</script>


<style scoped>
</style>
