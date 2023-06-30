<template>
  <div class="notice-list stat">
    <ul class="notice-list-inner">
	  <li v-for="(data, idx) in boardListData" v-bind:key="idx" v-show="!isNoBoardData">
	    <a href="#">
		  <div class="notice-content" @click.prevent="moveSrvyPage( data.designTpCd, data.rschSeqNo )">
		    <h3>{{ data.rschNm }}</h3>
<!--        <span v-html="data.rschTpNm"></span> 조사구분 -->
			<span v-html="data.rschStNm"></span>
		  </div>
		  <div class="views">
<!--        <p class="year">{{ data.rschStNm }}</p> 설문완료여부 -->
	        <p class="year">설문기간</p>
			<p class="mmdd">{{ data.rschDte }}</p>
		  </div>
		</a>
	  </li>
	  <li v-show="isNoBoardData">
	    <a href="#" class="non-data">
		  <div class="notice-content">
		    <strong>게시글이 존재하지 않습니다. {{boardListData.length}}</strong>
		  </div>
		</a>
	  </li>
	</ul>
  </div>
</template>

<script>
import * as api from '@/api/Notice.js'

export default {
  name: 'SrvyBoardListItem',

  data(){
    return {
	  isNoBoardData: false
	}
  },

  props: {
    boardListData: {
      type: Array,
      required: true
    },
	searchText: {
	  type: String,
	  required: true
	}
  },

  watch: {
    boardListData: function() {
	  if (this.boardListData.length > 0) {
	    this.isNoBoardData = false
	  } else {
	    this.isNoBoardData = true
	  }
	}
  },

  methods: {
    // 설문조사 화면 이동
	async moveSrvyPage (designTpCd, rschSeqNo) {
	  const paramData = {
        rschSeqNo: rschSeqNo
	  }
	  await api.searchSrvyDetail(paramData)

	  var openUrl = ""
	  if (designTpCd == "f") {
	    openUrl = 'https://stat.mcst.go.kr/mcst/srvy/web_a.html?seq=W_' + rschSeqNo
	  } else {
		openUrl = 'https://stat.mcst.go.kr/mcst/srvy/web.html?seq=W_' + rschSeqNo
	  }
	  window.open(openUrl, '_blank')
	}
  }
}
</script>

<style scoped>
.notice-content:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
