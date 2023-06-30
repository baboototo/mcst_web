<template>
  <div>
    <div class="layout">
      <div class="align-between">
        <!-- <h2 class="title" style="width:auto">{{this.subjectNm}}</h2> -->

        <div class="title-select-wrap">
          <button type="button" class="title" ref="subMenuTitle" @click="eventClickSubMenu($event.target)">{{this.subjectNm}}</button>
          <div ref="subMenuItem">
            <ul class="subGnb-depth03 title-menu">
              <li v-for="(data, idx) in mdssNaviList" v-bind:key="idx">
                <a href="javascript:;" @click="selectMdssNaviList(false, data.anlClsId, data.anlClsNm)">{{ data.anlClsNm }}</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <div class="mdss-yy">
      <div class="layout" style="position:relative;">
        <label for="depth2Id" class="ir">연도</label>
        <select name="depth2Id" id="depth2Id" v-model="depth2Id" @change="selectMdssYearList(false, false)">
          <option :value="data.anlClsId" v-for="(data, idx) in mdssNavi2depthList" v-bind:key="idx">{{ data.anlClsNm }}</option>
        </select>
        <swiper class="swiper" :options="swiperMdssOption" style="width: 100%; height: 100%;">
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

          <input type="checkbox" id="chk03" v-if="data.fileType === '06'" :value="{fileSeq: data.fileSeqNo, fileType: data.fileType, filePathNm: data.filePathNm, fileSize: data.fileSize, fileNm: data.fileNm}" v-model="mdssChkFileData">
          <label for="chk03" class="type02" v-if="data.fileType === '06'">
            <img src="../../assets/img/ico_mdss_type02.png" alt="데이터파일 아이콘">
            {{ data.cdNm }}
          </label>

          <input type="checkbox" id="chk04" v-if="data.fileType === '07'" :value="{fileSeq: data.fileSeqNo, fileType: data.fileType, filePathNm: data.filePathNm, fileSize: data.fileSize, fileNm: data.fileNm}" v-model="mdssChkFileData">
          <label for="chk04" class="type02" v-if="data.fileType === '07'">
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
        <a href="#/" class="mdss btn" @click="mdssRqstEvent">
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
                <div class="entry-txt"><label :for="data.rownum">{{ data.itmNm }}</label></div>
                <input type="hidden" :id="data.rownum"
                       :value="data.itmId+'@'+data.dspOrdNo+'@'+data.n1stConVal+'@'+data.n1stConCd+'@'+data.cnctConCd+'@'+data.n2ndConCd+'@'+data.n2ndConVal"></td>
              <td style="display:none;"></td>
              <td class="btn-td input-btn"><button type="button" class="tbl-btn" @click="setCon(data.itmId, data.cdNm, idx)">입력</button></td>
              <td class="btn-td del-btn"><button type="button" class="tbl-btn" @click="deleteCond(idx)">삭제</button></td>
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
                - 신청자의 개인정보는 한국문화관광연구원에서 <span style="font-size:18px;color:#4940b9">1년간</span> 보유합니다.
              </p>
            </div>
            <div class="part">
              <strong>4. 동의 거부 시 불이익 사항</strong>
              <p class="indent">
                - 이용자는 수집되는 개인정보의 항목에 대한 동의를 해주셔야 이후 절차 진행이 가능합니다.
              </p>
              <p class="indent">
                - 수집되는 개인정보 항목의 수집·이용에 관한 동의는 거부하실 수 있으며, 이 경우 MDSS 데이터 다운로드 이용이 제한됩니다.
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
            <dt><span style="color: red">*</span>&nbsp;통계명</dt>
            <dd>{{ this.anlClsNm}}</dd>
          </dl>
          <dl class="align-start popup-table" v-if="rqstGb === '02'">
            <dt><span style="color: red">*</span>&nbsp;<label for="systemNm">게시시스템명</label></dt>
            <dd><input type="text" ref="systemNm" v-model="systemNm" id="systemNm"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'"><span style="color: red">*</span>&nbsp;<label for="orgNm">기관명</label></dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="orgNm" v-model="orgNm" id="orgNm"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'"><span style="color: red">*</span>&nbsp;<label for="name">담당자명</label></dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="name" v-model="name" id="name"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '02'"><span style="color: red">*</span>&nbsp;<label for="phoneNo">연락처</label></dt>
            <dd v-if="rqstGb === '02'"><input type="text" ref="phoneNo" v-model="phoneNo" id="phoneNo"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt><span style="color: red">*</span>&nbsp;<label for="email">이메일</label></dt>
            <dd><input type="text" ref="email" v-model="email" id="email"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt v-if="rqstGb === '01'"><span style="color: red">*</span>&nbsp;<label for="usePurpose">사용목적</label></dt>
            <dt v-if="rqstGb === '02'"><span style="color: red">*</span>&nbsp;<label for="usePurpose">게시목적</label></dt>
            <dd><input type="text" ref="usePurpose" v-model="usePurpose" id="usePurpose"></dd>
          </dl>
          <dl class="align-start popup-table" >
            <dt><span style="color: red">*</span>&nbsp;<label for="rqstPw">비밀번호(숫자4자리)</label></dt>
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
    <MdssCondSetModal :modalConsetSettings="condSetSetting()" />
    <MdssRqstModal />
    <MdssResultDetailModal :modalMdssResultSettings="mdssResultDetailSetting()"/>

  </div>
