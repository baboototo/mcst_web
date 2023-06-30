<template>
    <div class="search-result-wrap">
        <div class="search-deatail">
            <table class="search-deatail-table">
            <caption class="ir">상세검색</caption>
            <colgroup>
                <col>
                <col>
            </colgroup>
            <tbody>
            <tr>
                <th scope="row">통계표</th>
                <td>
                <label class="label-hidden">
                    <input type="text" id="tblKorNmString" v-model="tblKorNmString" v-on:keyup.enter="searchDetail(true)" placeholder="통계명 중 포함된 단어를 검색, 여러 단어일경우에는 ','로 붙여서 입력">
                </label>
                </td>
            </tr>
            <tr>
                <th scope="row">항목명</th>
                <td>
                <label class="label-hidden">
                    <input type="text" id="itmKorNmString" v-model="itmKorNmString" v-on:keyup.enter="searchDetail(true)" placeholder="항목이 포함된 단어를 검색, 여러 단어일 경우에는 ','로 붙여서 입력">
                </label>
                </td>
            </tr>
            <tr>
                <th scope="row">입력연도</th>
                <td>
                <label class="label-hidden">
                    <input type="text" class="select-box-btn" v-model="yearString" @click.prevent="selectYearString($event)" placeholder="클릭해서 연도를 선택해주세요">
                </label>
                <div class="select-box-yy" id="selectBoxYY">
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
                <a href="#/" @click="staticDetail(data.tblMgmNo)">
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
</template>

<script>
import * as api from '@/api/Statistics.js'
import $ from 'jquery'

export default {
    name: "SearchDetail",

    data() {
        return {
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
        }
    },

    props: {        
        statId: {
            type: String,
            required: true
        }
    },

    methods: {
        // 상세검색 검색 버튼 클릭 시
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
            // console.log(this.checkYearList)
            let tmpYearString = ''
            if(this.checkYearList.length > 0){
                for(let i = 0; i < this.checkYearList.length ; i ++){
                // console.log(this.checkYearList[i])
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
                levelId2: this.statId,
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


        }
    }
}
</script>

<style scoped>
</style>