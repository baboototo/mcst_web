<template>
  <div id="subject01">
    <div class="layout">
      <!-- <h2 class="title">{{ this.statName }}</h2> -->
      <div class="title-select-wrap">
        <button type="button" class="title" ref="subMenuTitle" @click="eventClickSubMenu($event.target)">{{ this.statName }}</button>
        <div ref="subMenuItem">
          <ul class="subGnb-depth03 title-menu">
            <li v-for="(data,idx) in subMenuItems" v-bind:key="idx">
              <a href="javascript:;" @click="eventClickSubMenuItem(data.mgmNo, data.title)">{{ data.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 공통 탭 -->
      <ul class="tab-btn-list align-start">
        <li :class="{on: commonTabs === 0 || commonTabs === 4 || commonTabs === 5 || commonTabs === 6 || commonTabs === 7}">
          <a href="#/" class="tab" @click="goList()">통계표</a>
        </li>
        <li :class="{on: commonTabs === 1}" v-show="isEbookShow"><a href="#/" class="tab" @click="goEbookList()">전자책</a></li>
        <li :class="{on: commonTabs === 2}" v-show="isMdssShow"><a href="#/" class="tab" @click="goMdssList()">MDSS</a></li>
        <li :class="{on: commonTabs === 3}"><a href="#/" class="tab" @click="goMetaInfo()">메타정보</a></li>
      </ul>

      <!-- 통계표 목록 상단 바 -->
      <div class="stat-type-wrap" v-show="commonTabs != 1 && commonTabs != 2 && commonTabs != 3">
        <div class="stat-type-head align-end type02">
          <button type="button" class="default btn" @click="goList()">목록보기</button>
          <div class="stat-search-box">
            <label class="ir" for="searchKeyword">검색창</label>
            <input type="search" v-model="searchText" v-on:keyup.enter="searchKeyword" id="searchKeyword">
            <button type="submit" @click="searchKeyword">검색</button>
          </div>
          <button type="button"  class="default btn mt5" @click="showKeywordSearch()">명칭검색</button>
          <button type="button"  class="default btn mt5" @click="showDetailSearch()">상세검색</button>
        </div>
        <div class="stat-type-header">
          <h3>통계표</h3>
        </div>

        <!-- 통계표 목록 -->
        <ul class="stat-type-list align-start" v-show="commonTabs === 0">
          <li :class="{lastDepth01: depthClass == 1}">
            <ul class="stat-depth02">
              <li v-for="(data, idx) in statisticsListData" v-bind:key="idx" :class="{on : selected1DepthMenu === data.menuId, result: data.lowerLevelYn === null}">
                <a href="#" @click.prevent="searchDepthStatistics(data.menuId, data.uppermenuId, data.lowerLevelYn, data.spotfireFolder, 1, data.title)">{{ data.title }}</a>
              </li>
            </ul>
          </li>
          <li v-show="depth2Yn" :class="{lastDepth02: depthClass == 2}">
            <ul class="stat-depth02">
              <li v-for="(data, idx) in static2depthListData" v-bind:key="idx" :class="{on : selected2DepthMenu === data.menuId, result: data.lowerLevelYn === null}" >
                <a href="#" @click.prevent="searchDepthStatistics(data.menuId, data.uppermenuId, data.lowerLevelYn, data.spotfireFolder, 2, data.title)">{{ data.title }}</a>
              </li>
            </ul>
          </li>
          <li v-show="depth3Yn" :class="{lastDepth03: depthClass == 3}">
            <ul class="stat-depth02">
              <li v-for="(data, idx) in static3depthListData" v-bind:key="idx" :class="{on : selected3DepthMenu === data.menuId, result: data.lowerLevelYn === null}" >
                <a href="#" @click.prevent="searchDepthStatistics(data.menuId, data.uppermenuId, data.lowerLevelYn, data.spotfireFolder, 3, data.title)">{{ data.title }}</a>
              </li>
            </ul>
          </li>
          <li v-show="depth4Yn" :class="{lastDepth04: depthClass == 4}">
            <ul class="stat-depth02">
              <li v-for="(data, idx) in static4depthListData" v-bind:key="idx" :class="{on : selected4DepthMenu === data.menuId, result: data.lowerLevelYn === null}">
                <a href="#" @click.prevent="searchDepthStatistics(data.menuId, data.uppermenuId, data.lowerLevelYn, data.spotfireFolder, 4, data.title)">{{ data.title }}</a>
              </li>
            </ul>
          </li>
        </ul>

        <!-- 통계표 상세보기 -->
        <div v-show="commonTabs === 4">
          <div class="stat-type-content-inner">
            <swiper class="swiper" :options="swiperOption">
              <swiperSlide v-for="(tab, index) in tabs" v-bind:key="index" :class="{on: currentTab === index}">
                <a href="#/" v-on:click="currentTab = index">{{tabs[tabs.length - index - 1].title}}</a>
                <button type="button" class="tab-close" @click="removeTab(tabs[tabs.length - index - 1], index)">닫기</button>
              </swiperSlide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>

          </div>
          <div class="align-between stat-option" v-for="(tab, index) in tabs" v-bind:key="index" v-show="currentTab === index">
            <h4 class="btn-area-title">{{ tabs[tabs.length - index - 1].tblKorNm}}</h4>
            <div class="btn-layout right">
              <span class="btn-inner-unit">( 단위 : {{ tabs[tabs.length - index - 1].msrUnitNm}} )</span>
              <button type="button" class="default btn" style="display:none;" title="다운로드">다운로드</button>
              <button type="button" class="default btn" @click="showBasicInfo(tabs[tabs.length - index - 1].menuId)"
                      v-show="tabs[tabs.length - index - 1].menuId != 'STBL-1028174'" title="기본정보">기본정보</button>
              <button type="button" class="default btn" @click="showManual()" title="사용법">사용법</button>
              <button type="button" class="default btn" @click="showPivotTable(tabs[tabs.length - index - 1].menuId)"
                      v-show="tabs[tabs.length - index - 1].menuId != 'STBL-1028174'" title="피벗테이블">피벗테이블</button>
              <button type="button" class="default btn" :class="{no: tabs[tabs.length - index - 1].cmmtDesc === null}"
                      @click="showComment(tabs[tabs.length - index - 1].cmmtDesc)"
                      v-show="tabs[tabs.length - index - 1].menuId != 'STBL-1028174'" title="주석">주석</button>
              <button type="button" class="default btn icon-zoom" @click="clickZoom($event)" title="크게보기">zoom</button>
            </div>
          </div>
          <div class="stat-content-area">
            <div id="spotfireViewFrm" v-for="(tab, index) in tabs" v-bind:key="index" v-show="(tabs.length - currentTab - 1) === index">
              <iframe title="통계표" id="spotfireFrame" :src="tab.url" frameborder="0" style="width: 100%; height: 675px;"></iframe>
            </div>
          </div>
        </div>

        <!-- 통계표 키워드 검색 결과-->
        <div class="search-result" v-show="commonTabs === 5">
          <span class="total">검색결과 <span class="num">{{ totalKeywordCnt }}</span>건</span>
          <ul class="search-result-list">
            <li v-for="(data, idx) in statisticsKeywordData" v-bind:key="idx">
              <a href="#/" @click="staticDetail(data.tblMgmNo)">
                <div class="title-address">
                  <strong class="result-title">{{ data.tblKorNm }}</strong>
                  <div class="address">
                    <span>{{ data.upPath }}</span>
                  </div>
                </div>
                <div class="result-date" v-if="data.termList[0] != null">
                  <p>{{ data.termList[0].startMonth }}<i>&nbsp;~&nbsp;</i>{{ data.termList[0].endMonth }}</p>
                  <!-- <p>최종입력일자<i>&nbsp;|&nbsp;</i>{{ data.termList[0].endRegDate }}</p> -->
                </div>
              </a>
            </li>
          </ul>
          <div class="btn-layout center" v-if="isSearchData">
            <button type="button" class="line btn" @click="statisticsKeywordList">더보기</button>
          </div>
        </div>

        <!-- 명칭검색 -->
        <div class="search-result-wrap" v-show="commonTabs === 6">
          <div class="consonant-list align-center">
            <button type="button" :class="{on: initialText === 'ㄱ'}" @click="searchInitial('ㄱ')">ㄱ</button>
            <button type="button" :class="{on: initialText === 'ㄴ'}" @click="searchInitial('ㄴ')">ㄴ</button>
            <button type="button" :class="{on: initialText === 'ㄷ'}" @click="searchInitial('ㄷ')">ㄷ</button>
            <button type="button" :class="{on: initialText === 'ㄹ'}" @click="searchInitial('ㄹ')">ㄹ</button>
            <button type="button" :class="{on: initialText === 'ㅁ'}" @click="searchInitial('ㅁ')">ㅁ</button>
            <button type="button" :class="{on: initialText === 'ㅂ'}" @click="searchInitial('ㅂ')">ㅂ</button>
            <button type="button" :class="{on: initialText === 'ㅅ'}" @click="searchInitial('ㅅ')">ㅅ</button>
            <button type="button" :class="{on: initialText === 'ㅇ'}" @click="searchInitial('ㅇ')">ㅇ</button>
            <button type="button" :class="{on: initialText === 'ㅈ'}" @click="searchInitial('ㅈ')">ㅈ</button>
            <button type="button" :class="{on: initialText === 'ㅊ'}" @click="searchInitial('ㅊ')">ㅊ</button>
            <button type="button" :class="{on: initialText === 'ㅋ'}" @click="searchInitial('ㅋ')">ㅋ</button>
            <button type="button" :class="{on: initialText === 'ㅌ'}" @click="searchInitial('ㅌ')">ㅌ</button>
            <button type="button" :class="{on: initialText === 'ㅍ'}" @click="searchInitial('ㅍ')">ㅍ</button>
            <button type="button" :class="{on: initialText === 'ㅎ'}" @click="searchInitial('ㅎ')">ㅎ</button>
            <button type="button" :class="{on: initialText === '기타'}" @click="searchInitial('기타')">기타</button>
          </div>
          <div class="search-result">
            <span class="total">검색결과 <span class="num">{{ totalInitialCnt }}</span>건</span>
            <ul class="search-result-list">
              <li v-for="(data, idx) in staticsInitialData" v-bind:key="idx">
                <a href="#/" @click="staticDetail(data.tblMgmNo)">
                  <div class="title-address">
                    <strong class="result-title">{{ data.tblKorNm }}</strong>
                    <div class="address">
                      <span>{{ data.upPath }}</span>
                    </div>
                  </div>
                  <div class="result-date" v-if="data.termList[0] != null">
                    <p>{{ data.termList[0].startMonth }}<i>&nbsp;~&nbsp;</i>{{ data.termList[0].endMonth }}</p>
                    <!-- <p>최종입력일자<i>&nbsp;|&nbsp;</i>{{ data.termList[0].endRegDate }}</p> -->
                  </div>
                </a>
              </li>
            </ul>
            <div class="btn-layout center" v-if="isInitialSearchData">
              <button type="button" class="line btn" @click="statisticsInitialList">더보기</button>
            </div>
          </div>
        </div>

        <!-- 상세검색 -->
        <div v-show="commonTabs === 7">
          <SearchDetail ref="searchDetail" :statId="statId"/>
        </div>

      </div>

      <!-- 메타정보 -->
      <div v-show="commonTabs === 3">
        <MetaInfo :metaInfoList="statMetaInfoList" />
      </div>
    </div>

    <!-- 전자책 -->
    <div v-show="commonTabs === 1">
      <div class="layout">
        <div class="search-wrap align-end line">
          <div class="search-box">
            <label class="ir" for="sortGubun">검색조건</label>
              <select v-model="sortGubun" id="sortGubun">
                <option value="date">최신순</option>
                <option value="visit">조회순</option>
                <option value="title">제목순</option>
              </select>

            <!-- <select v-model="classCode">
                <option value="">전체</option>
                <option v-for="(data, idx) in selectCodeList" v-bind:key="idx" :value="data.code">{{ data.name }}</option>
            </select> -->
            <label for="ebookSearchText" class="ir">검색창</label>
            <input type="search" @keyup.enter="searchTextBoardList(true)" v-model="ebookSearchText" id="ebookSearchText">
            <button type="submit" @click="searchTextBoardList(true)">검색</button>
          </div>
        </div>
        <div class="infographic-list">
          <ul class="infographic-list-inner align-between">
            <li v-for="(data, idx) in ebookDataList" v-bind:key="idx">
              <div class="info-img">
                <img :src="changeUrl(data.initpage)" @click="openEbook(data)" title="새창열기" :alt="data.name">
              </div>
              <div class="info-cnt">
                <p class="info-title" style="word-break: break-all;">{{data.name}}</p>
                <span class="info-date type02">
                  <span>{{data.nowPage}} 페이지</span>
                  <span>조회수 : {{data.visit | visitComma}}</span>
                  <span>{{data.dates}}</span>
                </span>
                <button type="button" @click="fileDownload(data)">다운로드</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="btn-layout center" v-if="ebookSearchData">
          <button type="button" class="info-more-btn" @click="searchEbookList">더보기</button>
        </div>
      </div>
    </div>

    <!-- MDSS -->
    <div v-show="commonTabs === 2">
      <div class="mdss-yy">
        <div class="layout" style="position:relative;">
          <label for="upAnlClsId" class="ir">카테고리</label>
          <select name="upAnlClsId" id="upAnlClsId" v-model="upAnlClsId" @change="selectMdssYearList(false)">
            <option :value="data.anlClsId" v-for="(data, idx) in mdssNaviList" v-bind:key="idx">{{ data.anlClsNm }}</option>
          </select>
          <swiper class="swiper" :options="swiperMdssOption">
            <swiperSlide v-for="(data, idx) in mdssYearList" v-bind:key="idx" :class="{on: anlClsId === data.anlClsId}">
              <a href="#/" @click="createMdssList(data.anlClsId)">{{ data.anlClsNm }}</a>
            </swiperSlide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>

        </div>
      </div>

      <div class="layout">
        <div class="mdss-down align-end">
          <div class="chk-box" v-for="(data, idx) in mdssFileList" v-bind:key="idx">
            <input type="checkbox" id="chk01" v-if="data.fileType === '01'" :value="{fileSeq: data.fileSeqNo, fileType: data.fileType, fileNm: data.fileNm}" v-model="mdssChkFileData">
            <label for="chk01" class="type01" v-if="data.fileType === '01'">
              <img src="../../assets/img/ico_mdss_type01.png" alt="항목정의서 아이콘">
              {{ data.cdNm}}
            </label>

            <input type="checkbox" id="chk02" v-if="data.fileType === '02'" :value="{fileSeq: data.fileSeqNo, fileType: data.fileType, filePathNm: data.filePathNm, fileSize: data.fileSize, fileNm: data.fileNm}" v-model="mdssChkFileData">
            <label for="chk02" class="type02" v-if="data.fileType === '02'">
              <img src="../../assets/img/ico_mdss_type02.png" alt="데이터파일 아이콘">
              {{ data.cdNm }}
            </label>
          </div>

          <!-- <div class="chk-box">
            <input type="checkbox" id="chk03">
            <label for="chk03" class="type03">
                <img src="../../assets/img/ico_mdss_type03.png" alt="조사표 파일 아이콘">
                조사표 파일
            </label>
          </div> -->
          <a href="#modal1" id="downOpenBtn" class="mdss btn md_open_btn" @click="mdssFileDownEvent">
            파일다운로드
            <img src="../../assets/img/ico_mdss_down.png" alt="파일다운로드 아이콘">
          </a>
          <a href="#/" class="mdss btn" @click="mdssRqstEvent" title="팝업창열기">
            <img src="../../assets/img/ico_mdss_record.png" alt="이력보기 아이콘">
            이력보기
          </a>
        </div>
        <div class="mdss-grid" v-show="rqstMstShow === 0">
          <div class="stat-type-head align-end">
            <div class="stat-search-box2">
              <label for="mdssSearchText" class="ir">검색창</label>
              <input type="search" v-model="mdssSearchText" v-on:keyup.enter="searchMdssItmList" id="mdssSearchText">
              <button type="submit" @click="searchMdssItmList">검색</button>
            </div>
            <button type="button" class="puple btn" @click="mdssSelectMdssDown">선택항목 다운로드</button>
            <a href="#modal2" id="condCd" class="ir">condCd</a>
            <a href="#modal3" id="condSet" class="ir">condSet</a>
            <a href="#modal4" id="resultInfo" class="ir">resultInfo</a>
            <a href="#modal5" id="resultDetail" class="ir">resultDetail</a>
            <a href="#modal6" id="showComments" class="ir">showComments</a>
            <a href="#modal7" id="showBasicInfo" class="ir">showBasicInfo</a>
            <a href="#modal8" id="showManual" class="ir">showManual</a>
          </div>
          <div class="mdss-table-wrap">
            <table class="mdss-table">
              <caption class="ir">mdss테이블</caption>
              <colgroup>
                <col style="width:10%;">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:calc(70% - 220px)">
                <col style="width:110px;">
                <col style="width:110px;">
              </colgroup>
              <thead>
              <tr style="width:calc(100% - 70px);">
                <th scope="col" style="width:10%;">
                  <div class="tbl-checkbox-box">
                    <input type="checkbox" id="chk_01" v-model="allSelected" @change="selectAll">
                    <i></i>
                    <label for="chk_01">선택</label>
                  </div>
                </th>
                <th scope="col" style="width:10%">번호</th>
                <th scope="col" style="width:10%">형태</th>
                <th scope="col" style="width:calc(70% - 220px)">항목</th>
                <th scope="col" style="width:110px;">조건설정</th>
                <th scope="col" style="width:110px;">조건삭제</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(data, idx) in mdssList" v-bind:key="idx">
                  <td :data-th="idx+1">
                    <div class="tbl-checkbox-box">
                      <input type="checkbox" :id="'chk'+idx" v-model="checkMdssItm" :value="data.rownum" @change="checkConfirm($event)">
                      <i></i>
                      <label :for="'chk'+idx">선택</label>
                    </div>
                  </td>
                  <td>{{ data.rownum }}</td>
                  <td data-th="형태">{{ data.cdNm }}</td>
                  <td data-th="항목" class="text-align-left">
                    <div class="entry-txt">{{ data.itmNm }}</div>
                    <input type="hidden" :id="data.rownum"
                      :value="data.itmId+'@'+data.dspOrdNo+'@'+data.n1stConVal+'@'+data.n1stConCd+'@'+data.cnctConCd+'@'+data.n2ndConCd+'@'+data.n2ndConVal"></td>
                  <td style="display:none;"></td>
                  <td class="btn-td"><button type="button" class="tbl-btn" @click="setCon(data.itmId, data.cdNm, idx)" title="팝업창열기">입력</button></td>
                  <td class="btn-td"><button type="button" class="tbl-btn" @click="deleteCond(idx)">삭제</button></td>
                </tr>
                <tr v-if="mdssList == '' ">
                  <td colspan="6">조회된 데이터가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <MdssRqstMst :rqstMstetting="mdssRqstMstSetting()" v-show="rqstMstShow === 1"/>
      </div>
    </div>


    <!-- MDSS 요청서 작성 모달창 -->
    <div class="modal_cnt" id="modal1" style="display:none;">
      <div class="modal-header">
        <h2>요청서 작성</h2>
        <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../../assets/img/popup_close.png" alt="닫기"></a>
      </div>
      <div class="modal-content">
        <div v-show="agreement00">
          <div class="select-box">
            <div class="radio-box">
              <label for="radio_chk01" style="margin-right:30px;">학술연구용</label>
              <input type="radio" id="radio_chk01" name="radio_chk" v-model="rqstGb" value="01">
            </div>
            <div class="radio-box">
              <label for="radio_chk02" style="margin-right:30px;">배포게시용</label>
              <input type="radio" id="radio_chk02" name="radio_chk" v-model="rqstGb" value="02">
            </div>
          </div>
          <div class="btn-layout center">
            <button type="button" class="next-btn" @click.prevent="agreement00Next">다음</button>
            <button type="button" class="close-btn" @click.prevent="closeModal">취소</button>
          </div>
        </div>
        <div class="agreement_page01" v-show="agreement01">
          <div class="txt-wrap">
            <div class="part">
              <strong>한국문화관광연구원 귀중</strong>
              <p>
                한국문화관광연구원은 귀하로부터 취득한 다음의 개인정보는 '개인정보보호법' 제15조의 1에 의거
                수집 또는 이용 시 본인의 동의를 얻어야 하는 정보인바, 본인은 본 데이터의 이용과 관련하여 본인의
                개인정보를 수집,활용하는데 동의합니다.
              </p>
            </div>
            <div class="part">
              <strong>1. 개인정보 수집 목적</strong>
              <p class="indent">
                - 한국문화관광연구원는 데이터 다운로드시 수집되는 개인정보를 바탕으로 데이터를 사용하시는
                목적 및 이용현황을 파악하고자합니다.
              </p>
              <p class="indent">
                - 또한 주 이용 고객을 대상으로 향후 문화셈터 이용 만족도 조사등 개선방안을 모색하고자 합니다.
              </p>
            </div>
            <div class="part">
              <strong>2. 수집되는 개인정보의 항목</strong>
              <p>- 이메일</p>
            </div>
            <div class="part">
              <strong>3. 개인정보의 보유 및 이용기간</strong>
              <p>
                - 신청자의 개인정보는 한국문화관광연구원에서 1년간 보유합니다.
              </p>
            </div>
          </div>
          <div class="select-box">
            <div class="radio-box">
              <input type="radio" id="radio_chk03" name="radio_chk" v-model="agreeYn" value="Y">
              <label for="radio_chk03">동의합니다.</label>
            </div>
            <div class="radio-box">
              <input type="radio" id="radio_chk04" name="radio_chk" v-model="agreeYn" value="N">
              <label for="radio_chk04">동의하지않습니다.</label>
            </div>
          </div>
          <div class="btn-layout center">
            <button type="button" class="next-btn" @click.prevent="agreementNext">다음</button>
            <button type="button" class="close-btn" @click.prevent="closeModal">취소</button>
          </div>
        </div>
        <!-- 다음누르면 -->
        <div class="agreement_page02" v-show="agreement02" style="display:table;width:100%;">
          <dl class="align-start popup-table" >
            <dt><span style="color:red;">*</span> 통계명</dt>
            <dd>{{ this.anlClsNm}}</dd>
          </dl>
          <dl class="align-start popup-table" v-if="rqstGb === '02'">
            <dt><label for="systemNm"><span style="color:red;">*</span> 게시시스템명</label></dt>
            <dd>
              <input type="text" ref="systemNm" v-model="systemNm" id="systemNm">
            </dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'"><label for="orgNm"><span style="color:red;">*</span> 기관명</label></dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="orgNm" v-model="orgNm" id="orgNm"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'">
              <label for="name"><span style="color:red;">*</span> 담당자명</label>
            </dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="name" v-model="name" id="name"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'"><label for="phoneNo"><span style="color:red;">*</span> 연락처</label></dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="phoneNo" v-model="phoneNo" id="phoneNo"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt>
              <label for="email"><span style="color:red;">*</span> 이메일</label>
            </dt>
            <dd><input type="text" ref="email" v-model="email" id="email"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '01'"><span style="color:red;">*</span> 사용목적</dt>
            <dt v-if="rqstGb === '02'"><span style="color:red;">*</span> 게시목적</dt>
            <dd><label for="usePurpose" class="ir">usePurpose</label><input type="text" ref="usePurpose" id="usePurpose" v-model="usePurpose"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt>
              <label for="rqstPw"><span style="color:red;">*</span> 비밀번호(숫자4자리)</label>
            </dt>
            <dd><input type="password" ref="rqstPw" v-model="rqstPw" id="rqstPw" maxlength="4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></dd>
          </dl>
        </div>
        <p class="guide-txt" v-show="agreement02"><span style="color: red">*</span> 는 필수 입력항목입니다.</p>
        <div class="btn-layout center" v-show="agreement02">
          <button type="button" class="next-btn" @click.prevent="agreeMdssDownload">다운로드(추출요청)</button>
          <button type="button" class="close-btn" @click.prevent="closeModal">취소</button>
        </div>
      </div>
    </div>

    <MdssCondModal :modalSettings="condSetting()"/>
    <MdssCondSetModal :modalConsetSettings="condSetSetting()"/>
    <MdssRqstModal />
    <MdssResultDetailModal :modalMdssResultSettings="mdssResultDetailSetting()"/>

    <!-- 모달 : 주석 -->
    <div class="modal_cnt" id="modal6" style="display:none;">
      <div class="modal-header">
        <h2>주석</h2>
        <a href="#" class="close_btn"><img src="../../assets/img/popup_close.png" alt="닫기" @click.prevent="closeModal"></a>
      </div>
      <div class="modal-content">
        <p class="remark" v-html="cmmtDesc"></p>
      </div>
    </div>

    <!-- 모달 : 기본정보 -->
    <div class="modal_cnt" id="modal7" style="display:none;">
      <div class="modal-header">
        <h2>기본정보</h2>
        <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../../assets/img/popup_close.png" alt="닫기"></a>
      </div>
      <div class="modal-content">
        <div class="agreement_page02" v-if="staticBasicData != ''" style="display:table;width:100%;">
          <dl class="align-start popup-table">
            <dt style="text-align:center;">통계표명</dt>
            <dd>{{ staticBasicData.tblKorNm }}</dd>
          </dl>
          <dl class="align-start popup-table">
            <dt style="text-align:center;">목록</dt>
            <dd>{{ staticBasicData.pathNm }}</dd>
          </dl>
          <dl class="align-start popup-table">
            <dt style="text-align:center;">조사명</dt>
            <dd>{{ staticBasicData.statKorNm }}</dd>
          </dl>
          <dl class="align-start popup-table">
            <dt style="text-align:center;">입력연도</dt>
            <dd>{{ staticBasicData.tblYearMonth }}</dd>
          </dl>
          <!-- <dt style="text-align:center;">표두항목</dt>
          <dd></dd>
          <dt style="text-align:center;">표측항목</dt>
          <dd></dd> -->
        </div>

      </div>
    </div>

    <!-- 모달 : 사용법 -->
    <div class="modal_cnt" id="modal8" style="display:none;" :style=imgManualSize>
      <div class="modal-header">
        <h2>사용법</h2>
        <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../../assets/img/popup_close.png" alt="닫기"></a>
      </div>
      <div class="modal-content" style="max-height:550px; overflow:auto;">
        <img :src=imgManualNm width="100%" alt="사용법">
      </div>
    </div>



  </div>

</template>

<script>
import * as api from '@/api/Statistics.js'
import * as file from '@/api/common/file.js'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import $ from 'jquery'
import * as ebookApi from '@/api/Ebook.js'
import MetaInfo from "../../components/MetaInfo";
import MdssCondModal from '@/components/MdssCondModal'
import MdssCondSetModal from '@/components/MdssCondSetModal'
import MdssRqstModal from '@/components/MdssRqstModal'
import MdssRqstMst from '@/components/MdssRqstMst'
import MdssResultDetailModal from '@/components/MdssResultDetailModal'
import SearchDetail from '@/components/SearchDetail'

export default {
  name: "Subject01",
  components: {
    swiper,
    swiperSlide,
    MetaInfo,
    MdssCondModal,
    MdssCondSetModal,
    MdssRqstModal,
    MdssRqstMst,
    MdssResultDetailModal,
    SearchDetail
  },

  props: {
    subItemId: {
      type: String,
      default: ''
    },
    subItemNm: {
      type: String,
      default: ''
    },
  },

  data () {
    return {
      // upTblMgmNo: 'STBL-1014265',
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 9,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      swiperMdssOption: {
        slidesPerView: 8,
        spaceBetween: 0,
        slidesOffsetBefore : 173,
        slidesOffsetAfter : 60,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      statId: this.subItemId,
      statName: this.subItemNm,
      subMenuItems : [],
      subMenuMgmNo: '',
      prevSubMenuMgmNo: true,
      statisticsListData: [],
      static2depthListData: [],
      static3depthListData: [],
      static4depthListData: [],
      depth2Yn: false,
      depth3Yn: false,
      depth4Yn: false,
      selected1DepthMenu: '',
      selected2DepthMenu: '',
      selected3DepthMenu: '',
      selected4DepthMenu: '',
      cmmtDesc: '',
      staticBasicData: [],
      searchText: '',
      statisticsKeywordData: [],  // 키워드검색 데이터
      boardCount: 10,
      boardPageIndex: 0,
      boardStartPage: 0,
      boardEndPage: 0,
      totalKeywordCnt: 0,
      isSearchData: true,
      commonTabs: 0,  // 공통탭 숫자로 제어 (0:통계표, 1:전자책, 2:MDSS, 3:메타정보, 4:통계표상세보기, 5:키워드검색, 6:명칭검색, 7:상세검색)
      tabs: [], // 통계표 상세탭
      currentTab: 0,  // 통계표 상세탭 제어
      depthClass: 0, // 통계표 목록 마지막 뎁스 확인 (2: 2레벨, 3: 3레벨, 4: 4레벨)
      //명칭검색 데이터
      initialText: 'ㄱ',
      staticsInitialData: [],
      totalInitialCnt: 0,
      initialCount: 10,
      initialPageIndex: 0,
      initialStartPage: 0,
      initialEndPage: 0,
      isInitialSearchData: true,
      //상세검색 데이터
      
      //전자책 데이터
      isEbookShow: true,
      sortGubun: 'date',
      classCode: '',
      ebookSearchText: '',
      ebookCount: 6,
      ebookPageIndex: 0,
      ebookStartPage: 0,
      ebookEndPage: 0,
      selectCodeList: [],
      ebookDataList: [],
      ebookSearchData: true,
      //MDSS 데이터
      isMdssShow: true,
      upAnlClsId: '',
      mdssNaviList: [], //초기 selectbox list
      mdssNaviCnt: 0,
      mdssYearList: [], //연도 탭 list
      mdssList: [], //mdss list
      mdssListCnt: 0,
      anlClsId: '',
      mdssFileList: [],
      mdssChkFileData: [],
      mdssCreTme: '',
      mdssSearchText: '',
      $modalCnt: '',
      agreement00: true,
      agreement01: false,
      agreement02: false,
      agreeYn: '',
      rqstGb: '',
      systemNm: '',
      anlClsNm: '',
      email:'',
      usePurpose: '',
      rqstPw: '',
      phoneNo: '',
      name: '',
      orgNm:'',
      ettCmlptFlg: 'N',
      zipFileFlg: 'N',
      checkMdssItm: [], //mdss 항목 선택
      itmId: '',
      conCdList: [],
      checkItm: [],
      checkCondIdx: 0,
      grpCdList: [],
      grpCdNm:'',
      allChecked: false,
      mdssRqstMstList: [],
      mdssResultDetail: [],
      mdssRequestDetail: [],
      rqstMstShow : 0,
      statMetaInfoList: [],    //메타정보
      allSelected: false,
      selected: [],
      imgManualNm: require('../../assets/img/sub_manual.png'),
      imgManualSize: 'width:1000px'

    }
  },

  watch: {
    $route(to, from){
      if(to.path.substr(0, 18) == from.path.substr(0,18)){
        this.prevSubMenuMgmNo = true
      }else{
        this.prevSubMenuMgmNo = false
      }
    },

    subItemId: function() {
      this.initViewParameterValidation(this.subItemId)
    },

  },

  // directives: {
  //   'click-outside' : {
  //     bind: function(el, binding, vnode){
  //       el.eventClickOutside = function(event){
  //         if(!(el == event.target || el.contains(event.target))){
  //           if(!(el == event.target.nextSibling)){
  //             $(".select-box-btn").next().removeClass("on")
  //           }
  //         }
  //       }
  //       document.body.addEventListener('click', el.eventClickOutside)
  //     },

  //     unbind: function(el){
  //       document.body.removeEventListener('click', el.eventClickOutside)
  //     }
  //   }
  // },

  created () {
    this.initViewParameterValidation(this.statId)
    this.findSubMenuItems(this.$route.meta.subMenuItemMgmNo)
    window.addEventListener('resize', this.manualResize)
    this.manualResize()
  },

  // 전자책 조회수 콤마
  filters: {
    visitComma: function (value) {
      var num = new Number(value);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },

  methods: {

    // 사용법 이미지 resize
    manualResize(){
      if (window.innerWidth <= 768) { // 모바일
        this.imgManualNm = require('../../assets/img/sub_manual_m.png')
        this.imgManualSize = ''
      } else if(window.innerWidth > 768 && window.innerWidth <= 1024) { // 태블릿
        this.imgManualNm = require('../../assets/img/sub_manual_t.png')
        this.imgManualSize = ''
      } else{ // PC
        this.imgManualNm = require('../../assets/img/sub_manual.png')
        this.imgManualSize = 'width:1000px'
      }
      this.centerPosition()
    },

    findSubMenuItems(statId) {
      const subMenuItem = this.$store.getters.findSubMenu(statId)
      if (subMenuItem) {
        this.subMenuItems = subMenuItem.items
      }
      return this.subMenuItems
    },

    eventClickSubMenuItem(subItemId, subItemNm) {
      this.eventClickSubMenu(this.$refs.subMenuTitle)

      const params = {
        subItemId: subItemId,
        subItemNm: subItemNm
      }
      this.$router.push( {name: this.$route.name, params: params} )
    },

    eventClickSubMenu(target) {
      if (target) {
        const subMenuItemDiv = target.nextElementSibling
        if(subMenuItemDiv && subMenuItemDiv.children) {

          const subMenuItemUl = subMenuItemDiv.querySelector('.subGnb-depth03');
          if (subMenuItemUl.style.display === 'block') {
            $(subMenuItemDiv.children[0]).stop().slideUp()
          } else {
            $(subMenuItemDiv.children[0]).stop().slideDown()
          }
        }
      }
    },

    // 주제별통계 통계표 ID 확인
    initViewParameterValidation(statId) {
      let prevGubun = true
      if(!this.prevSubMenuMgmNo){
        prevGubun = false
      }

      if (this.$route.meta.subMenuItemMgmNo === statId) {
        const firstSubMenuItem = this.$store.getters.findSubMenu(statId)
        if (firstSubMenuItem) {
          const subMenuItem = firstSubMenuItem.items[0]
          this.statName = subMenuItem.title
          this.setStaticsListInfo(subMenuItem.mgmNo, prevGubun)
        }
      } else {
        let isSubMenuItem = false;
        const subMenuItems = this.$store.getters.findSubMenu(this.$route.meta.subMenuItemMgmNo)
        if (subMenuItems){
          for (const subMenuItem of subMenuItems.items) {
            if (subMenuItem.mgmNo === statId) {
              this.statName = subMenuItem.title
              isSubMenuItem = true
            }
          }
        }
        if (isSubMenuItem) {
          this.findSubMenuItems(this.$route.meta.subMenuItemMgmNo)
          this.setStaticsListInfo(this.subItemId, prevGubun)
        }
      }
    },

    // 통계표 페이지 초기 세팅 (서브메뉴 이동 시)
    async setStaticsListInfo(statId, prevGubun) {
      this.statId = statId
      if(!prevGubun){ // 같은 서브메뉴가 아닐 땐 탭 초기화
        this.tabs = []
      }
      this.statisticsList(this.statId)  // 통계표 목록 세팅
      this.selectMetaInfoList(this.statId)  // 메타정보 세팅
      this.selectMdssNaviList() // MDSS 세팅
      this.commonTabs = 0 // 통계표 목록으로 돌아오기
      this.searchInitial('ㄱ') // 명칭검색 초기화 및 세팅
      // 키워드 검색 초기화
      this.searchText = ''
      this.totalKeywordCnt = 0
      // 전자책 초기화 및 세팅
      this.searchTextBoardList(false)
      this.ebookSearchText = ''
      this.sortGubun = 'date'
      // 상세검색 초기화 및 세팅
      await this.$nextTick()      
      this.$refs.searchDetail.searchDetail(false)
      this.$refs.searchDetail.tblKorNmString = ''
      this.$refs.searchDetail.itmKorNmString = ''
      this.$refs.searchDetail.yearString = ''
      this.$refs.searchDetail.totalDetailCnt = 0
      this.$refs.searchDetail.checkYearList = []
      
    },


    // 통계표 목록 세팅
    async statisticsList (tblMgmNo) {
      const paramData = {
        tblMgmNo: tblMgmNo
      }

      const statisticsData = await api.statisticsList(paramData)
      this.statisticsListData = statisticsData.data
      this.depthClass = 1
      this.depth2Yn = false
      this.depth3Yn = false
      this.depth4Yn = false
    },

    // 메타정보 세팅
    async selectMetaInfoList(mgmNo){
      const params = {
        mgmNo: mgmNo
      }

      const metaData = await api.metaInfoList(params)
      this.statMetaInfoList = metaData.data
    },

    // 검색버튼 클릭 시 (키워드 검색)
    searchKeyword() {
      this.boardPageIndex = 0
      this.boardStartPage = 0
      this.boardEndPage = 0
      this.statisticsKeywordData = []
      this.isSearchData = true
      this.commonTabs = 5
      this.statisticsKeywordList()
    },

    // 키워드 검색
    async statisticsKeywordList () {
      this.boardPageIndex = this.boardPageIndex + 1
      this.boardStartPage = ((this.boardPageIndex - 1) * this.boardCount) + 1
      this.boardEndPage = this.boardPageIndex * this.boardCount

      const paramData = {
        searchText: this.searchText,
        levelId2: this.statId,
        startPage: this.boardStartPage,
        endPage: this.boardEndPage
      }

      const staticData = await api.statisticsKeywordList(paramData)

      if (staticData.data.length > 0) {
        staticData.data.forEach(data => this.statisticsKeywordData.push(data))
      }

      if (staticData.data.length < this.boardCount) {
        this.isSearchData = false
      }

      this.totalKeywordCnt = staticData.cnt
    },

    // 명칭검색 내 글자 버튼 클릭 시
    searchInitial(initialText) {
      this.initialPageIndex = 0
      this.initialStartPage = 0
      this.initialEndPage = 0
      this.staticsInitialData = []
      this.isInitialSearchData = true
      this.initialText = initialText
      this.statisticsInitialList()
    },

    // 명칭검색
    async statisticsInitialList(){
      this.initialPageIndex = this.initialPageIndex + 1
      this.initialStartPage = ((this.initialPageIndex - 1) * this.initialCount) + 1
      this.initialEndPage = this.initialPageIndex * this.initialCount

      const paramData = {
        initialText: this.initialText,
        levelId2: this.statId,
        startPage: this.initialStartPage,
        endPage: this.initialEndPage
      }

      const statisticsInitialList = await api.statisticsInitialList(paramData)

      if (statisticsInitialList.data.length > 0) {
        statisticsInitialList.data.forEach(data => this.staticsInitialData.push(data))
      }

      if (statisticsInitialList.data.length < this.initialCount) {
        this.isInitialSearchData = false
      }

      this.totalInitialCnt = statisticsInitialList.cnt

    },

    



    // 통계표 클릭시
    async searchDepthStatistics(menuId, uppermenuId, lowerLevelYn, spotfireFolder, depth, title) {
      // console.log(menuId, uppermenuId, lowerLevelYn, spotfireFolder, depth)
      const paramData = {
        tblMgmNo: menuId
      }

      if(depth == 1 && lowerLevelYn == 'Y'){  // 1depth이고 하위메뉴 있을 때
        const statisticsData = await api.statisticsList(paramData)
        this.static2depthListData = statisticsData.data
        this.depthClass = 0
        if(this.static2depthListData.length > 0){
          for(let i = 0 ; i < this.static2depthListData.length ; i++){
            if(this.static2depthListData[i].lowerLevelYn === null) this.depthClass = 2
          }
        }
        this.selected1DepthMenu = menuId
        this.selected2DepthMenu = ''
        this.selected3DepthMenu = ''
        this.selected4DepthMenu = ''
        this.depth2Yn = true
        this.depth3Yn = false
        this.depth4Yn = false

      }else if(depth == 2 && lowerLevelYn == 'Y'){  // 2depth이고 하위메뉴 있을 때
        const statisticsData = await api.statisticsList(paramData)
        this.static3depthListData = statisticsData.data
        this.depthClass = 0
        if(this.static3depthListData.length > 0){
          for(let i = 0 ; i < this.static3depthListData.length ; i++){
            if(this.static3depthListData[i].lowerLevelYn === null) this.depthClass = 3
          }
        }
        this.selected2DepthMenu = menuId
        this.selected3DepthMenu = ''
        this.selected4DepthMenu = ''
        this.depth3Yn = true
        this.depth4Yn = false

      }else if(depth == 3 && lowerLevelYn == 'Y'){  // 3depth이고 하위메뉴 있을 때
        const statisticsData = await api.statisticsList(paramData)
        this.static4depthListData = statisticsData.data
        this.depthClass = 0
        if(this.static4depthListData.length > 0){
          for(let i = 0 ; i < this.static4depthListData.length ; i++){
            if(this.static4depthListData[i].lowerLevelYn === null) this.depthClass = 4
          }
        }
        this.selected3DepthMenu = menuId
        this.selected4DepthMenu = ''
        this.depth4Yn = true
      }

      // if(depth == 1 && (lowerLevelYn == 'N' || lowerLevelYn == null)){
      //   this.depthClass = 1

      // }

      // 통계표 상세보기
      if(lowerLevelYn == 'N' || lowerLevelYn == null){  // 마지막 depth일 때

        if(depth == 1) this.selected1DepthMenu = menuId
        else if(depth === 2) this.selected2DepthMenu = menuId
        else if(depth === 3) this.selected3DepthMenu = menuId
        else if(depth === 4) this.selected4DepthMenu = menuId

        let haveTab = false; // 탭이 존재하는지 확인
        let selectTab = 0

        for (const stat of this.tabs) {
          selectTab = selectTab + 1

          if (stat.menuId === menuId) {
            haveTab = true
            this.currentTab = this.tabs.length - selectTab
            break
          }
        }

        if(!haveTab){ // 통계표 탭 생성
          const params = {  // 통계표 상세조회 param
            tblMgmNo: menuId
          }
          const staticInfoData = await api.stblInfoList(params)

          let url = ''

          if(menuId === 'STBL-1028174'){  //주요관광지점 입장객 통계
            url = 'https://vstat.culturestat.mcst.go.kr/spotfire/wp/ViewAnalysis.aspx?file=/REPORT/STBL-1014278/STBL-1028174_NEW'
          }else{
            url = process.env.VUE_APP_SPOTFIRE_SUBJECT_URL + staticInfoData.data.rowCnt + "_" + staticInfoData.data.colCnt + '_NEW&configurationBlock=tblMgmNo=%22'+ menuId +'%22;'
          }

          const stat = {  // 탭 param
            title: title,
            menuId: menuId,
            tblKorNm: staticInfoData.data.tblKorNm,
            msrUnitNm: staticInfoData.data.msrUnitNm,
            cmmtDesc: staticInfoData.data.cmmtDesc,
            url: url
          }

          // console.log(staticInfoData.data.cmmtDesc)

          if(this.tabs.length > 4){
            alert('통계표는 5개까지 열 수 있습니다.')
            return false
          }

          this.$set(this.tabs, this.tabs.length, stat)

          const logParam = {
            stblMgmNo: menuId
          }
          await api.insertAccessLog(logParam) // 통계표 로그 쌓기
          this.currentTab = 0
        }

        this.commonTabs = 4
      }
    },

    // 통계탭 제거하기
    removeTab(removeStat, tabIndex) {
      let changeStatTabIndex = tabIndex

      for (let idx = 0; idx < this.tabs.length; idx++) {
        if (this.tabs[idx].menuId === removeStat.menuId) {
          if (tabIndex === idx) {
            changeStatTabIndex = idx - 1
          }

          // this.tabs.splice(idx, 1)
          this.$delete(this.tabs, idx)

          if(this.tabs.length === 0){ // 팁을 다 닫으면 통계표 목록으로 돌아가기
            this.commonTabs = 0
          }else{
            if(this.currentTab == tabIndex){ //선택된 탭을 닫을 때 동작
              if(tabIndex == 0){
                this.currentTab = 0
              }else{
                this.currentTab = tabIndex - 1
              }
            }else if(this.currentTab > tabIndex){
              this.currentTab = tabIndex
            }
          }
          break
        }
      }

      if (changeStatTabIndex < 1) {
        this.currentTab = 0
      }
    },

    // 통계표 주석
    showComment(cmmtDesc){
      this.cmmtDesc = cmmtDesc
      if(cmmtDesc != null){
        this.$nextTick(function(){
          this.setModal($('#showComments'))
        })
      }
    },

    // 통계표 기본정보
    async showBasicInfo(menuId){
      const param = {
        tblMgmNo: menuId
      }
      const basicData = await api.selectBasicInfo(param)
      this.staticBasicData = basicData.data

      this.$nextTick(function(){
        this.setModal($('#showBasicInfo'))
      })

    },

    showManual(){
      this.$nextTick(function(){
        this.setModal($('#showManual'))
      })
    },

    // 통계표 피벗테이블 - 기존 팝업창 그대로 사용
    showPivotTable(tblMgmNo){
      window.open("https://stat.mcst.go.kr/mcst/WebPortal/public/subject/pivotSubject.html?tblMgmNo="+tblMgmNo, "_blank")
    },

    // 통계표 크게보기
    clickZoom(event) {
      $(event.target).toggleClass("on");
      $(event.target).parent().parent().siblings().find('.icon-zoom').toggleClass("on");
      $("body").toggleClass("zoom");
      if(!$("body").hasClass("zoom")){
        $('html, body').animate({scrollTop:"200"});
      }
    },


    // mdss 초기 selectbox 세팅
    async selectMdssNaviList () {
      this.isMdssShow = true

      const idParam = {
        tblMgmNo: this.statId
      }

      const getIdData = await api.selectMdssUpAnlClsId(idParam)

      if(getIdData.data == null){
        this.isMdssShow = false
      }else{
        const paramData = {
          upAnlClsId: getIdData.data
        }

        const mdssNaviListData = await api.selectMdssNavi(paramData)
        this.mdssNaviList = mdssNaviListData.data
        this.mdssNaviCnt = mdssNaviListData.data.length
        this.upAnlClsId = mdssNaviListData.data[0].anlClsId

        this.selectMdssYearList(true)
      }

    },

    // mdss 초기 년도 탭 세팅
    async selectMdssYearList(selectGubun) {
      const paramData = {
        upAnlClsId: this.upAnlClsId
      }

      this.mdssChkFileData = [] // 파일다운로드 데이터 초기화

      const mdssNaviListData = await api.selectMdssNavi(paramData)
      this.mdssYearList = mdssNaviListData.data
      const anlClsId = mdssNaviListData.data[0].anlClsId

      let anlClsNm = ''

      if(selectGubun){
        anlClsNm = this.statName + '(' + this.mdssNaviList[0].anlClsNm + ')'
      }else{
        anlClsNm = this.statName + '(' + $("#upAnlClsId option:selected").text() + ')'
      }

      this.anlClsNm = anlClsNm

      this.createMdssList(anlClsId)
    },

    //mdss 년도 탬 클릭시
    async createMdssList(anlClsId){
      const params = {
        anlClsId: anlClsId
      }

      this.mdssChkFileData = [] // 파일다운로드 데이터 초기화
      this.mdssSearchText = ''  // mdss 항목 검색창 초기화
      this.checkMdssItm = []  // 선택된 항목 초기화
      this.allSelected = false

      this.anlClsId = anlClsId

      const data = await api.selectMdssItmList(params)
      if(data.data.length > 0){
        this.mdssList = data.data
        this.mdssCreTme = data.data[0].creTme
      }else{
        this.mdssList = ''
      }

      const fileData = await api.selectMdssFileList(params)
      this.mdssFileList = fileData.data
    },

    // mdss 항목 검색
    async searchMdssItmList(){
      const params = {
        anlClsId: this.anlClsId,
        mdssSearchText: this.mdssSearchText
      }

      const data = await api.selectMdssItmList(params)
      this.mdssList = data.data
    },

    selectAll() {
      // this.userIds = []
      this.checkMdssItm = []

      if (this.allSelected) {
        for(let i = 0; i < this.mdssList.length ; i ++){
          this.checkMdssItm.push(this.mdssList[i].rownum)
        }
      }
    },

    // MDSS 항목 선택 시 class on
    checkConfirm(event){
      this.allSelected = false
      // if($(event.target).is(":checked")){
      //   $(event.target).parent().parent().parent().addClass("on")
      // }else{
      //   $(event.target).parent().parent().parent().removeClass("on")
      // }
    },

    //mdss 이력보기 클릭 시
    mdssRqstEvent() {
      this.$nextTick(function(){
        this.setModal($('#resultInfo'))
      })
    },

    //mdss 이력보기 목록
    async mdssRqstList(email, pword){
      const params = {
        email: email,
        pword: pword
      }

      const frm = new FormData()
      frm.append('email', email)
      frm.append('pword', pword)

      const data = await api.selectMcstRqstMst(frm)

      // const data = await api.selectMcstRqstMst(params)
      this.mdssRqstMstList = data.data

      if(this.mdssRqstMstList.length === 0){
        alert('해당 정보로 등록된 요청내역이 없습니다.')
        return false
      }

      this.rqstMstShow = 1
    },

    mdssRqstMstSetting(){
      let mdssRqstList = this.mdssRqstMstList
      let rqstMstShow = this.rqstMstShow
      return { mdssRqstList, rqstMstShow }
    },

    // MDSS 요청내역 상세 보기
    async mdssResultDetailInfo(rqstNo) {
      const param = {
        rqstNo: rqstNo
      }

      const frm = new FormData()
      frm.append('rqstNo', rqstNo)

      const data = await api.selectMcstRqstMst(frm)

      // const data = await api.selectMcstRqstMst(param)
      this.mdssResultDetail = data.data

      const detailData = await api.selectRequestsDetails(param)
      this.mdssRequestDetail = detailData.data

      this.$nextTick(function(){
        this.setModal($('#resultDetail'))
      })

    },

    mdssResultDetailSetting() {
      let mdssResultDetail = this.mdssResultDetail
      let mdssRequestDetail = this.mdssRequestDetail

      return { mdssResultDetail, mdssRequestDetail }
    },

    // mdss 파일다운로드 클릭 시
    mdssFileDownEvent(event){
      let fileLength = this.mdssChkFileData.length

      if(fileLength === 0){
        alert('다운받을 자료를 선택해 주세요.')
        return false
      }

      if(fileLength == 1){  // MDSS 1개 파일 다운로드
        if(this.mdssChkFileData[0].fileType === '01'){  // 항목정의서일 때는 일반 다운로드
          this.ettCmlptFlg = 'N'
          this.commonMdssFileDownload()
        }else if(this.mdssChkFileData[0].fileType === '02'){  // 데이터파일일 때는 동의 후 다운로드
          this.ettCmlptFlg = 'Y'
          this.zipFileFlg = 'N'

          this.$nextTick(function(){
            this.setModal($('#downOpenBtn'))
          })
        }
      }else{  // 2개 함께 다운로드 받을 때는 압축 다운로드
        this.zipFileFlg = 'Y'
        this.ettCmlptFlg = 'N'
        this.$nextTick(function(){
          this.setModal($('#downOpenBtn'))
        })

        // this.mdssZipFileDownload()
      }

    },

    // 선택항목 다운로드 클릭 시
    mdssSelectMdssDown(event){
      if(this.checkMdssItm == ''){
        alert("추출 요청하실 항목을 선택해주시기 바랍니다. 전체 데이터가 필요하시면 DATA파일을 다운로드 하시면 됩니다.")
        return false
      }
      this.ettCmlptFlg = 'N'
      this.zipFileFlg = 'N'

      this.$nextTick(function(){
        this.setModal($('#downOpenBtn'))
      })

    },

    // 조건설정 입력 클릭 시
    async setCon(itmId, cdNm, idx){
      this.checkCondIdx = idx

      if(cdNm === "코드형"){
        const params = {
          anlClsId: this.anlClsId,
          creTme: this.mdssCreTme,
          itmId: itmId
        }
        const data = await api.selectItmData(params)
        this.conCdList = data.data

        this.$nextTick(function(){
          this.setModal($('#condCd'))
        })


      }else{
        const param = {
          grpCd: '005'
        }
        const data = await api.selectMdssConSetCodeList(param)
        this.grpCdList = data.data
        this.grpCdNm = cdNm

        this.$nextTick(function(){
          this.setModal($('#condSet'))
        })
      }
    },

    // 코드형 조건설정 값 세팅
    condSetting(){
      const conCdList = this.conCdList
      return { conCdList }
    },

    // 코드형 외 조건설정 값 세팅
    condSetSetting(){
      const grpCdList = this.grpCdList
      return { grpCdList }
    },

    // 조건설정 모달창에서 적용 클릭 시(코드형)
    saveConCd(checkConCd, conCdGubun){
      this.mdssList[this.checkCondIdx].n1stConVal = checkConCd
      if(conCdGubun){
        this.mdssList[this.checkCondIdx].n1stConCd = "07"
      }
      this.closeModal()
    },

    // 조건설정 모달창에서 적용 클릭 시(코드형 외)
    saveCondSet(n1stConCd, n1stConVal, cnctConCd, n2ndConCd, n2ndConVal){
      let conVal1st = n1stConVal
      let conVal2nd = n2ndConVal

      if(this.grpCdNm == '문자형'){
        if(conVal1st != ' ')  conVal1st = "'" + n1stConVal + "'"
        if(conVal2nd != ' ')  conVal2nd = "'" + n2ndConVal + "'"
      }

      this.mdssList[this.checkCondIdx].n1stConCd = n1stConCd
      this.mdssList[this.checkCondIdx].n1stConVal = conVal1st
      this.mdssList[this.checkCondIdx].cnctConCd = cnctConCd
      this.mdssList[this.checkCondIdx].n2ndConCd = n2ndConCd
      this.mdssList[this.checkCondIdx].n2ndConVal = conVal2nd
    },

    // 조건 삭제
    deleteCond(idx){
      this.mdssList[idx].n1stConVal = " "
      this.mdssList[idx].n1stConCd = " "
      this.mdssList[idx].cnctConCd = " "
      this.mdssList[idx].n2ndConCd = " "
      this.mdssList[idx].n2ndConVal = " "
    },

    async saveItmRequest(){
      let mdssItm = ''
      let finallyItem = []
      for(let i = 0 ; i < this.checkMdssItm.length ; i ++){
        mdssItm = this.checkMdssItm[i]
        finallyItem.push(document.getElementById(mdssItm).value)
      }

      const frm = new FormData()
      frm.append('anlClsId', this.anlClsId)
      frm.append('startCreTme', this.mdssCreTme)
      frm.append('endCreTme', this.mdssCreTme)
      frm.append('creTme', this.mdssCreTme)
      frm.append('rqstDivCd', '1')
      frm.append('rqstGb', this.rqstGb)
      frm.append('systemNm', this.systemNm)
      frm.append('anlClsNm', this.anlClsNm)
      frm.append('orgNm', this.orgNm)
      frm.append('name', this.name)
      frm.append('phoneNo', this.phoneNo)
      frm.append('email', this.email)
      frm.append('usePurpose', this.usePurpose)
      frm.append('rqstPw', this.rqstPw)
      frm.append('ettCmlptFlg', this.ettCmlptFlg)
      frm.append('chkItmId', finallyItem.join('&'))

      const data = await api.savePostRequest(frm)

      // const data = await api.saveRequest(params)

      const downParams = {
        type: 'MDSS_EXPORT',
        rqstNo: data.data
      }

      await file.download(downParams)

    },


    //mdss 모달창 세팅
    setModal(target){
      // const $openBtn = $(target)
      let $modalCnt = $(target).attr("href")
      $modalCnt = $($modalCnt)
      // const $closeBtn = $modalCnt.find(".close_btn")

      this.$modalCnt = $modalCnt

      $modalCnt.before('<div id="mask"></div>')

      $(window).on("resize", this.centerPosition)

      $("#mask").add($modalCnt).stop().fadeIn("fast")
      $modalCnt.attr("tabIndex", 0).focus()

      // $(".next-btn").on("click",function(){
      //   this.centerPosition;
      // });

      $modalCnt.find("a:first, a:last").on("blur",function  () {
        setTimeout(function  () {
          if (!$modalCnt.find("a").is(":focus")) {
            $modalCnt.find(".close_btn").click()
          }
        },10)
      })

      this.centerPosition()

    },

    centerPosition(){
      let topPos=($(window).height()-$(this.$modalCnt).outerHeight())/2
      let leftPos=($(window).width()-$(this.$modalCnt).outerWidth())/2

      $(this.$modalCnt).css({top:topPos , left:leftPos})
    },

    // mdss 모달창 닫기
    closeModal(){
      $("#mask").add(this.$modalCnt).stop().fadeOut("fast",function  () {
        $("#mask").remove()
      })

      this.agreement00 = true
      this.agreement01 = false
      this.agreement02 = false
      this.agreeYn = ''
      this.rqstGb = ''
    },

    agreement00Next(){
      if(this.rqstGb === ""){
        alert("요청구분을 선택해 주세요.")
        return false
      }

      this.agreement00 = false
      this.agreement01 = true

      this.$nextTick(function(){
        this.centerPosition()
      })


    },

    // 요청서 작성 : 동의, 비동의 후, 다음 클릭했을 때
    agreementNext(){
      if(this.agreeYn === "Y"){
        this.agreement01 = false
        this.agreement02 = true

        this.$nextTick(function(){
          this.centerPosition()
        })
      }else{
        alert("개인정보 이용약관에 동의를 해야 서비스이용이 가능합니다.");
      }
    },

    // 다운로드(추출요청) 클릭 시
    agreeMdssDownload(){
      if(this.rqstGb == '02'){
        if(this.systemNm === ''){
          alert("게시시스템명을 입력해 주세요.")
          this.$refs.systemNm.focus()
          return false
        }
        if(this.orgNm === ''){
          alert("기관명을 입력해 주세요.")
          this.$refs.orgNm.focus()
          return false
        }
        if(this.name === ''){
          alert("담당자명을 입력해 주세요.")
          this.$refs.name.focus()
          return false
        }
        if(this.phoneNo === ''){
          alert("연착처를 입력해 주세요.")
          this.$refs.phoneNo.focus()
          return false
        }
      }

      if(this.email === ''){
        alert("이메일을 입력해 주세요.")
        this.$refs.email.focus()
        return false
      }

      const re_mail = /^([\w\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/
      if(!re_mail.test(this.email)) { // 이메일 검사
        alert('유효한 이메일 주소를 입력해 주세요.');
        this.$refs.email.focus()
        return false
      }

      if(this.usePurpose === ''){
        if(this.rqstGb == '02'){
          alert("게시목적을 입력해 주세요.")
        }else{
          alert("사용목적을 입력해 주세요.")
        }
        this.$refs.usePurpose.focus()
        return false
      }

      if(this.rqstPw === ''){
        alert("결과보기에서 사용할 비밀번호를 숫자 4자리로 입력해 주세요.")
        this.$refs.rqstPw.focus()
        return false
      }

      if(this.ettCmlptFlg === 'Y'){ // 데이터파일 다운로드
        this.saveRequest()
        this.commonMdssFileDownload()
      }else{
        if(this.zipFileFlg == 'Y'){ // 압축파일 다운로드
          this.mdssZipFileDownload()
        }else{  // 선택항목 다운로드
          if(window.confirm('추출시 시간이 소요될수 있습니다. 확인 버튼을 누르신 후 잠시 기다려주시기 바랍니다.')){
            this.saveItmRequest()
          }
        }
      }

      this.closeModal()
    },

    async saveRequest(){
      const params = {
        anlClsId: this.anlClsId,
        startCreTme: this.mdssCreTme,
        endCreTme: this.mdssCreTme,
        creTme: this.mdssCreTme,
        rqstDivCd: '1',
        email: this.email,
        usePurpose: this.usePurpose,
        rqstPw: this.rqstPw,
        rqstGb: this.rqstGb,
        systemNm: this.systemNm,
        anlClsNm: this.anlClsNm,
        orgNm: this.orgNm,
        name: this.name,
        phoneNo: this.phoneNo,
        ettCmlptFlg: this.ettCmlptFlg,
        rstFileNm4: this.getRealFileName(this.mdssChkFileData[0].fileNm),
        rstFilePathNm4: this.mdssChkFileData[0].filePathNm,
        rstFileSize4: this.mdssChkFileData[0].fileSize
      }

      const data = await api.saveRequest(params)
      // console.log(data.data)

    },

    // mdss zip 파일 다운로드
    async mdssZipFileDownload(){
      const params = {
        anlClsNm: this.anlClsNm,
        anlClsId: this.anlClsId,
        creTme: this.mdssCreTme,

        startCreTme: this.mdssCreTme,
        endCreTme: this.mdssCreTme,
        rqstDivCd: '1',
        email: this.email,
        usePurpose: this.usePurpose,
        rqstPw: this.rqstPw,
        rqstGb: this.rqstGb,
        systemNm: this.systemNm,
        orgNm: this.orgNm,
        name: this.name,
        phoneNo: this.phoneNo,
        ettCmlptFlg: 'Y',
      }

      const fileData = await api.saveMdssZip(params)

      const downParams = {
        type: 'MDSS_ZIP',
        fileNm: fileData.data.fileNm,
        directoryPath: fileData.data.directoryPath
      }

      await file.download(downParams)

      const fileNm = fileData.data.fileNm + '.zip'

      this.insertMdssDownLog(fileNm)
    },

    // 파일명 추출
    getRealFileName(fileName){
      // 파일이름이 존재 하지 않을 경우 공백으로 반환
      if(fileName == undefined || fileName == ''){
        return ''
      }
      // 파일업로된 파일이 아닐경우 그대로 반환
      if(fileName.indexOf("upload") == -1){
        return fileName
      }
      const idx = fileName.lastIndexOf("_")
      if(idx == -1){
        return fileName
      }
      return fileName.substr(0, idx)
    },

    // mdss 파일 다운로드 공통
    async commonMdssFileDownload(){
      const params = {
        type: 'MDSS',
        anlClsId: this.anlClsId,
        fileMgmNo: this.mdssChkFileData[0].fileSeq,
        creTme: this.mdssCreTme
      }
      await file.download(params)
      this.insertMdssDownLog(this.mdssChkFileData[0].fileNm)
    },


    // mdss 다운로드 로그 쌓기
    async insertMdssDownLog(fileNm){
      const params = {
        downMenu: 'MDSS',
        downCntn: this.getRealFileName(fileNm)
      }

      const data = await api.insertExcelDownLog(params)

      if(data.data.resultCode < 0){
      }

    },

    // 통계표 새 창 띄우기
    async staticDetail(tblMgmNo){
      window.open('/portal/staticPop/'+tblMgmNo+'/'+1)
    },

    // ==================== 전자책 시작 ==================== //

    searchTextBoardList(initGubun) {
      this.ebookPageIndex = 0
      this.ebookStartPage = 0
      this.ebookEndPage = 0
      this.selectCodeList = []
      this.ebookDataList = []
      this.ebookSearchData = true

      this.searchEbookList(initGubun)
    },

    // 전자책 데이터 조회
    async searchEbookList (initGubun) {
      this.isEbookShow = true
      // 전자책 페이징 인덱스 및 페이지 설정
      this.ebookPageIndex = this.ebookPageIndex + 1
      this.ebookStartPage = ((this.ebookPageIndex - 1) * this.ebookCount) + 1
      this.ebookEndPage = this.ebookPageIndex * this.ebookCount

      // 전자책 selectbox 조회
      const idParam = {
        tblMgmNo : this.statId
      }
      const codeData = await ebookApi.selectEbookClass(idParam)

      // 전자책 데이터 파라미터 설정
      const paramData = {
        sortGb: this.sortGubun,
        classCode: codeData.data,
        searchText: this.ebookSearchText,
        startPage: this.ebookStartPage,
        endPage: this.ebookEndPage
      }

      // 전자책 데이터 조회
      const ebookData = await ebookApi.searchEbookList(paramData)
      if (ebookData.data.length > 0) {
        ebookData.data.forEach(data => this.ebookDataList.push(data))
      }

      // 전자책 데이터 개수가 게시물 조회 개수보다 작으면 더보기 버튼 숨김
      if (ebookData.data.length < this.ebookCount) {
        this.ebookSearchData = false
      }

      // 전자책 데이터가 존재하지 않을 경우 알림창 띄움
      if (ebookData.data.length == 0) {
        if(!initGubun){
          this.isEbookShow = false
        }else{
          // alert("목록이 존재하지 않습니다.");
        }
      }


    },

    // 이미지 선택 시 전자책 열기
    openEbook(data) {
      const openUrl = 'https://ebook.culturestat.mcst.go.kr/src/viewer/main.php?host=main&category=0&page=0&pagenum=0&site=' + data.site
      window.open(openUrl, '_blank')
    },

    // 파일 다운로드
    async fileDownload(data) {

      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'ebook',
        fileMgmNo: data.site
      }

      // 파일 다운로드 호출
      await file.download(params)
    },

// ==================== 전자책 끝 ==================== //

    // 목록보기 클릭 시
    goList() {
      this.commonTabs = 0
    },

    // 명칭검색 클릭 시
    showKeywordSearch() {
      this.commonTabs = 6
    },

    // 상세검색 클릭 시
    showDetailSearch() {
      this.commonTabs = 7
    },

    goEbookList() {
      this.commonTabs = 1
      if (this.ebookDataList.length == 0) {
        this.searchEbookList();
      }
    },

    goMdssList() {
      this.commonTabs = 2
    },

    goMetaInfo() {
      this.commonTabs = 3
    },

    changeUrl(url) {
      return url.replace('http://', 'https://')
    }
  },

}
</script>

<style scoped>
.lastDepth01 {
  width:calc(100%);
  border-right: 0;
}
.lastDepth02 {
  width:calc(100% - 255px);
  border-right: 0;
}
.lastDepth03 {
  width:calc(100% - 510px);
  border-right: 0;
}
.lastDepth04 {
  width:calc(100% - 765px);
  border-right: 0;
}
.infographic-list-inner::after {
  content: '';
  width: 27.3em;
}
.default.btn.no {
  background-color: #aeaeae;
  border: 1px solid #7d7d7d;
  cursor: default;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
  opacity: .35;
  cursor: auto;
  pointer-events: auto;
}
.mdss-yy .layout{
  display: flex;
  justify-content: flex-start;
}
.swiper-container{
  width:100%;
}
.chk-box input{
  opacity: 0 !important;
}

</style>
