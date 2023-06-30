<template>
  <div id="wrapper">
    <main id="container">
      <section class="content-wrap">
        <article class="sub-content">
          <div class="layout">
            <div class="align-center" style="height:calc(100vh);">
              <img id="errorImg" :src="errorImage" alt="서비스 이용에 불편을 드려 죄송합니다. 좀더나은 서비스를 위해 서버를 점검중입니다. 잠시 후에 서비스를 이용해 주시면 감사하겠습니다.">
              <a href="javascript:;" class="btn gray" @click="clickGoMain">홈으로 가기</a>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    clickGoMain() {
      this.$router.push('/')
    }
  },
  data() {
    return {
      errorImage: require('../../assets/img/error.png'),
    }
  },
}

</script>

<style scoped>
#errorImg{
  width:100%;
}
</style>
