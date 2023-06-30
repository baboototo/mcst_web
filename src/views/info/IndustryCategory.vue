<template>
  <div>
    <div class="mdss-yy no-select">
      <div class="layout" style="padding:0 !important">
        <div class="swiper-wrapper" style="padding: 0;">
          <div class="swiper-slide on" style="width: 50%;">
            <a  href="javascript:;" @click="clickTab($event, 0, '광고산업분류')">광고 산업분류</a>
          </div>
          <div class="swiper-slide" style="width: 50%;">
            <a  href="javascript:;" @click="clickTab($event, 1, '문화예술산업분류')">문화예술 산업분류</a>
          </div>
        </div>
      </div>
    </div>
    <div class="layout" v-show="tabIndex === 0">
      <div class="introduce-wrap">
        <h2 class="title">광고산업분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag5.png" alt="광고산업분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">객관적이고 일관성 있는 광고산업 규모 추정을 위한 방안 마련</p>
            <div class="introduce-list-wrap">
              <ul class="introduce-list-box">
                <li>콘텐츠산업 특수분류내 광고분야 연계표를 기준으로 하지만, 광고 사업체간 중복 영역이 많고 통계 범위가 명확하지
                  <br>않아 모집단 대표성이 취약함</li>
                <li>광고산업분류를 저작권산업 특수분류와 같이 관련 분야의 파급효과를 위한 4단계 규모 추정을 위한 자체 분류 작성함
                  <br>(2015년)</li>
                <li>한국표준산업분류 제10차 개정(2017.07.01.) 내용에 맞춰 기존의 광고산업분류 연계표를 수정함 </li>
              </ul>
            </div>
            <p class="title-info-txt2">
              ※ 관련산업 통계생산을 위해 한국문화정보원에서 만든 분류체계로서, 공식적으로 제정된 분류는 아님
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000997')" title="xlsx다운로드">광고산업분류</button>
            </div>
          </div>
          <div class="introduce-list-wrap mobile">
            <ul class="introduce-list-box">
              <li>콘텐츠산업 특수분류내 광고분야 연계표를 기준으로 하지만, 광고 사업체간 중복 영역이 많고 통계 범위가 명확하지
                <br>않아 모집단 대표성이 취약함</li>
              <li>광고산업분류를 저작권산업 특수분류와 같이 관련 분야의 파급효과를 위한 4단계 규모 추정을 위한 자체 분류 작성함
                <br>(2015년)</li>
              <li>한국표준산업분류 제10차 개정(2017.07.01.) 내용에 맞춰 기존의 광고산업분류 연계표를 수정함 </li>
            </ul>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <p class="title-info-txt">OECD(콘텐츠미디어산업분류)와 UNESCO(2009 UNESCO Framework for Cultural Statistics)가 작성한 국제기준 중 광고분야를 참조하고 국내산업의 특성을 반영함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">광고산업의 제작 &middot; 인프라 &middot; 유통 &middot; 서비스의 가치사슬 활동에 기반한 포괄영역</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>광고산업분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">광고산업분류테이블</caption>
              <colgroup>
                <col style="width:275px;">
                <col>
              </colgroup>
              <thead>
              <tr>
                <th scope="col">포괄영역</th>
                <th scope="col">정의</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="text-align-center">핵심광고산업</td>
                <td class="text-align-left">광고제작, 광고기획, 광고대행 및 광고서비스 등 광고산업에 전적으로 종사하는 주요 산업</td>
              </tr>
              <tr>
                <td class="text-align-center">상호의존 광고산업</td>
                <td class="text-align-left">광고제작 장비산업, 관련 조사업체 등 광고산업을 활성화하는데 상호간에 유기적인 관계를 유지하는 산업</td>
              </tr>
              <tr>
                <td class="text-align-center">부분 광고산업</td>
                <td class="text-align-left">부분적으로 광고산업에 관여하며 경제적 기여도를 평가하기 위해 광고에 기인하는 요소만 발췌</td>
              </tr>
              <tr>
                <td class="text-align-center">광고 지원산업</td>
                <td class="text-align-left">광고산업의 요소를 가지고 있지만 부수적인 업무를 지원하는 산업 (핵심영역에 포함되지 않음)</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="layout" v-show="tabIndex === 1">
      <div class="introduce-wrap">
        <h2 class="title">문화예술산업분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag6.png" alt="문화예술산업분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">국민생활의 질적 성장에 대한 중요성이 높아지고, 문화예술산업의 정확한 시장 규모 추정에 대한 필요성 대두</p>
            <div class="introduce-list-wrap">
              <ul class="introduce-list-box">
                <li>문화예술산업에 대한 개념 및 포괄범위가 정립되지 않아 승인통계가 미흡함</li>
                <li>문화체육관광산업 특성을 반영한 별도의 문화예술산업분류 필요성이 증대함</li>
              </ul>
            </div>
            <p class="title-info-txt2">
              ※ 관련산업 통계생산을 위해 한국문화정보원에서 만든 분류체계로서, 공식적으로 제정된 분류는 아님
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000998')" title="xlsx다운로드">문화예술산업분류</button>
            </div>
          </div>
          <div class="introduce-list-wrap mobile">
            <ul class="introduce-list-box">
              <li>문화예술산업에 대한 개념 및 포괄범위가 정립되지 않아 승인통계가 미흡함</li>
              <li>문화체육관광산업 특성을 반영한 별도의 문화예술산업분류 필요성이 증대함</li>
            </ul>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <p class="title-info-txt">UNESCO(2009 UNESCO Framework for Cultural Statistics)가 작성한 국제기준을 토대로 국내 문화예술산업의 특성을 반영하여 작성함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">문화예술산업 순화주기(창작, 생산, 유통, 소비·참여)에 따른 제조업, 서비스업, 유통 및 임대업, 제공업을 기본으로 사회적 변화를 반영한 산업활동</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>문화예술산업분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">문화예술산업분류</caption>
              <colgroup>
                <col style="width:275px;">
                <col>
              </colgroup>
              <thead>
              <tr>
                <th scope="col">대분류</th>
                <th scope="col">중분류</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="text-align-center">문화 및 출판</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>번역 서비스업</li>
                      <li>출판 인쇄</li>
                    </ul>
                    <ul>
                      <li>문화제공업</li>
                      <li>출판유통업</li>
                    </ul>
                    <ul>
                      <li>출판업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-align-center">공연</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>연극 제공업</li>
                      <li>악기 유통업</li>
                      <li>음악 유통업</li>
                      <li>공연 기획 및 제작업</li>
                    </ul>
                    <ul>
                      <li>무용 제공업</li>
                      <li>음악 제작업</li>
                      <li>음악 제공업</li>
                      <li>공연의류 제조업</li>
                    </ul>
                    <ul>
                      <li>악기 제조업</li>
                      <li>음악 복제업</li>
                      <li>기타 공연 제공업</li>
                      <li>공연용품 유통업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-align-center">시각예술</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>미술용품 제조업</li>
                      <li>미술전문 서비스업</li>
                      <li>디자인 제공업</li>
                      <li>사진용품 유통업</li>
                      <li>공예품 유통업 </li>
                    </ul>
                    <ul>
                      <li>미술용품 유통업</li>
                      <li>미술 제공업</li>
                      <li>사진용품 제조업</li>
                      <li>사진 제공업</li>
                      <li>공예 제공업</li>
                    </ul>
                    <ul>
                      <li>미술품유통업</li>
                      <li>디자인업</li>
                      <li>사진 촬영 및 처리업</li>
                      <li>공예품 제조업</li>
                      <li>전시 서비스업 </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-align-center">문화유산 및 문화시설</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>사적지 운영업</li>
                      <li>공연시설 운영업</li>
                    </ul>
                    <ul>
                      <li>문예시설 운영업</li>
                      <li>전시시설 운영업</li>
                    </ul>
                    <ul>
                      <li>도시시설 운영업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: "IndustryCategory",
  data() {
    return {
      tabIndex: 0,
      tabNm: '광고산업분류'
    }
  },

  methods: {
    // 첨부파일 다운로드
    async fileDownload(fileMgmNo) {
      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'BOARD',
        fileMgmNo: fileMgmNo
      }

      // 파일 다운로드 호출
      await file.download(params)

      //파일 다운로드 로그
      const logParams = {
        downMenu: this.tabNm,
        downCntn: fileMgmNo
      }
      await staticApi.insertExcelDownLog(logParams)

    },

    clickTab(event, tabIndex, tabNm) {
      this.tabIndex = tabIndex
      this.tabNm = tabNm

      const tabMenu = document.getElementsByClassName('swiper-slide')
      tabMenu.forEach(obj => obj.classList.remove('on'))

      event.target.parentElement.classList.add('on')
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .mdss-yy .swiper-wrapper .swiper-slide{
    width:50% !important;
  }
  .no-select .swiper-wrapper{
    padding: 0px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .mdss-yy{
    height:auto;
  }
}
</style>
