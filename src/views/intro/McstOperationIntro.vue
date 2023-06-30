<template>
  <div>
    <div class="layout">
      <div class="introduce-wrap">
        <h2 class="title text-align-center">문화체육관광 통계개발운영사업이란?</h2>
        <p class="title-info-txt text-align-center">
          문화체육관광부 통계관리규정(훈령 제269호)에 의거하여 한국문화관광연구원에서 문화체육관광부 통계 업무 지원 기관 역할을 수행하는 사업입니다. <br>
          문화체육관광부 각 부서의 소관 통계 작성 시 기술지원과, 통계조사에 관한 자료를 체계적으로 수집.분석.제공 등 종합관리하고 있으며, 문화체육관광 통계 중심기관으로서의 <br>
          역할 수행 및 통계협력체계 강화 등을 통해 중앙정부 및 지방자치단체, 대학교 및 연구기관, 관광사업자 등에게 유용한 문화관광통계 정보를 제공하고 있습니다.
        </p>
      </div>
    </div>
    <div class="img-list-box">
      <ul class="align-around">
        <li>
          문화체육관광 분류체계 개선 및 표본틀 구축, <br>
          통계품질경영시스템(ISO 9001) 인증 유지를<br>
          통한 통계 생산 기반 정립 및 품질 개선
        </li>
        <li>
          문화체육관광 관련 정책 수립을 위한 조사.<br>
          가공통계 생산 제공
        </li>
        <li>
          문화.체육.관광 국가승인통계 마이크로데이터<br>
          정합성 점검을 통한 데이터베이스 구축 및 제공<br>
          서비스 체계 마련
        </li>
        <li>
          통계 발전 학술회의 개최 등을 통한<br>
          문화.체육.관광 통계 활성화
        </li>
      </ul>
    </div>
    <div class="introduce-wrap history">
      <div class="layout">
        <h2 class="title">연혁</h2>
        <swiper class="history-slide" :options="swiperOption" ref="swiper">
          <swiperSlide>
            <div class="slide-box">
              <strong>2020</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>통계품질보증체계 구축
                  <ul>
                    <li>문화체육관광부 국가승인통계 품질 점검</li>
                    <li>정책기반 통계 ISO 9001 인증 유지</li>
                    <li>2020 문화체육관광 통계 발전 학술회의 개최</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발
                  <ul>
                    <li>문화체육관광 관련 정책 기반 통계 생산</li>
                    <li>빅데이터(카드, 통신, 공공데이터)를 활용한 통계 분석</li>
                  </ul>
                </li>
                <li>문화셈터 기능개선 및 서비스 고도화
                  <ul>
                    <li>빅데이터 기반 서비스 고도화</li>
                  </ul>
                </li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2019</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>통계품질보증체계 구축
                  <ul>
                    <li>문화체육관광부 국가승인통계 품질 점검</li>
                    <li>정책기반 통계 ISO 9001 인증 유지</li>
                    <li>2019 문화체육관광 통계 발전 컨퍼런스 개최</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발
                  <ul>
                    <li>문화체육관광 관련 정책 기반 통계 생산</li>
                    <li>빅데이터(카드, 통신, 공공데이터)를 활용한 통계 분석</li>
                  </ul>
                </li>
                <li>문화셈터 기능개선 및 서비스 고도화
                  <ul>
                    <li>빅데이터 기반 서비스 고도화</li>
                  </ul>
                </li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2018</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>
                  통계품질보증체계 구축
                  <ul>
                    <li>문화체육관광부 국가승인통계 품질 점검</li>
                    <li>정책기반 통계 ISO 9001 인증 갱신</li>
                    <li>문화통계발전포럼 2018 개최</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발</li>
                <li>
                  문화셈터 기능개선 및 서비스 확대
                  <ul>
                    <li>빅데이터 기반 서비스 확대</li>
                  </ul>
                </li>
                <li>국가승인통계 15종 통계 서비스 및 통계표 정비</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2017</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>통계품질보증체계 구축
                  <ul>
                    <li>문화체육관광부 국가승인통계 품질 점검</li>
                    <li>정책기반 통계 ISO 9001 인증 개정</li>
                    <li>문화통계발전포럼 2017 개최</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발</li>
                <li>문화셈터 기능개선 및 서비스 확대</li>
                <li>온라인조사시스템 확대 운영</li>
                <li>국가승인통계 11종 통계 서비스 및 통계표 정비</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2016</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>통계품질보증체계 구축
                  <ul>
                    <li>문화체육관광부 국가승인통계 품질 점검</li>
                    <li>국가통계관리 체계 개편’에 따른 통계관리 체계 조정 지원</li>
                    <li>통계품질 점검 방안 개선 및 승인통계 작성 지원</li>
                    <li>문화체육관광 정책기반 통계 품질경영시스템 인증 유지</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발</li>
                <li>빅데이터를 활용한 통계분석 및 활용체계 구축</li>
                <li>문화셈터 기능개선 및 운영</li>
                <li>국가승인통계 8종 작성 및 공표</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2015</strong>
              <ul>
                <li>통계조사 표본틀 갱신 및 활용</li>
                <li>통계품질보증체계 구축
                  <ul>
                    <li>정책기반 통계 품질경영 인증 획득(ISO 9001) 추진 및 사후관리</li>
                    <li>문화체육관광부 국가승인통계 품질 점검(11종)</li>
                    <li>국가승인통계 제안요청서 및 과업지시서 검토, 표본추출 지원</li>
                    <li>문화체육관광 통계담당자 실무협의회 및 통계워크숍 개최</li>
                    <li>문화통계발전포럼 2015 개최</li>
                  </ul>
                </li>
                <li>정책맞춤형 통계 생산 및 신규통계 개발</li>
                <li>빅데이터를 활용한 통계분석 및 활용체계 구축</li>
                <li>문화셈터 운영 및 서비스</li>
                <li>국가승인통계 9종 작성 및 공표</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2014</strong>
              <ul>
                <li>문화. 체육. 관광 분야 사업체 표본틀 갱신 및 표본추출 지원</li>
                <li>통계담당자용 개별 통계작성 절차서 개발/보급</li>
                <li>종합정책영역의 조사통계 생산</li>
                <li>행정자료 기반의 2차 가공통계 생산</li>
                <li>문화체육관광산업 동향조사 방안 연구</li>
			          <li>문화여가수준지표조사 방안 연구</li>
			          <li>문화체육관광 통계포털 기능개선 및 운영</li>
			          <li>온라인조사시스템을 이용한 설문조사 위탁 수행</li>
			          <li>통계담당자 품질교육 및 실무 협의회 개최</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2013</strong>
              <ul>
                <li>문화. 체육. 관광 분야 사업체 표본틀 갱신 및 표본추출 지원</li>
                <li>통계담당자용 개별 통계작성 절차서 개발/보급</li>
                <li>정책맞춤형 신규통계 개발</li>
                <li>문화분야에서의 빅데이터 활용방안 연구</li>
                <li>종합문화통계 생산을 위한 통계 연계방안 연구</li>
                <li>문화체육관광 통계포털 기능개선 및 운영</li>
                <li>온라인조사시스템을 이용한 설문조사 위탁 수행</li>
                <li>통계담당자 품질교육 및 실무 협의회 개최</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2012</strong>
              <ul>
                <li>문화. 체육. 관광 분야 사업체 표본틀 갱신</li>
                <li>통계담당자용 개별 통계작성 절차서 개발/보급</li>
                <li>정책맞춤형 신규통계 개발</li>
                <li>성과관리시행계획서상 고객만족도 조사 표준안 연구</li>
                <li>문화체육관광 통계포털 기능개선 및 운영</li>
                <li>통계담당자 품질교육 및 실무 협의회 개최</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2011</strong>
              <ul>
                <li>문화. 체육. 관광 분야 사업체 표본틀구축</li>
                <li>통계품질보증체계구축</li>
                <li>정책맞춤형 신규통계 개발</li>
                <li>문화체육관광 통계포털 기능개선 사업</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2010</strong>
              <ul>
                <li>문화체육관광통계 품질진단 및 컨설팅 사업</li>
                <li>예술사교육 실태 및 학부모인식조사</li>
                <li>관광·체육 전공자 취업현황 및 인식조사</li>
                <li>신규통계 개발 : 문화체육관광 경영실적 통계, 고용보험통계</li>
                <li>문화체육관광 통계리포트 발간</li>
                <li>문화체육관광 표준산업 특수분류 개선 연구</li>
                <li>문화체육관광 통계포털 시스템 3차 확대사업</li>
                <li>문화체육관광통계 현황 자료집 발간</li>
                <li>문화체육관광부 및 유관기관 통계담당자 교육</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2009</strong>
              <ul>
                <li>문화체육관광통계 중장기 발전방안 연구</li>
                <li>문화체육관광통계정보시스템 정보화 전략계획 수립</li>
                <li>문화예술분야 비승인통계 품질평가 및 개선사업</li>
                <li>문화체육관광 통계정보시스템 2차 확대사업</li>
                <li>문화체육관광통계 실태조사(현황 자료집 발간)</li>
                <li>문화체육관광부 및 유관기관 통계담당자 교육</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2008</strong>
              <ul>
                <li>문화체육관광 유사․중복 통계 연구</li>
                <li>문화체육관광통계 수요개발 연구</li>
                <li>문화체육관광 분야 통계작성 표준화 연구</li>
                <li>문화체육관광 통계포털시스템 확대사업</li>
              </ul>
            </div>
          </swiperSlide>
          <swiperSlide>
            <div class="slide-box">
              <strong>2007</strong>
              <ul>
                <li>통계포털 시스템 구축사업</li>
              </ul>
            </div>
          </swiperSlide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <div class="swiper-button-prev swiper-button"></div>
        <div class="swiper-button-next swiper-button"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "McstOperationIntro",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 9,
        slidesPerGroupSkip: 1,
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          2000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          }
        }
      },
      
    }
  }
}
</script>

<style scoped>

</style>
