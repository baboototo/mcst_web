<template>
  <div class="page_wrap">
    <div class="page_nation align-center" v-if="pageSetting.list.length">
        <a class="arrow pprev" href="#" @click.prevent="sendPage(1)">
          <img src="../assets/img/paging_pprev.png" alt="맨앞으로">
        </a>
        <a class="arrow prev" href="#" @click.prevent="pageSetting.first !== null ? sendPage(pageSetting.first) : ''">
          <img src="../assets/img/paging_left.png" alt="이전으로">
        </a>

        <a href="#" :class="{ active: page == pageSetting.currentPage }" v-for="page in pageSetting.list" :key="page" @click.prevent="sendPage(page)">{{ page }}</a>

        <a class="arrow next" href="#" @click.prevent="pageSetting.end !== null ? sendPage(pageSetting.end) : ''">
          <img src="../assets/img/paging_right.png" alt="다음으로">
        </a>
        <a class="arrow nnext" href="#" @click.prevent="pageSetting.totalPage !== null ? sendPage(pageSetting.totalPage) : ''">
          <img src="../assets/img/paging_nnext.png" alt="맨마지막으로">
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPagination',
  props: {
    pageSetting: {}
  },
  methods: {
    sendPage(page) {
      this.$emit("paging", page)
    }
  },
}
</script>
