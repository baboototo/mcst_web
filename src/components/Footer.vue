<template>
  <footer id="footer">
    <div class="footer-top">
      <div class="layout align-between">
        <div class="footer-util align-around">
          <router-link :to="{name: '개인정보처리방침'}" title="새창으로" class="pipc-btn">개인정보처리방침</router-link>
          <router-link :to="{name: '저작권정책'}" title="새창으로">저작권정책</router-link>
          <a href="mailto:jlkim@kcti.re.kr?subject=한국문화관광연구원(문화체육관광부) 문화셈터 문의" title="새창으로">ContactUs</a>
        </div>
        <div class="family" id="selBtn" style="display: none">
          <a href="javascript:;" class="btn" id="selText">문화 / 통계 관련사이트</a>
          <ul style="display: none;">
            <li><a href="https://www.mcst.go.kr/" target="_blank" title="문화체육관광부 새창열림">문화체육관광부</a></li>
            <li><a href="https://www.kcti.re.kr/" target="_blank" title="한국문화관광연구원 새창열림">한국문화관광연구원</a></li>
            <li><a href="https://www.kocca.kr/" target="_blank" title="한국콘텐츠진흥원 새창열림">한국콘텐츠진흥원</a></li>
            <li><a href="https://kosis.kr/" target="_blank" title="국가통계포털 새창열림">국가통계포털</a></li>
            <li><a href="https://www.culture.go.kr/" target="_blank" title="문화포털 새창열림">문화포털</a></li>
            <li><a href="https://www.tour.go.kr/" target="_blank" title="관광지식정보시스템 새창열림">관광지식정보시스템</a></li>
            <li><a href="https://adstat.kobaco.co.kr/" target="_blank" title="광고산업통계정보시스템 새창열림">광고산업통계정보시스템</a></li>
            <li><a href="https://www.sports.re.kr/front/main/main.do" target="_blank" title="한국스포츠개발원 새창열림">한국스포츠개발원</a></li>
            <li><a href="https://policydb.kcti.re.kr/main.do" target="_blank" title="문화예술지식정보시스템 새창열림">문화예술지식정보시스템</a></li>
            <li><a href="https://www.libsta.go.kr/" target="_blank" title="국가도서관통계시스템 새창열림">국가도서관통계시스템</a></li>
            <li><a href="https://www.index.go.kr/" target="_blank" title="e 나라지표 새창열림">e 나라지표</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="layout align-between">
        <address>
          <h1 id="footerLogo">
            <img src="../assets/img/footer_logo.png" alt="문화셈터">
          </h1>
          우)07511 서울특별시 강서구 금낭화로 154 한국문화관광연구원<br>
          대표전화 02)2669-8957 / FAX 02)2669-6900<br>
          Copyright(c) 문화체육관광부, All Rights Reserved.
        </address>
        <div class="certification">
          <a href="https://www.mcst.go.kr/kor/main.jsp" target="_blank"><img src="../assets/img/logo_mcst.png" alt="문화체육관광부" title="새창으로"></a>
          <a href="https://www.kcopa.or.kr/lay1/S1T356C360/contents.do" target="_blank"><img src="../assets/img/copyright_ok_2.png" alt="저작권안심" width="80" title="새창으로"></a>
          <img src="../assets/img/certification_mark.jpg" alt="공공누리 공공저작물 자유이용허락">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {
  }
}
</script>

<style>
</style>
