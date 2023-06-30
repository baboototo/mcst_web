<template>
  <div>
    <div class="mdss-yy no-select">
      <div class="layout">
        <div class="swiper-wrapper" style="">
          <div class="swiper-slide on" style="width: 25%;">
            <a  href="javascript:;" @click="clickTab($event, 0, '저작권산업특수분류')">저작권 산업특수분류</a>
          </div>
          <div class="swiper-slide" style="width: 25%;">
            <a  href="javascript:;" @click="clickTab($event, 1, '콘텐츠산업특수분류')">콘텐츠 산업특수분류</a>
          </div>
          <div class="swiper-slide" style="width: 25%;">
            <a  href="javascript:;" @click="clickTab($event, 2, '관광산업특수분류')">관광 산업특수분류</a>
          </div>
          <div class="swiper-slide" style="width: 25%;">
            <a  href="javascript:;" @click="clickTab($event, 3, '스포츠산업특수분류')">스포츠 산업특수분류</a>
          </div>
        </div>
      </div>
    </div>
    <div class="layout" v-show="tabIndex === 0">
      <div class="introduce-wrap">
        <h2 class="title">저작권산업특수분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag1.png" alt="저작권산업특수분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">저작권산업의 범위 확대와 사회적 관심 증대에 따른 체계적인 저작권산업 통계 생산을 위해 작성</p>
            <div class="introduce-list-wrap">
              <ul class="introduce-list-box">
                <li>FTA 발효 등 저작권 산업의 경제적 중요성 및 통계생산의 필요성이 증대했으나, 통계기반체계가
                  <br>부재하여 2011년 저작권산업 특수분류를 제정함</li>
              </ul>
            </div>
            <p class="title-info-txt2">
              ※ 통계청의 통계분류포털 (http://kssc.kostat.go.kr)에서 분류표를 제공하고 있음
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-pdf default btn" @click.prevent="fileDownload('FILE-1000982')" title="pdf다운로드">저작권산업 특수분류 설명서</button>
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000983')" title="xlsx다운로드">저작권산업 특수분류</button>
            </div>
          </div>
          <div class="introduce-list-wrap mobile">
            <ul class="introduce-list-box">
              <li>FTA 발효 등 저작권 산업의 경제적 중요성 및 통계생산의 필요성이 증대했으나, 통계기반체계가
                <br>부재하여 2011년 저작권산업 특수분류를 제정함</li>
            </ul>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <p class="title-info-txt">WIPO(World Intellectual Property Organization)의 「저작권기반산업의 경제적기여도 조사 가이드」를 근거로 저작권산업의 정책수립에 필요한 분류체계를
            수립하기 위하여 작성함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">WIPO 저작권산업의 포괄범위를 참고하여 국내산업 실태에 맞게 포괄범위 설정함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>저작권산업 특수분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">저작권산업 특수분류</caption>
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
                <td>핵심저작권산업</td>
                <td class="text-align-left">작품 및 기타 보호대상물의 창작, 생산, 제조, 공연, 방송, 통신 및 전시, 혹은 유통 및 판매에 전적으로 종사하는 산업을 의미한다.<br><br>
                  <div class="align-between">
                    <ul>
                      <li>출판 및 문학</li>
                      <li>라디오, 텔레비젼</li>
                      <li>시각과 그래픽 아트</li>
                    </ul>
                    <ul>
                      <li>음악, 연극, 오페라</li>
                      <li>사진</li>
                      <li>광고 서비스</li>
                    </ul>
                    <ul>
                      <li>영화, 비디오</li>
                      <li>소프트웨어, 데이터베이스</li>
                      <li>저작권협회</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>상호의존저작권 산업</td>
                <td class="text-align-left">그 기능이 전적으로 혹은 주로 저작물의 창조 생산 및 사용을 가능하게 하는 기기의 생산, 제조, 판매에 종사하는 산업을 의미한다.</td>
              </tr>
              <tr>
                <td>부분저작권 산업</td>
                <td class="text-align-left">부분적으로 저작물의 창조, 생산, 제조, 수행, 방송, 통신과 전시 및 유통 판매에 관여하는 산업을 의미한다.</td>
              </tr>
              <tr>
                <td>저작권지원 산업</td>
                <td class="text-align-left">내부의 부분적인 활동이 저작권 및 관련물의 방송, 통신, 판매 및 유통에 기여하며 그 활동이 핵심저작권 산업에 해당하지 않는 산업을 의미한다.</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="layout" v-show="tabIndex === 1">
      <div class="introduce-wrap">
        <h2 class="title">콘텐츠산업특수분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag2.png" alt="콘텐츠산업특수분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">2008년 정부조직개편에 의해 문화부에서 콘텐츠산업 진흥정책을 일원화하기로 결정되어 해당 정책을 지원하기 위해 작성</p>
            <div class="introduce-list-wrap">
              <ul class="introduce-list-box">
                <li>콘텐츠산업의 제작·유통·서비스 환경의 급속한 변화를 고려하여 2010년 콘텐츠산업 특수분류를 제정했으며, 2012년
                  1차 개정됨</li>
              </ul>
            </div>
            <p class="title-info-txt2">
              ※ 통계청의 통계분류포털 (http://kssc.kostat.go.kr)에서 분류표를 제공하고 있음
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000985')"  title="xlsx다운로드">콘텐츠산업 특수분류</button>
            </div>
          </div>
          <div class="introduce-list-wrap mobile">
            <ul class="introduce-list-box">
              <li>콘텐츠산업의 제작·유통·서비스 환경의 급속한 변화를 고려하여 2010년 콘텐츠산업 특수분류를 제정했으며, 2012년
                1차 개정됨</li>
            </ul>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <p class="title-info-txt">OECD(콘텐츠미디어산업분류)와 UNESCO(2009 UNESCO Framework for Cultural Statistics)가 작성한 국제기준을 참조하고 국내산업의 특성을 반영하여 작성함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">음악, 영화·비디오, 애니메이션 산업, 방송 산업, 게임 산업, 공연 산업, 공예품 및 디자인업, 광고 산업, 정보서비스업, 지적재산권 관리업 등을 포함함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>콘텐츠산업 특수분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">콘텐츠산업 특수분류 테이블</caption>
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
                <td>출판산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>출판업</li>
                      <li>온라인 출판 유통업</li>
                    </ul>
                    <ul>
                      <li>인쇄업</li>
                      <li>출판 임대업</li>
                    </ul>
                    <ul>
                      <li>출판 도소매업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>만화산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>만화 출판업</li>
                      <li>만화 도소매업</li>
                    </ul>
                    <ul>
                      <li>온라인 만화 제작 유통업</li>
                    </ul>
                    <ul>
                      <li>만화책 임대업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>음악산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>음악제작업</li>
                      <li>음반 도소매업</li>
                      <li>노래연습장 운영업</li>
                    </ul>
                    <ul>
                      <li>음악 및 오디오물 출판업</li>
                      <li>온라인 음악 유통업</li>
                    </ul>
                    <ul>
                      <li>음반복제 및 배급업</li>
                      <li>음악 공연업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>영화산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>영화 제작, 지원, 및 유통업</li>
                    </ul>
                    <ul>
                      <li>DVD/VHS 제작 및 유통업</li>
                    </ul>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>게임산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>게임 제작 및 배급업</li>
                    </ul>
                    <ul>
                      <li>게임 유통업</li>
                    </ul>
                    <ul>
                      <li>게임 도소매 및 임대업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>애니메이션산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>애니메이션 제작업</li>
                    </ul>
                    <ul>
                      <li>애니메이션 유통 및 배급업</li>
                    </ul>
                    <ul>
                      <li>온라인 애니메이션 유통업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>방송산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>지상파 방송</li>
                      <li>방송채널사용사업</li>
                      <li>인터넷 영상물 제공업</li>
                    </ul>
                    <ul>
                      <li>유선방송</li>
                      <li>전광판방송</li>
                      <li>방송영상물 배급 및 중개업</li>
                    </ul>
                    <ul>
                      <li>위성방송</li>
                      <li>방송영상물제작업</li>
                      <li>방송관련 단체</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>광고산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>광고(종합)대행업</li>
                      <li>인쇄업</li>
                    </ul>
                    <ul>
                      <li>광고 제작업</li>
                      <li>온라인업</li>
                    </ul>
                    <ul>
                      <li>서비스업</li>
                      <li>기타업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>캐릭터산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>캐릭터 제작업</li>
                      <li>캐릭터 상품 온라인 유통업</li>
                    </ul>
                    <ul>
                      <li>캐릭터 상품 유통업</li>
                    </ul>
                    <ul>
                      <li>캐릭터 놀이시설 운영업</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>지식정보산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>e-learning업</li>
                      <li>가상세계 및 가상현실업</li>
                    </ul>
                    <ul style="width: 260px;">
                      <li>기타 데이터베이스 및 온라인정보 제공업</li>
                      <li>포털 및 기타 인터넷 정보 매개 서비스업</li>
                    </ul>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>콘텐츠솔루션산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>콘텐츠솔루션산업</li>
                    </ul>
                    <ul>
                      <li>컴퓨터그래픽스(CG)제작업</li>
                    </ul>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>공연산업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>공연업</li>
                    </ul>
                    <ul>
                      <li>공연관련 서비스업</li>
                    </ul>
                    <ul>
                      <li></li>
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
    <div class="layout" v-show="tabIndex === 2">
      <div class="introduce-wrap">
        <h2 class="title">관광산업특수분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag3.png" alt="관광산업특수분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">관광정책을 수립하기 위한 기초조사의 기준을 마련하기 위해 2000년 관광산업 특수분류가 제정되었으며, 2012년 3차 개정됨</p>
            <p class="title-info-txt2">
              ※ 통계청의 통계분류포털 (http://kssc.kostat.go.kr)에서 분류표를 제공하고 있음
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-pdf default btn" @click.prevent="fileDownload('FILE-1000980')" title="pdf다운로드">관광산업 특수분류 설명서</button>
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000981')" title="xlsx다운로드">관광산업 특수분류</button>
            </div>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <p class="title-info-txt">세계관광기구(WTO)와 유엔통계위원회가 공동 작성한 국제관광표준분류(Standard International Classification of Tourism Activities)를 기초로 국내산업의 특성을
            반영하여 작성함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">건설업, 자동차판매업, 운수업, 숙박 및 음식점업, 부동산 및 기계장비 임대업, 여행사 및 기타 여행 보조업 등을 포함</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>관광산업 특수분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">관광산업 특수분류 테이블</caption>
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
                <td>핵심 관광산업</td>
                <td class="text-align-left">전적으로 관광객에 의존하는 산업으로 주로 관광진흥법에서 규정한 관광산업을 포함한다.<br><br>
                  <div class="align-between">
                    <ul>
                      <li>관광 쇼핑업</li>
                      <li>관광 음식점 및 주점업</li>
                      <li>국제회의업</li>
                    </ul>
                    <ul>
                      <li>관광 운수업</li>
                      <li>여행사 및 여행보조 서비스업</li>
                      <li>문화 오락 및 레저 스포츠산업</li>
                    </ul>
                    <ul>
                      <li>관광 숙박업</li>
                      <li>카지노</li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>상호의 관광산업</td>
                <td class="text-align-left">원래 관광산업은 아니지만 핵심관광산업을 보조하기 위해 동반되는 산업으로 관광 건설업, 관광 및 레저용품 소매업, 관광 금융 및
                  보험업, 레저장비업을 포함한다.</td>
              </tr>
              <tr>
                <td>부분적용 관광산업</td>
                <td class="text-align-left">부분적으로 관광객에 의존하는 산업으로 관광 비인증 쇼핑업, 부분관광 운송업, 부분관광 숙박업, 부분관광 음식점 및 주점업, 부분관광 공연장업, 부분관광 기타 서비스업을 포함한다.</td>
              </tr>
              <tr>
                <td>관광 지원 산업</td>
                <td class="text-align-left">관광산업을 지원하기 위한 부문으로 관광관련 관광 연구 개발업, 관광 공공기관, 관광 교육서비스업, 관광단체를 포함</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="layout" v-show="tabIndex === 3">
      <div class="introduce-wrap">
        <h2 class="title">스포츠산업특수분류</h2>
        <div class="img-txt-box">
          <div class="img-box">
            <img src="../../assets/img/img_cmag4.png" alt="스포츠산업특수분류">
          </div>
          <div class="txt-box">
            <h3>목적 및 배경</h3>
            <p class="title-info-txt">건강한 신체와 정신을 기르고 여가를 선용하는 국민 건강증진 산업이 증대됨에 따라 스포츠 관련 산업의 통계작성 및 구조분석을<br>
              할 수 있는 기본틀을 제공하기 위해 2000년 스포츠산업 특수분류가 제정되었으며, 2012년 3차 개정됨</p>
            <p class="title-info-txt2">
              ※ 통계청의 통계분류포털 (http://kssc.kostat.go.kr)에서 분류표를 제공하고 있음
            </p>
            <div class="introduce-down-wrap">
              <button type="button" class="introduce-down-pdf default btn" @click.prevent="fileDownload('FILE-1000995')" title="pad다운로드">스포츠산업 특수분류 설명서</button>
              <button type="button" class="introduce-down-xlsx default btn" @click.prevent="fileDownload('FILE-1000996')" title="xlsx다운로드">스포츠산업 특수분류</button>
            </div>
          </div>
        </div>
        <div class="introduce-wrap type02">
          <h3>근거</h3>
          <ul class="introduce-list-box" style="padding: 10px 0 24px 16px;">
            <li>"국민체육진흥법"에 따른 체육활동을 지원하는 제조업, 건설업, 관련 서비스업과 스포츠서비스를 제공하기 위해서 재화와 서비스를 생산 유통하는 산업</li>
            <li>"체육시설의 설치·이용에 관한 법률"에 따른 체육시설업</li>
            <li>국제표준산업분류(ISIC Rev.4.0)와 중앙생산물분류(CPC2.0)의 스포츠관련 산업 및 생산물을 바탕으로 작성</li>
          </ul>
        </div>
        <div class="introduce-wrap type02">
          <h3>포괄범위</h3>
          <p class="title-info-txt">체육활동을 지원하는 제조업, 건설업, 유통업, 관련 서비스업</p>
        </div>
        <div class="introduce-wrap type02">
          <h3>스포츠산업 특수분류</h3>
          <div class="introduce-table-wrap">
            <table class="introduce-table" style="width:1200px;">
              <caption class="ir">스포츠산업 특수분류테이블</caption>
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
                <td>스포츠 시설업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>스포츠시설 운영업</li>
                    </ul>
                    <ul>
                      <li>스포츠시설 건설업</li>
                    </ul>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>스포츠 용품업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>운동 및 경기용품업</li>
                    </ul>
                    <ul>
                      <li>운동 및 경기용품 유통 및 임대업</li>
                    </ul>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>스포츠 서비스업</td>
                <td class="text-align-left">
                  <div class="align-between">
                    <ul>
                      <li>스포츠 경기 서비스업</li>
                      <li>스포츠 교육기관</li>
                    </ul>
                    <ul>
                      <li>스포츠 정보 서비스업</li>
                      <li>기타 스포츠 서비스업</li>
                    </ul>
                    <ul>
                      <li></li>
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
      tabNm: '저작권산업특수분류'
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
.mdss-yy .swiper-wrapper {
  padding: 0;
}
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
