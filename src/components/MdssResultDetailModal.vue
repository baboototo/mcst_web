<template>
    <div class="modal_cnt" id="modal5" style="display:none;">
        <div class="modal-header">
            <h2>요청 정보</h2>
            <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../assets/img/popup_close.png" alt="닫기"></a>
        </div>
        <div class="modal-content">
            <div class="mdss-grid" v-if="modalMdssResultSettings.mdssResultDetail != null && modalMdssResultSettings.mdssResultDetail.length > 0">
                <table class="mdss-table2">
                    <colgroup>
                        <col style="width:15%;min-width:70px;">
                        <col style="width:25%">
                        <col style="width:15%;min-width:70px;">
                        <col style="width:45%">
                    </colgroup>
                    <tbody>                      
                        <tr>
                            <th scope="row"><label for="">요청번호</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].rqstNo }}</td>
                            <th scope="row"><label for="">이메일</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].email }}</td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="">요청구분</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].rqstGb }}</td>
                            <th scope="row"><label for="">연도</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].creTme }}</td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="">조사명</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].anlClsNm }}</td>
                            <th scope="row"><label for="">요청상태</label></th>
                            <td>{{ modalMdssResultSettings.mdssResultDetail[0].rqstStsNm }}</td>
                        <tr>
                            <th scope="row"><label for="">사용목적</label></th>
                            <td colspan="3">{{ modalMdssResultSettings.mdssResultDetail[0].usePurpose }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="checkbox-wrap" style="width:150px;">
                    <div class="tbl-checkbox-box">                        
                        요청항목조회
                    </div>
                </div> -->
                <div class="mdss-table-wrap mrt20">
                    <table class="mdss-table type02">
                        <colgroup>
                            <col style="width:10%">
                            <col style="width:10%">
                            <col style="width:70%">
                            <col style="width:10%">
                        </colgroup>
                        <thead>
                            <tr style="width:calc(100% - 52px)">
                                <th scope="col" style="width:10%">번호</th>
                                <th scope="col" style="width:10%">형태</th>
                                <th scope="col" style="width:70%">항목</th>
                                <th scope="col" style="width:10%">년도</th>
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="(data, idx) in modalMdssResultSettings.mdssRequestDetail" v-bind:key="idx">
                                <td>{{ data.rownum }}</td>
                                <td data-th="형태">{{ data.cdNm }}</td>
                                <td data-th="항목" class="text-align-left"><div class="entry-txt">{{ data.itmNm }}</div></td>
                                <td data-th="년도">{{ data.creTme }}</td>
                            </tr>
                            <tr v-if="modalMdssResultSettings.mdssRequestDetail == '' " class="nondata">
                                <td colspan="4">조회된 데이터가 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    name: 'MdssResultDetailModal',

    props: {
      modalMdssResultSettings: {}
    },

    data() {
        return {
                   
        }
    },

    created() {
        
    },


    methods: {        
        closeModal(){
            this.$parent.closeModal()            
        },
        
    },

    
}
</script>
<style scoped>
    .modal-content .mdss-table2 tr th,
    .modal-content .mdss-table2 tr td{
        font-size:15px;
    }
    @media screen and (max-width:768px){
        .modal-content .mdss-table2 tr th,
        .modal-content .mdss-table2 tr td{
            font-size:14px
        }
        .mdss-table tbody tr td{
            font-size:14px !important
        }
        .modal-content .mdss-grid {
            height: calc(100vh - 107px);
            overflow-y: auto;
        }
    }
/* #ebebeb color: #828195;*/

.mdss-table2 tbody tr{
    border-width: 1px 0 1px 0;
    border-style: solid;
    border-color: #ebebeb;
    outline: 0;
}
.mdss-table2 tbody tr th{
    background-color:#ebebeb;
}
.mdss-table2 tbody tr td{
    color:#828195;
    word-break: break-all;
}
.mdss-table2 tbody tr th,
.mdss-table2 tbody tr td{
    padding:10px;
}
</style>