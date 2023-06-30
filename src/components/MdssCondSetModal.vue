<template>
  <div class="modal_cnt" id="modal3" style="display:none;">
    <div class="modal-header">
      <h2>조건 설정</h2>
      <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../assets/img/popup_close.png" alt="닫기"></a>
    </div>
    <div class="modal-content">
      <div class="mdss-grid">
        <div class="checkbox-wrap" style="width:150px;">
        </div>
        <div class="mdss-table-wrap">
          <table class="mdss-table if-table type03">
            <caption class="ir">조건 설정</caption>
            <colgroup>
              <col style="width:100px;">
              <col style="">
            </colgroup>
            <tbody>
            <tr>
              <th scope="row" style="background-color:transparent">
                <div class="search-wrap pd0">
                  <div class="search-box align-center">
                    <label class="ir" for="n1stConCd">조건1</label>
                    <select name="n1stConCd" id="n1stConCd" v-model="n1stConCd">
                      <option :value="data.comCd" v-for="(data, idx) in modalConsetSettings.grpCdList" v-bind:key="idx">{{ data.cdNm }}</option>
                    </select>
                  </div>
                </div>
              </th>
              <td>
                <div class="search-wrap">
                  <div class="search-box">
                    <label class="ir" for="n1stConVal">조건1-txtbox</label>
                    <input type="text" v-model="n1stConVal" id="n1stConVal">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" style="background-color:transparent">
                <div class="search-wrap pd0">
                  <div class="search-box align-center">
                    <label class="ir" for="cnctConCd">조건2</label>
                    <select name="cnctConCd" id="cnctConCd" v-model="cnctConCd">
                      <option value=" "></option>
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                </div>
              </th>
              <td>
                <div class="search-wrap">
                  <div class="search-box">
                    <label class="ir" for="txtbox2">조건2-txtbox</label>
                    <input type="text" disabled id="txtbox2">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" style="background-color:transparent">
                <div class="search-wrap pd0">
                  <div class="search-box align-center">
                    <label class="ir" for="n2ndConCd">조건3</label>
                    <select name="n2ndConCd" id="n2ndConCd" v-model="n2ndConCd">
                      <option :value="data.comCd" v-for="(data, idx) in modalConsetSettings.grpCdList" v-bind:key="idx">{{ data.cdNm }}</option>
                    </select>
                  </div>
                </div>
              </th>
              <td>
                <div class="search-wrap">
                  <div class="search-box">
                    <label class="ir" for="n2ndConVal">조건3-txtbox</label>
                    <input type="text" v-model="n2ndConVal" id="n2ndConVal">
                  </div>
                </div>
              </td>
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
  name: 'MdssCondSetModal',

  props: {
    modalConsetSettings: {}
  },

  data() {
    return {
      n1stConCd: ' ',
      n1stConVal: ' ',
      cnctConCd: ' ',
      n2ndConCd: ' ',
      n2ndConVal: ' ',
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
      this.resetData()
    },
    saveConCd(){
      if((this.n1stConCd != ' ' && this.n1stConVal == ' ') || (this.n1stConCd == ' ' && this.n1stConVal != ' ')){
        alert('조건을 입력해주세요')
        return false
      }

      if(this.cnctConCd != ' ' && (this.n1stConCd == ' ' || this.n1stConVal == ' ')){
        alert('조건을 입력해주세요')
        return false
      }

      if(this.cnctConCd != ' ' && (this.n2ndConCd == ' ' || this.n2ndConVal == ' ')){
        alert('조건을 입력해주세요')
        return false
      }

      if(this.n2ndConCd != ' ' && this.n2ndConVal != ' '){
        if(this.cnctConCd == ' ' || this.n1stConCd == ' ' || this.n1stConVal == ' '){
          alert('조건을 입력해주세요')
          return false
        }
      }

      if((this.n2ndConCd != ' ' && this.n2ndConVal == ' ') || (this.n2ndConCd == ' ' && this.n2ndConVal != ' ')){
        alert('조건을 입력해주세요')
        return false
      }

      this.$parent.saveCondSet(this.n1stConCd, this.n1stConVal, this.cnctConCd, this.n2ndConCd, this.n2ndConVal)
      this.$parent.closeModal()
      this.resetData()
    },

    resetData(){
      this.n1stConCd = ' '
      this.n1stConVal = ' '
      this.cnctConCd = ' '
      this.n2ndConCd = ' '
      this.n2ndConVal = ' '
    }
  },


}
</script>
<style scoped>
  @media only screen and (max-width: 768px){
  _::-webkit-full-page-media, _:future, :root .mdss-table.type03 tbody tr td{
    width:calc(100vw - 160px) !important;
  } 
}
</style>