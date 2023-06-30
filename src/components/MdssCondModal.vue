<template>
  <div class="modal_cnt" id="modal2" style="display:none;">
    <div class="modal-header">
      <h2>조건 설정</h2>
      <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../assets/img/popup_close.png" alt="닫기"></a>
    </div>
    <div class="modal-content">
      <div class="mdss-grid">
        <div class="mdss-table-wrap modalType">
          <table class="mdss-table modal-type">
            <caption class="ir">조건 설정</caption>
            <colgroup>
              <col style="width:100px">
              <col style="width:100px">
              <col style="">
            </colgroup>
            <thead>
            <tr>
              <!-- <th scope="col" style="width:100px;">
                  <div class="tbl-checkbox-box">
                  <input type="checkbox" id="chk_01">
                  <i></i>
                  <label for="chk_01">선택</label>
                  </div>
              </th> -->
              <th scope="col" style="width:100px">선택</th>
              <th scope="col" style="width:100px">코드값</th>
              <th scope="col" style="width:338px">코드명</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, idx) in modalSettings.conCdList" v-bind:key="idx">
              <td :data-th="idx+1">
                <div class="tbl-checkbox-box">
                  <input type="checkbox" :id="idx+1+'type02'" v-model="checkConCd" :value="data.comCd">
                  <i></i>
                  <label :for="idx+1+'type02'">코드값</label>
                </div>
              </td>
              <td data-th="코드값">{{ data.comCd }}</td>
              <td data-th="코드명">{{ data.cdNm }}</td>
            </tr>
            <tr v-if="modalSettings.conCdList == '' ">
              <td colspan="3">조회된 데이터가 없습니다.</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="btn-layout center">
          <button type="button" class="next-btn" @click.prevent="saveConCd">적용</button>
          <button type="button" class="close-btn" @click.prevent="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdssCondModal',

  props: {
    modalSettings: {}
  },

  data() {
    return {
      checkConCd: [],

    }
  },

  created() {
    this.defaultSetting()
  },


  methods: {
    defaultSetting(){

    },
    closeModal(){
      this.$parent.closeModal()
      this.checkConCd = []
    },
    saveConCd(){
      const checkCond = this.checkConCd
      let checkConCdList = []
      let conCd = ''
      let conCdVal = ''
      let checkGubun = false

      for(let i = 0; i < checkCond.length ; i ++){
        conCd =  "'" + checkCond[i].split(',') + "'"
        checkConCdList.push(conCd)
        conCdVal = checkConCdList.join(",")
      }
      if(checkCond.length != 0){
        checkGubun = true
      }
      this.$parent.saveConCd(conCdVal, checkGubun)

      this.checkConCd = []
    }
  },


}
</script>
<style scoped>
  @media screen and (min-width:0\0){
    .mdss-table.modal-type thead{
      top:19px;
    }
  }
</style>