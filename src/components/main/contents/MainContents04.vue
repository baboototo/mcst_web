<template>
  <div class="cd-section" id="section04">
    <div class="cd-section-inner">
      <div class="layout">
        <h2 class="section-titl04">
          <p>최근 발간된 전자책</p>
          <span>문화셈터의 최근 발간된 전자책을 제공합니다.</span>
          <router-link :to="{name: '전자책'}" class="more" >
            <img src="../../../assets/img/ico_more3.png" alt="더보기" title="더보기 바로가기">
          </router-link>
        </h2>
        <div class="ebook-section">
          <div class="ebook-wrap">
            <swiper class="swiper" :options="eBookSwiperOption" ref="eBookSwiper">
              <swiperSlide v-for="(ebookData, idx) in ebookDataList" :key="idx">
                <a href="javascript:;" :title="ebookData.name + ' 전자책 상세보기 새창열기'">
                  <img class="ebookImg" :src="changeUrl(ebookData.initpage)" :alt="ebookData.name" @click="openEbook(ebookData)" style="max-width: 100%; height: auto;">
                </a>
              </swiperSlide>
            </swiper>
          </div>
        </div>
      </div>
      <!----------------------------------- footer ----------------------------------->
      <Footer></Footer>
      <!----------------------------------- //footer ----------------------------------->
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Footer from "../../Footer";

export default {
  name: "MainContents04",
  components: {
    swiper,
    swiperSlide,
    Footer
  },
  props: {
    ebookDataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      eBookSwiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        pagination: {
          clickable: true
        },
      },
    }
  },
  methods: {
    openEbook(data) {
      const openUrl = 'https://ebook.culturestat.mcst.go.kr/src/viewer/main.php?host=main&category=0&page=0&pagenum=0&site=' + data.site
      window.open(openUrl, '_blank')
    },

    changeUrl(url) {
      return url.replace('http://', 'https://')
    }

  }

}
</script>

<style scoped>
.ebookImg {
  max-width: 100%;
  height: auto;
}
</style>
