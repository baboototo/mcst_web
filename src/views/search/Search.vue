<template>
    <div id="search">
        <div class="layout">
            <div class="stat-type-wrap">
                <div class="search-result-wrap">
                    <div class="all-search-box">
                        <input type="search" v-model="findNm" id="findNm" v-on:keyup.enter="searchRetrieve(1, 0)" placeholder="통계자료 검색·키워드를 입력해주세요.">
                        <button type="submit" @click="searchRetrieve(1, 0)"><img src="../../assets/img/ico_main_search2.png" alt="검색하기"></button>
                    </div>
                    <ul class="align-center all-search-tab">
                        <li :class="{on: searchTabs === 0}"><a href="#/" @click.prevent="showTotal()">전체</a></li>
                        <li :class="{on: searchTabs === 1}"><a href="#/" @click.prevent="showStatics()">통계표</a></li>
                        <li :class="{on: searchTabs === 2}"><a href="#/" @click.prevent="showBoard()">게시물</a></li>
                        <li :class="{on: searchTabs === 3}"><a href="#/" @click.prevent="showEbook()">전자책</a></li>
                        <!-- <li :class="{on: searchTabs === 4}"><a href="#/" @click.prevent="showMdss()">MDSS</a></li> -->
                    </ul>
                    <!-- 전체검색 결과 -->
                    <div v-show="searchTabs === 0">
                        <!-- 통계표 검색결과 -->
                        <div class="search-result date-none">
                            <span class="total">통계표 검색결과 <span class="num">{{ staticTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in staticResultList" v-bind:key="idx">
                                    <a href="#/" @click.prevent="staticDetail(data.tblMgmNo, data.statPath)">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.tblKorNm"></strong>
                                            <div class="address" v-html="data.statPath"></div>
                                        </div>
                                    </a>
                                </li>
                                <li v-show="staticResultList == null || staticResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.page, this.staticTotalCnt, this.rows)" @paging="pagingMethod"/>
                        </div>
                        <!-- 게시글 검색결과 -->
                        <div class="search-result date-none">
                            <span class="total">게시물 검색결과 <span class="num">{{ boardTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in boardResultList" v-bind:key="idx">
                                    <a href="#/" v-if="data.boardType == '000266'" @click="goInfographic(data.descriptionUrl)">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <div class="address">인포그래픽</div>
                                        </div>
                                    </a>
                                    <router-link :to="{name: '기타자료실 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '기타자료실'} }" v-if="data.boardType == '000035'">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">기타자료실</div>
                                        </div>
                                    </router-link>
                                    <router-link :to="{name: '공지사항 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '공지사항'} }" v-if="data.boardType == '000036'" >
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">공지사항</div>
                                        </div>
                                    </router-link>
                                    <router-link :to="{name: '지표보고서 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '지표보고서'} }" v-if="data.boardType == '000311'" >
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">지표보고서</div>
                                        </div>
                                    </router-link>
                                </li>
                                <li v-show="boardResultList == null || boardResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.boardPage, this.boardTotalCnt, this.boardRows)" @paging="pagingBoardMethod"/>
                        </div>
                        <!-- 전자책 검색결과 -->
                        <div class="search-result date-none">
                            <span class="total">전자책 검색결과 <span class="num">{{ ebookTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in ebookResultList" v-bind:key="idx">
                                    <a href="#/" @click="goEbook(data.host, data.site)">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.name"></strong>
                                            <div class="address">전자책</div>
                                        </div>
                                    </a>
                                </li>
                                <li v-show="ebookResultList == null || ebookResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.ebookPage, this.ebookTotalCnt, this.ebookRows)" @paging="pagingEbookMethod"/>
                        </div>
                        <!-- MDSS 검색결과 -->
                        <!-- <div class="search-result date-none">
                            <span class="total">MDSS 검색결과 <span class="num">{{ mdssTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in mdssResultList" v-bind:key="idx">
                                    <router-link :to="{name: 'MDSS', query: {statId: data.statId, statNm: data.statNm, statItemId: data.statItemId, anlClsId: data.anlClsId} }">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.mdssTitle"></strong>
                                            <div class="address">MDSS</div>
                                        </div>
                                    </router-link>
                                </li>
                                <li v-show="mdssResultList == null || mdssResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.mdssPage, this.mdssTotalCnt, this.mdssRows)" @paging="pagingMdssMethod"/>
                        </div> -->

                    </div>

                    <!-- 통계표 검색 결과 -->
                    <div v-show="searchTabs === 1">
                        <div class="align-between all-search-title">
                            <h3>통계표</h3>
                        </div>
                        <div class="btn-layout right">
                            <button type="button" class="indigo btn small" @click.prevent="searchResult()">검색결과</button>
                            <button type="button" class="indigo btn small" @click.prevent="searchShowDetail()">상세검색</button>
                        </div>
                        <div v-show="showStaticResult">
                            <div class="search-result date-none">
                                <span class="total">통계표 검색결과 <span class="num">{{ tabTotalCnt }}</span>건</span>
                                <ul class="search-result-list">
                                    <li v-for="(data, idx) in tabResultList" v-bind:key="idx">
                                        <a href="#/" @click.prevent="staticDetail(data.tblMgmNo, data.statPath)">
                                            <div class="title-address">
                                                <strong class="result-title" v-html="data.tblKorNm"></strong>
                                                <div class="address" v-html="data.statPath"></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li v-show="tabResultList == null || tabResultList == ''">
                                        <a class="non-data" style="cursor:default;">
                                        <div class="notice-content">
                                            <strong>검색결과가 없습니다.</strong>
                                        </div>
                                        </a>
                                    </li>
                                </ul>
                                <SearchPagination :pageSetting="pageDataSetting(this.tabPage, this.tabTotalCnt, this.tabRows)" @paging="pagingTabMethod"/>
                            </div>
                        </div>

                        <!-- 상세검색 -->
                        <div v-show="showDetail">
                            <div class="search-deatail">
                                <table class="search-deatail-table">
                                    <caption class="ir">상세검색</caption>
                                    <colgroup>
                                        <col>
                                        <col>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th scope="row"><label for="tblKorNmString">통계표</label></th>
                                            <td>
                                                <input type="text" v-model="tblKorNmString" id="tblKorNmString" v-on:keyup.enter="searchDetail(true)" placeholder="통계명 중 포함된 단어를 검색, 여러 단어일경우에는 ','로 붙여서 입력">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><label for="itmKorNmString">항목명</label></th>
                                            <td>
                                                <input type="text" v-model="itmKorNmString" id="itmKorNmString" v-on:keyup.enter="searchDetail(true)" placeholder="항목이 포함된 단어를 검색, 여러 단어일 경우에는 ','로 붙여서 입력">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">입력연도</th>
                                            <td>
                                                <label class="label-hidden">
                                                    <input type="text" class="select-box-btn" id="selectBoxBtn" v-model="yearString" @click.prevent="selectYearString($event)" placeholder="클릭해서 연도를 선택해주세요.">
                                                </label>
                                                <div class="select-box-yy" id="selectBoxYY">
                                                    <!-- <div class="select-box-yy" id="selectBoxYY" v-click-outside> -->
                                                    <ul id="selectBoxUL">
                                                        <li v-for="(data, idx) in yearList" v-bind:key="idx">
                                                            <input type="checkbox" name="chkCreTme" :id='data' :value='data' v-model="checkYearList" @change="selectYear($event)">
                                                            <label :for='data' >{{data}}</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="btn-layout right">
                                <button type="button" class="gray btn small" @click="searchDetail(true)">검색</button>
                            </div>
                            <div class="search-result">
                                <span class="total">검색결과 <span class="num">{{ totalDetailCnt }}</span>건</span>
                                <ul class="search-result-list">
                                    <li v-for="(data, idx) in staticsDetailData" v-bind:key="idx">
                                        <a href="#/" @click="staticDetail(data.tblMgmNo, data.upPath)">
                                        <div class="title-address">
                                            <strong class="result-title">{{ data.tblKorNm }} </strong>
                                            <div class="address">
                                            <span>{{ data.upPath }}</span>
                                            </div>
                                        </div>
                                        <div class="result-date" v-if="data.termList[0] != null">
                                            <p>{{ data.termList[0].startMonth }}<i>&nbsp;~&nbsp;</i>{{ data.termList[0].endMonth }}</p>
                                        </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="btn-layout center" v-if="isDetailSearchData">
                                    <button type="button" class="line btn" @click="statisticsDetailSearchList">더보기</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 게시물 검색 결과 -->
                    <div v-show="searchTabs === 2">
                        <div class="search-result date-none">
                            <span class="total">게시물 검색결과 <span class="num">{{ tabBoardTotalCnt }}</span>건</span>
                            <div class="select-box orderby-radio-wrap">
                                <div class="radio-box">
                                    <input type="radio" id="radio_chk01" name="radio_chk" v-model="boardOrder" value="01" @change="searchBoardOrder()">
                                    <label for="radio_chk01" style="margin-right:30px;">정확도순</label>
                                </div>
                                <div class="radio-box">
                                    <input type="radio" id="radio_chk02" name="radio_chk" v-model="boardOrder" value="02" @change="searchBoardOrder()">
                                    <label for="radio_chk02" style="margin-right:30px;"> 최신순</label>
                                </div>
                            </div>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in tabBoardResultList" v-bind:key="idx">
                                    <a href="#/" v-if="data.boardType == '000266'" @click="goInfographic(data.descriptionUrl)">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <div class="address">인포그래픽</div>
                                        </div>
                                    </a>
                                    <router-link :to="{name: '기타자료실 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '기타자료실'} }" v-if="data.boardType == '000035'">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">기타자료실</div>
                                        </div>
                                    </router-link>
                                    <router-link :to="{name: '공지사항 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '공지사항'} }" v-if="data.boardType == '000036'" >
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">공지사항</div>
                                        </div>
                                    </router-link>
                                    <router-link :to="{name: '지표보고서 상세', query: {boardId: data.boardId, boardType: data.boardType, target: '지표보고서'} }" v-if="data.boardType == '000311'" >
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.boardTitle"></strong>
                                            <p v-html="data.boardDescription"></p>
                                            <div class="address">지표보고서</div>
                                        </div>
                                    </router-link>
                                </li>
                                <li v-show="tabBoardResultList == null || tabBoardResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.tabBoardPage, this.tabBoardTotalCnt, this.tabBoardRows)" @paging="pagingTabBoardMethod"/>
                        </div>
                    </div>

                    <!-- 전자책 검색 결과 -->
                    <div v-show="searchTabs === 3">
                        <div class="search-result date-none">
                            <span class="total">전자책 검색결과 <span class="num">{{ tabEbookTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in tabEbookResultList" v-bind:key="idx">
                                    <a href="#/" @click="goEbook(data.host, data.site)">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.name"></strong>
                                            <div class="address">전자책</div>
                                        </div>
                                    </a>
                                </li>
                                <li v-show="tabEbookResultList == null || tabEbookResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.tabEbookPage, this.tabEbookTotalCnt, this.tabEbookRows)" @paging="pagingTabEbookMethod"/>
                        </div>
                    </div>

                    <!-- MDSS 검색 결과 -->
                    <!-- <div v-show="searchTabs === 4">
                        <div class="search-result date-none">
                            <span class="total">MDSS 검색결과 <span class="num">{{ tabMdssTotalCnt }}</span>건</span>
                            <ul class="search-result-list">
                                <li v-for="(data, idx) in tabMdssResultList" v-bind:key="idx">
                                    <router-link :to="{name: 'MDSS', query: {statId: data.statId, statNm: data.statNm, statItemId: data.statItemId, anlClsId: data.anlClsId} }">
                                        <div class="title-address">
                                            <strong class="result-title" v-html="data.mdssTitle"></strong>
                                            <div class="address">MDSS</div>
                                        </div>
                                    </router-link>
                                </li>
                                <li v-show="tabMdssResultList == null || tabMdssResultList == ''">
                                    <a class="non-data" style="cursor:default;">
                                    <div class="notice-content">
                                        <strong>검색결과가 없습니다.</strong>
                                    </div>
                                    </a>
                                </li>
                            </ul>
                            <SearchPagination :pageSetting="pageDataSetting(this.tabMdssPage, this.tabMdssTotalCnt, this.tabMdssRows)" @paging="pagingTabMdssMethod"/>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/Statistics.js'
import * as searchApi from '@/api/Search.js'
import $ from 'jquery'
import SearchPagination from '@/components/SearchPagination'

export default {
    name: "Search",

    components : {
        SearchPagination,
    },

    data() {
        return {
            searchTabs: 0,  // 공통 탭 제어 (0:전체, 1:통계표, 2:게시물, 3:전자책, 4:MDSS)
            showStaticResult : false,
            showDetail: false,
            findNm: '',
            searchFindNm: this.$route.query.searchFindNm,
            //상세검색 데이터
            staticsDetailData: [],
            totalDetailCnt: 0,
            detailCount: 10,
            detailPageIndex: 0,
            detailStartPage: 0,
            detailEndPage: 0,
            isDetailSearchData: false,
            tblKorNmString: '',
            itmKorNmString: '',
            yearString: '',
            yearList: [],
            checkYearList: [],
            //통합검색 데이터 - 통계표
            staticResultList: [],
            staticTotalCnt : 0,
            rows: 3,
            page: 1,
            //통합검색 데이터 - 게시물
            boardResultList: [],
            boardTotalCnt : 0,
            boardRows: 3,
            boardPage: 1,
            //통합검색 데이터 - 전자책
            ebookResultList: [],
            ebookTotalCnt : 0,
            ebookRows: 3,
            ebookPage: 1,
            //통합검색 데이터 - MDSS
            mdssResultList: [],
            mdssTotalCnt : 0,
            mdssRows: 3,
            mdssPage: 1,
            // 통계표 탭 검색 데이터
            tabResultList: [],
            tabTotalCnt : 0,
            tabRows: 10,
            tabPage: 1,
            // 게시물 탭 검색 데이터
            tabBoardResultList: [],
            tabBoardTotalCnt : 0,
            tabBoardRows: 10,
            tabBoardPage: 1,
            boardOrder: '01',
            // 전자책 탭 검색 데이터
            tabEbookResultList: [],
            tabEbookTotalCnt : 0,
            tabEbookRows: 10,
            tabEbookPage: 1,
            // MDSS 탭 검색 데이터
            tabMdssResultList: [],
            tabMdssTotalCnt : 0,
            tabMdssRows: 10,
            tabMdssPage: 1,
            block: 10   // 페이징 block 개수
        }
    },

    created() {
        if(this.searchFindNm != undefined){
            this.findNm = this.searchFindNm
        }
        this.searchRetrieve(this.page, 0)
    },

    mounted() {
        if(window.innerWidth <= 768){
            this.block = 5
        }
    },

    watch: {
        $route(to, from){
            if (to.path == from.path) {
                if(this.$route.query.searchFindNm != undefined){
                    this.findNm = this.$route.query.searchFindNm
                }
                this.searchRetrieve(this.page, 0)
            }
        }
    },

    methods: {

        searchRetrieve(currentPage, startPage){
            this.searchStaticResult(currentPage, startPage)
            this.searchBoardResult(currentPage, startPage)
            this.searchEbookResult(currentPage, startPage)
            this.searchMdssResult(currentPage, startPage)

            this.searchTabResult(currentPage, startPage)
            this.searchTabBoardResult(currentPage, startPage)
            this.searchTabEbookResult(currentPage, startPage)
            this.searchTabMdssResult(currentPage, startPage)

            if(this.searchTabs == 1){
                this.showStaticResult = true
            }

            this.insertSrchLang()
        },

        // 인기검색어 저장
        async insertSrchLang() {
            if(this.findNm != ''){
                const param = {
                    findNm : this.findNm
                }
                await searchApi.insertSrchLang(param)
            }
        },

        // ===== 전체 검색 (통계표)
        async searchStaticResult(currentPage, startPage){
            if(this.findNm == ''){
                this.staticResultList = []
                this.staticTotalCnt = 0
                return false
            }

            const param = {
                rows: this.rows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'stat',
                scn: 'stat'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.staticResultList = searchList.data

            if(searchList.data.length > 0){
                this.staticTotalCnt = searchList.data[0].totalCount
            }else{
                this.staticTotalCnt = 0
            }

            this.page = currentPage
            this.pageDataSetting(currentPage, this.staticTotalCnt, this.rows)
        },

        pageDataSetting(currentPage, totalCnt, rows){
            const totalPage = Math.ceil(totalCnt / rows)
            const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
            const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null

            let startIndex = (Math.ceil(currentPage / this.block) - 1) * this.block + 1
            let endIndex = startIndex + this.block > totalPage ? totalPage : startIndex + this.block - 1
            let list = []
            for (let index = startIndex; index <= endIndex; index++) {
                list.push(index)
            }

            return { first, end, list, currentPage, totalPage }
        },

        pagingMethod(page) {
            let startRow = page - 1
            this.searchStaticResult(page, startRow)
        },

        // ===== 탭 검색 (통계표)
        async searchTabResult(currentPage, startPage){
            if(this.findNm == ''){
                this.tabResultList = []
                this.tabTotalCnt = 0
                return false
            }

            const param = {
                rows: this.tabRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'stat',
                scn: 'stat'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.tabResultList = searchList.data
            if(searchList.data.length > 0){
                this.tabTotalCnt = searchList.data[0].totalCount
            }else{
                this.tabTotalCnt = 0
            }

            this.tabPage = currentPage
            this.pageDataSetting(currentPage, this.tabTotalCnt, this.tabRows)

        },

        pagingTabMethod(page) {
            let startRow = page - 1
            this.searchTabResult(page, startRow)
        },

        // ===== 전체 검색 (게시글)
        async searchBoardResult(currentPage, startPage){
            if(this.findNm == ''){
                this.boardResultList = []
                this.boardTotalCnt = 0
                return false
            }

            const param = {
                rows: this.boardRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'board',
                scn: 'board',
                boardOrder: '01'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.boardResultList = searchList.data

            if(searchList.data.length > 0){
                this.boardTotalCnt = searchList.data[0].totalCount
            }else{
                this.boardTotalCnt = 0
            }

            this.boardPage = currentPage
            this.pageDataSetting(currentPage, this.boardTotalCnt, this.boardRows)

        },

        pagingBoardMethod(page) {
            let startRow = page - 1
            this.searchBoardResult(page, startRow)
        },

        // ===== 탭 검색 (게시글)
        async searchTabBoardResult(currentPage, startPage){
            if(this.findNm == ''){
                this.tabBoardResultList = []
                this.tabBoardTotalCnt = 0
                return false
            }

            const param = {
                rows: this.tabBoardRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'board',
                scn: 'board',
                boardOrder: this.boardOrder
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.tabBoardResultList = searchList.data

            if(searchList.data.length > 0){
                this.tabBoardTotalCnt = searchList.data[0].totalCount
            }else{
                this.tabBoardTotalCnt = 0
            }

            this.tabBoardPage = currentPage
            this.pageDataSetting(currentPage, this.tabBoardTotalCnt, this.tabBoardRows)

        },

        pagingTabBoardMethod(page) {
            let startRow = page - 1
            this.searchTabBoardResult(page, startRow)
        },

        // 게시판(인포그래픽) 상세 보기
        goInfographic(url){
            window.open(url)
        },

        // 게시물 탭 정렬 순서 변경
        searchBoardOrder(){
            this.searchTabBoardResult(1, 0)
        },

        // ===== 전체 검색 (전자책)
        async searchEbookResult(currentPage, startPage){
            if(this.findNm == ''){
                this.ebookResultList = []
                this.ebookTotalCnt = 0
                return false
            }

            const param = {
                rows: this.ebookRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'ebook',
                scn: 'ebook'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.ebookResultList = searchList.data

            if(searchList.data.length > 0){
                this.ebookTotalCnt = searchList.data[0].totalCount
            }else{
                this.ebookTotalCnt = 0
            }

            this.ebookPage = currentPage
            this.pageDataSetting(currentPage, this.ebookTotalCnt, this.ebookRows)

        },

        pagingEbookMethod(page) {
            let startRow = page - 1
            this.searchEbookResult(page, startRow)
        },

        // ===== 탭 검색 (전자책)
        async searchTabEbookResult(currentPage, startPage){
            if(this.findNm == ''){
                this.tabEbookResultList = []
                this.tabEbookTotalCnt = 0
                return false
            }

            const param = {
                rows: this.tabEbookRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'ebook',
                scn: 'ebook'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.tabEbookResultList = searchList.data

            if(searchList.data.length > 0){
                this.tabEbookTotalCnt = searchList.data[0].totalCount
            }else{
                this.tabEbookTotalCnt = 0
            }

            this.tabEbookPage = currentPage
            this.pageDataSetting(currentPage, this.tabEbookTotalCnt, this.tabEbookRows)

        },

        pagingTabEbookMethod(page) {
            let startRow = page - 1
            this.searchTabEbookResult(page, startRow)
        },

        // 전자책 상세보기 (팝업)
        goEbook(host, site){
            const url = 'https://ebook.culturestat.mcst.go.kr/src/viewer/main.php?host='+ host + '&site='+ site + '&category=0&page=0&pagenum=0'
            window.open(url)
        },

        // ===== 전체 검색 (MDSS)
        async searchMdssResult(currentPage, startPage){
            if(this.findNm == ''){
                this.mdssResultList = []
                this.mdssTotalCnt = 0
                return false
            }

            const param = {
                rows: this.mdssRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'mdss',
                scn: 'mdss'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.mdssResultList = searchList.data
            // console.log(this.mdssResultList)
            if(searchList.data.length > 0){
                this.mdssTotalCnt = searchList.data[0].totalCount
            }else{
                this.mdssTotalCnt = 0
            }

            this.mdssPage = currentPage
            this.pageDataSetting(currentPage, this.mdssTotalCnt, this.mdssRows)

        },

        pagingMdssMethod(page) {
            let startRow = page - 1
            this.searchMdssResult(page, startRow)
        },

        // ===== 탭 검색 (MDSS)
        async searchTabMdssResult(currentPage, startPage){
            if(this.findNm == ''){
                this.tabMdssResultList = []
                this.tabMdssTotalCnt = 0
                return false
            }

            const param = {
                rows: this.tabMdssRows,
                findNm: this.findNm,
                startPage: startPage,
                typeNm: 'mdss',
                scn: 'mdss'
            }

            const searchList = await searchApi.selectRetrieve(param)
            this.tabMdssResultList = searchList.data

            if(searchList.data.length > 0){
                this.tabMdssTotalCnt = searchList.data[0].totalCount
            }else{
                this.tabMdssTotalCnt = 0
            }

            this.tabMdssPage = currentPage
            this.pageDataSetting(currentPage, this.tabMdssTotalCnt, this.tabMdssRows)

        },

        pagingTabMdssMethod(page) {
            let startRow = page - 1
            this.searchTabMdssResult(page, startRow)
        },

        // 전체 탭 클릭 시
        showTotal(){
            this.searchTabs = 0
        },

        // 통게표 탬 클릭 시
        showStatics(){
            this.searchTabs = 1 // 통계표 탭 on
            this.showStaticResult = true
        },


        // 통계표 새 창 띄우기
        staticDetail(tblMgmNo, path){
            let gubun = 1
            if(path.substr(0,6) === "문화지표통계"){
                gubun = 2
            }
            window.open('/portal/staticPop/' + tblMgmNo + '/' + gubun)
        },

        // 검색결과 클릭 시
        searchResult(){
            this.showStaticResult = true
            this.showDetail = false
        },

        // 상세검색 클릭 시
        searchShowDetail(){
            this.showStaticResult = false
            this.showDetail = true
        },

        // 상세검색 - 검색 버튼 클릭 시
        searchDetail(initGubun) {
            this.detailPageIndex = 0
            this.detailStartPage = 0
            this.detailEndPage = 0
            this.staticsDetailData = []

            if(initGubun) this.statisticsDetailSearchList()
        },

        // 상세검색 - 입력연도 클릭 시
        selectYearString(event){
            var list = [];
            var year = new Date().getFullYear() - 1
            for (let i = year ; i >= 2000 ; i --) list.push(i)
            this.yearList = list

            $(".select-box-btn").parent().next().toggleClass("on");
        },

        // 상세검색 - 입력연도 체크박스 클릭 시
        selectYear(event){
            let tmpYearString = ''
            if(this.checkYearList.length > 0){
                for(let i = 0; i < this.checkYearList.length ; i ++){
                    if(i == 0) tmpYearString += this.checkYearList[i]
                    else tmpYearString += ',' + this.checkYearList[i]
                }
            }else{
                tmpYearString = ''
            }

            this.yearString = tmpYearString

        },

        // 상세검색
        async statisticsDetailSearchList() {
            this.detailPageIndex = this.detailPageIndex + 1
            this.detailStartPage = ((this.detailPageIndex - 1) * this.detailCount) + 1
            this.detailEndPage = this.detailPageIndex * this.detailCount

            const paramData = {
                tblKorNmString: this.tblKorNmString,
                itmKorNmString: this.itmKorNmString,
                yearString: this.yearString,
                startPage: this.detailStartPage,
                endPage: this.detailEndPage
            }

            const datalist = await api.statisticsDetailSearchList(paramData)
            this.totalDetailCnt = datalist.cnt

            if (datalist.data.length > 0) {
                datalist.data.forEach(data => this.staticsDetailData.push(data))
            }

            this.isDetailSearchData = true

            if (datalist.data.length < this.detailCount) {
                this.isDetailSearchData = false
            }
        },

        // 게시물 탭 클릭 시
        showBoard(){
            this.searchTabs = 2
        },

        // 전자책 탭 클릭 시
        showEbook(){
            this.searchTabs = 3
        },

        // MDSS 탭 클릭 시
        showMdss(){
            this.searchTabs = 4
        },
    },
}
</script>

<style scoped>
  .result-title::v-deep b{
      color:#ff6600 !important;
  }

  #subGnb>ul>li:after{
    display:none;
  }

</style>
