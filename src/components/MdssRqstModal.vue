<template>
  <div class="modal_cnt" id="modal4" style="display:none;">
    <div class="modal-header">
      <h2>입력정보 확인</h2>
      <a href="#" class="close_btn" @click.prevent="closeModal"><img src="../assets/img/popup_close.png" alt="닫기"></a>
    </div>
    <div class="modal-content">
      <div class="mdss-grid">
        <table class="">
          <caption class="ir">입력정보 확인</caption>
          <colgroup>
            <col style="width:25%">
            <col>
          </colgroup>
          <tbody>
          <tr>
            <th scope="row"><label for="emailConfirm"><span style="color: red">*</span> 이메일</label></th>
            <td>
              <div class="search-wrap" style="width:100%">
                <div class="search-box" style="width:100%">
                  <input type="text" style="width:100%" ref="emailConfirm" id="emailConfirm" v-model="emailConfirm">
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row"><label for="pwConfirm"><span style="color: red">*</span> 비밀번호</label></th>
            <td>
              <div class="search-wrap" style="width:100%">
                <div class="search-box" style="width:100%">
                  <input type="password" style="width:100%" ref="pwConfirm" v-model="pwConfirm" id="pwConfirm">
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <p class="guide-txt">* 비밀번호는 요청시 입력했던 숫자 4자리를 입력해주시기 바랍니다.</p>
        <p class="guide-txt"><span style="color: red">*</span> 는 필수 입력항목입니다.</p>
        <div class="btn-layout center">
          <button type="button" class="next-btn" @click.prevent="save">적용</button>
          <button type="button" class="close-btn" @click.prevent="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdssRqstModal',

  props: {

  },

  data() {
    return {
      emailConfirm: '',
      pwConfirm: '',

    }
  },
  methods: {

    closeModal(){
      this.$parent.closeModal()
      this.resetData()
    },
    save(){
      if(this.emailConfirm == ''){
        alert('요청서 작성시 입력했던 이메일주소를 입력해주시기 바랍니다.')
        this.$refs.emailConfirm.focus()
        return false
      }
      if(this.pwConfirm == ''){
        alert('요청서 작성시 입력했던 비밀번호 숫자4자리를 입력해주시기 바랍니다.')
        this.$refs.pwConfirm.focus()
        return false
      }
      this.$parent.mdssRqstList(this.emailConfirm, this.pwConfirm)

      this.$parent.closeModal()
      this.resetData()
    },

    resetData(){
      this.emailConfirm = ''
      this.pwConfirm = ''
    }
  },


}
</script>
<style scoped>
  .mdss-grid table td{
    padding:5px 0 !important; 
  }
  .search-wrap .search-box{
    display: block !important;
  }
  @media only screen and (max-width: 768px){
    .mdss-grid table th{
      font-size: 14px;
    }
  }
</style>