</template>

<script>
import * as api from '@/api/Statistics.js'
import * as file from '@/api/common/file.js'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import $ from 'jquery'
import MdssCondModal from '@/components/MdssCondModal'
import MdssCondSetModal from '@/components/MdssCondSetModal'
import MdssRqstModal from '@/components/MdssRqstModal'
import MdssRqstMst from '@/components/MdssRqstMst'
import MdssResultDetailModal from '@/components/MdssResultDetailModal'

export default {
  name: "Mdss",
  components: {
    swiper,
    swiperSlide,
    MdssCondModal,
    MdssCondSetModal,
    MdssRqstModal,
    MdssRqstMst,
    MdssResultDetailModal
  },

  data() {
    return {
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
      statId : this.$route.query.statId,
      statNm: this.$route.query.statNm,
      statItemId: this.$route.query.statItemId,
      paramAnlClsId : this.$route.query.anlClsId,
      isMdssShow: true,
      depth1Id: '',
      depth2Id: '',
      upAnlClsId: '',
      subjectNm: '',
      subjectNm2: '',
      mdssNaviList: [], //초기 selectbox list
      mdssNavi2depthList: [], // 두번째 selectbox list
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
      modalWidth: 0,
      modalHeight: 0,
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
      mdssRqstMstList: [],
      mdssResultDetail: [],
      mdssRequestDetail: [],
      rqstMstShow : 0,
      allSelected: false,
      selected: [],
    }
  },

  created() {
    this.selectMdssNaviList(true)

  },

  computed: {

  },

  methods: {


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

    // mdss 초기 selectbox 세팅
    async selectMdssNaviList (initGubun, selAnlClsId, selAnlClsNm) {

      const paramData = {
        upAnlClsId: '0'
      }

      const mdssNaviListData = await api.selectMdssNavi(paramData)
      this.mdssNaviList = mdssNaviListData.data
      this.mdssNaviCnt = mdssNaviListData.data.length

      if(initGubun){
        if(this.statId != undefined){
          this.upAnlClsId = this.statId
          this.depth1Id = this.statId
          this.subjectNm = this.statNm.replace(/<b>/g, '').replace(/<\/b>/g,'')
        }else{
          this.upAnlClsId = mdssNaviListData.data[0].anlClsId
          this.depth1Id = mdssNaviListData.data[0].anlClsId
          this.subjectNm = mdssNaviListData.data[0].anlClsNm
        }
      }else{
        this.upAnlClsId = selAnlClsId
        this.subjectNm = selAnlClsNm
        this.eventClickSubMenu(this.$refs.subMenuTitle)
      }

      this.selectMdssNavi2depthList(initGubun)
    },

    async selectMdssNavi2depthList (initGubun) {
      const depthParam = {
        upAnlClsId: this.upAnlClsId
      }

      const mdssNavi2depthListData = await api.selectMdssNavi(depthParam)
      this.mdssNavi2depthList = mdssNavi2depthListData.data
      if(initGubun){
        if(this.statId != undefined){
          this.upAnlClsId = this.statItemId
          this.depth2Id = this.statItemId // selectbox 값 세팅
        }else{
          this.upAnlClsId = mdssNavi2depthListData.data[0].anlClsId
          this.depth2Id = this.upAnlClsId // selectbox 값 세팅
        }
      }else{
        this.upAnlClsId = mdssNavi2depthListData.data[0].anlClsId
        this.depth2Id = this.upAnlClsId // selectbox 값 세팅
      }

      // this.subjectNm = subjectNm

      this.selectMdssYearList(initGubun, true)
    },

    // mdss 초기 년도 탭 세팅
    async selectMdssYearList(initGubun, selectGubun) {

      const paramData = {
        upAnlClsId: this.depth2Id
      }

      this.mdssChkFileData = [] // 파일다운로드 데이터 초기화

      const mdssNaviListData = await api.selectMdssNavi(paramData)
      this.mdssYearList = mdssNaviListData.data

      let anlClsId = ''

      if(initGubun){
        if(this.statId != undefined){
          anlClsId = this.paramAnlClsId
        }else{
          anlClsId = mdssNaviListData.data[0].anlClsId
        }
      }else{
        anlClsId = mdssNaviListData.data[0].anlClsId
      }

      let anlClsNm = ''

      if(selectGubun){  // IE에서 select text가 안 먹어서...
        anlClsNm = this.subjectNm + '(' + this.mdssNavi2depthList[0].anlClsNm + ')'
      }else{
        anlClsNm = this.subjectNm + '(' + $("#depth2Id option:selected").text() + ')'
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

    selectAll() {
      this.checkMdssItm = []

      if (this.allSelected) {
        for(let i = 0; i < this.mdssList.length ; i ++){
          this.checkMdssItm.push(this.mdssList[i].rownum)
        }
      }
    },

    // MDSS 항목 선택 시 class on
    checkConfirm(event){
      this.allSelected = false;
      // if($(event.target).is(":checked")){
      //   $(event.target).parent().parent().parent().addClass("on")
      // }else{
      //   $(event.target).parent().parent().parent().removeClass("on")
      // }
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

      // const data = await api.selectMcstRqstMst(params)
      const data = await api.selectMcstRqstMst(frm)
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
        }else if(this.mdssChkFileData[0].fileType === '02' || this.mdssChkFileData[0].fileType === '06' || this.mdssChkFileData[0].fileType === '07'){  // 데이터파일일 때는 동의 후 다운로드
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
      this.centerPosition()

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

      if(this.ettCmlptFlg === "Y"){ // 데이터파일 다운로드
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
      const frm = new FormData()
      frm.append('anlClsId', this.anlClsId)
      frm.append('startCreTme', this.mdssCreTme)
      frm.append('endCreTme', this.mdssCreTme)
      frm.append('creTme', this.mdssCreTme)
      frm.append('rqstDivCd', '1')
      frm.append('email', this.email)
      frm.append('usePurpose', this.usePurpose)
      frm.append('rqstPw', this.rqstPw)
      frm.append('rqstGb', this.rqstGb)
      frm.append('systemNm', this.systemNm)
      frm.append('anlClsNm', this.anlClsNm)
      frm.append('orgNm', this.orgNm)
      frm.append('name', this.name)
      frm.append('phoneNo', this.phoneNo)
      frm.append('ettCmlptFlg', this.ettCmlptFlg)
      frm.append('fileType', this.mdssChkFileData[0].fileType)
      frm.append('rstFileNm4', this.getRealFileName(this.mdssChkFileData[0].fileNm))
      frm.append('rstFilePathNm4', this.mdssChkFileData[0].filePathNm)
      frm.append('rstFileSize4', this.mdssChkFileData[0].fileSize)

      const data = await api.savePostRequest(frm)
      // console.log(data.data)

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
      this.insertMdssDownLog()
    },

    // mdss zip 파일 다운로드 공통
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

      // await file.zipDownload(params)
      // this.insertMdssDownLog()
    },

    // mdss 다운로드 로그 쌓기
    async insertMdssDownLog(){
      const params = {
        downMenu: 'MDSS',
        downCntn: this.getRealFileName(this.mdssChkFileData[0].fileNm)
      }

      const data = await api.insertExcelDownLog(params)

      if(data.data.resultCode < 0){
      }

    },
  },
}
</script>

<style scoped>
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
  opacity: .35;
  cursor: auto;
  pointer-events: auto;
}
.chk-box input{
  opacity: 0 !important;
}


</style>
