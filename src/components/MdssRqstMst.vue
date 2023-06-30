<template>
    <div class="mdss-grid" > <!--v-show="rqstMstetting.rqstMstShow === 1" -->
        <div class="stat-type-head align-end">
            <button type="button" class="puple btn" @click.prevent="backMdssList">MDSS 요청</button>
        </div>
        <div class="mdss-table-wrap">
            <table class="mdss-table">
              <caption>이력보기테이블</caption>
                <colgroup>
                    <col style="width:7%">
                    <col style="width:7%">
                    <col style="width:calc(52% - 110px)">
                    <col style="width:7%">
                    <col style="width:7%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width:110px">
                </colgroup>
                <thead>
                    <tr style="width:calc(100% - 70px)">
                        <th scope="col" style="width:7%">요청번호</th>
                        <th scope="col" style="width:7%">요청구분</th>
                        <th scope="col" style="width:calc(52% - 110px)">조사명</th>
                        <th scope="col" style="width:7%">연도</th>
                        <th scope="col" style="width:7%">요청상태</th>
                        <th scope="col" style="width:10%">요청일시</th>
                        <th scope="col" style="width:10%">처리일자</th>
                        <th scope="col" style="width:110px">다운로드</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, idx) in rqstMstetting.mdssRqstList" v-bind:key="idx">
                        <td><a href="#" class="md_open_btn" @click.prevent="openMdssResultDetail(data.rqstNo)">{{ data.rqstNo }}</a></td>
                        <td>{{ data.rqstGb }}</td>
                        <td data-th="조사명">{{ data.anlClsNm }}</td>
                        <td data-th="연도">{{ data.creTme }}</td>
                        <td data-th="요청상태">{{ data.rqstStsNm }}</td>
                        <td>{{ data.regDt }}</td>
                        <td>{{ data.cmpltDte }}</td>
                        <td><button type="button" class="tbl-btn" @click.prevent="mdssResultDownload(data.rqstNo)">파일</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import * as file from '@/api/common/file.js'

export default {
    name: 'MdssRqstMst',

    props: {
      rqstMstetting: {}
    },

    data() {
        return {


        }
    },
    methods: {
        backMdssList(){
            this.$parent.rqstMstShow = 0
        },

        async mdssResultDownload(rqstNo){
            const downParams = {
                type: 'MDSS_EXPORT',
                rqstNo: rqstNo
            }

            await file.download(downParams)
        },

        openMdssResultDetail(rqstNo){
            this.$parent.mdssResultDetailInfo(rqstNo)
        }

    },


}
</script>
