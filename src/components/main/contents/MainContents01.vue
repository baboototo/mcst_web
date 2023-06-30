<template>
  <div class="cd-section" id="section01">
    <div class="cd-section-inner">
      <div class="layout align-between">
        <div class="left-box txt-box">
          <p class="kopubbatang">
            <span>문화, 체육, 관광</span> 분야의<br>
            다양하고 신뢰성 높은<br>
            <span>통계데이터</span> 제공 플랫폼
          </p>
          <div class="main-search-wrap">
            <div class="main-search">
              <label for="findNm2" class="ir">검색창</label>
              <input type="search" v-model="findNm" id="findNm2" placeholder="통계자료 검색 · 키워드를 입력해주세요." v-on:keyup.enter="goSearch()">
              <router-link :to="{name: '통합 검색', query: {searchFindNm: findNm} }" class="more">
                <button type="submit"><img src="../../../assets/img/ico_main_search.png" alt="검색하기" title="검색하기"></button>
              </router-link>
            </div>
            <div class="popular-search-terms align-start">
              <span>인기검색어</span>
              <div v-for="(data, idx) in keywordDataList" :key="idx">
                <router-link :to="{name: '통합 검색', query: {searchFindNm: data.srchLang} }" v-if="idx < 4" title="바로가기" >#{{data.srchLang}}</router-link>
              </div>
              <!-- <router-link :to="{name: '통합검색', query: {searchFindNm: data.srchLang} }" v-for="(data, idx) in keywordDataList" :key="idx" >#{{data.srchLang}}</router-link> -->
            </div>
          </div>
        </div>
        <div class="right-box">
          <swiper class="swiper" style="width: 100%; height: 100%;" :options="swiperOption">
            <!--            <swiper-slide>-->
            <!--              <div class="">-->
            <!--                <h2 class="right-title">주요지표 그래프</h2>-->
            <!--                <div class="graph-box01">-->
            <!--                  <div class="graph-title-h1">-->
            <!--                    <h3>소비자물가지수</h3>-->
            <!--                  </div>-->
            <!--                  <div class="graph-wrap align-around" style="width:100%;height:240px;">-->
            <!--                    <div class="graph-obj">-->
            <!--                      <div class="graph-title-h2">-->
            <!--                        <p>국내여행 참가 횟수</p>-->
            <!--                        <span>(단위 : 만회)</span>-->
            <!--                      </div>-->
            <!--                      <div class="graph-view">-->
            <!--                        <img src="../../../assets/img/sample_graphbox01.png" alt="">-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div class="graph-obj">-->
            <!--                      <div class="graph-title-h2">-->
            <!--                        <p>국내여행 총비용</p>-->
            <!--                        <span>(단위 : 억원)</span>-->
            <!--                      </div>-->
            <!--                      <div class="graph-view">-->
            <!--                        <img src="../../../assets/img/sample_graphbox02.png" alt="">-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div class="graph-obj">-->
            <!--                      <div class="graph-title-h2">-->
            <!--                        <p>국내여행 이동총량</p>-->
            <!--                        <span>(단위 : 만일)</span>-->
            <!--                      </div>-->
            <!--                      <div class="graph-view">-->
            <!--                        <img src="../../../assets/img/sample_graphbox03.png" alt="">-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div class="graph-box02 align-between top">-->
            <!--                  <div class="graph-title-h1">-->
            <!--                    <h3>소비자동향지수</h3>-->
            <!--                    <span>현황 [ 종합 CSI ]</span>-->
            <!--                  </div>-->
            <!--                  <div class="graph-wrap">-->
            <!--                    <div class="graph-view">-->
            <!--                      <img src="../../../assets/img/sample_graphbox04.png" alt="">-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </swiper-slide>-->
            <swiper-slide>
              <div class="">
                <div class="graph-view">
                  <img src="../../../assets/img/main/main_char_01.png" alt="
                    국민문화예술활동조사

                    문화예술행사 관람률 변화 추이 (단위: %)
                    2006년 65.8
                    2008년 67.3
                    2010년 67.2
                    2012년 69.6
                    2014년 71.3
                    2016년 78.3
                    2018년 81.5
                    2029년 81.8
                    2020년 60.5

                    분야별 문화예술행사 관람률 (단위: %)
                    문학행사 2018년 | 2019년 | 2020년
                    미술전시회 2018년 | 2019년 | 2020년
                    서양음악 2018년 | 2019년 | 2020년
                    전통예술 2018년 | 2019년 | 2020년
                    연극 2018년 | 2019년 | 2020년
                    뮤지컬 2018년 | 2019년 | 2020년
                    무용 2018년 | 2019년 | 2020년
                    영화 2018년 | 2019년 | 2020년
                    대중음악/연예 2018년 | 2019년 | 2020년
                  ">
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="">
                <div class="graph-view">
                  <img src="../../../assets/img/main/main_char_02.png" alt="
                    국민여행조사

                    여행지출액 총량 (단위:십억원)
                    전체 2018년-43,133 | 2019년-44,183 | 2020년-24,121
                    숙박 2018년-32,447 | 2019년-30,041 | 2020년-15,638
                    당일 2018년-10,686 | 2019년-14,142 | 2020년-8,483

                    국내여행 (단위:천회)
                    전체 2018년-311,153 | 2019년-334,750 | 2020년-225,199
                    숙박 2018년-163,204 | 2019년-162,376 | 2020년-88,450
                    당일 2018년-163,204 | 2019년-182,374 | 2020년-163,749
                  ">
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="">
                <div class="graph-view">
                  <img src="../../../assets/img/main/main_char_03.png" alt="
                    스포츠산업조사 2020 스포츠산업현황
                    사업체수 2017년-101,207 | 2018년-103,145 | 2019년-105,445
                    매출액 2017년-74,696 | 2018년-78,067년 | 2019년-80,684
                    종사자수 2017년-424 | 2018년-435 | 2019년-449

                    국민체력축정통계 30년전 대비 20대초반의 신장, 체중, 유연성변화
                    신장변화 (단위:cm)
                    남성 1989년-169.9 | 2019년-174.4
                    여성 1989년-157.9 | 2019년-162.7

                    체중변화 (단위:kg)
                    남성 1989년-62.4 | 2019년-73.2
                    여성 1989년-52.1 | 2019년-56.3

                    유연성변화 (단위:cm)
                    남성 1989년-16.4 | 2019년-9.3
                    여성 2089년-16.4 | 2019년-15.7
                  ">
                </div>
              </div>
            </swiper-slide>
            <div class="main-chart-swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "MainContents01",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    keywordDataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.main-chart-swiper-pagination',
          clickable: true
        }
      },
      findNm: ''
    }
  },
  methods: {
    goSearch(){
      const param = {
        searchFindNm : this.findNm
      }
      this.$router.push({name: '통합 검색', query: param})
    }
  },
}
</script>

<style scoped>
.main-chart-swiper-pagination {
  text-align: center;
}
</style>
