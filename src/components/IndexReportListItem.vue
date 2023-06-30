<!-- 지표보고서, 기타자료실 게시판 리스트 -->
<template>
  <div class="notice-list stat">
    <ul class="notice-list-inner">
      <li v-for="(data, idx) in boardListData" v-bind:key="idx">
        <a href="javascript:;" @click.prevent="showDetailView(data.boardId, data.boardType, data.orderRowNum)">
          <div class="notice-content">
            <h3>{{ data.boardtitle }}</h3>
            <span v-html="data.stblTypeNm"></span>
          </div>
          <div class="align-start">
            <div class="stat-down" v-if="data.attachFileList">
              <div v-for="(fileData, idx) in data.attachFileList" :key="idx">
                <button type="button" class="fileBtn" v-if="idx==0" @click.stop="fileDownload(fileData.fileMgmNo)" :title="fileData.fileNm">{{ fileData.fileTypeCd }}</button>
              </div>
            </div>
            <div class="notice-date">
              <p class="year">{{ data.dateYy }}</p>
              <p class="mmdd">{{ data.dateMm }}.{{ data.dateDd }}</p>
            </div>
            <div class="views">
              <p class="year">조회수</p>
              <p class="mmdd">{{ data.srchCnt }}</p>
            </div>
		      </div>
		    </a>
	    </li>
      <li v-show="isNoBoardData">
        <a href="#" class="non-data">
          <div class="notice-content">
            <strong>게시글이 존재하지 않습니다.</strong>
          </div>
        </a>
      </li>
	  </ul>
  </div>
</template>

<script>
import * as file from '@/api/common/file.js'
import * as staticApi from '@/api/Statistics.js'

export default {
  name: 'IndexReportListItem',

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
    },
    boardName: {
      type: String,
      required: true
    },
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
    // 게시판 상세보기
	showDetailView(boardId, boardType, orderRowNum) {
      this.$emit("showDetailView", boardId, boardType, orderRowNum)
    },

	// 파일 다운로드
	async fileDownload(data) {
	  let fileMgmNo = data

	  // 파일 다운로드 파라미터 설정
	  const params = {
	    type: 'board',
		boardId: data.boardId,
		fileMgmNo: fileMgmNo
	  }

	  // 파일 다운로드 호출
	  await file.download(params)

    //파일 다운로드 로그
    const logParams = {
      downMenu: this.boardName,
      downCntn: fileMgmNo
    }
    await staticApi.insertExcelDownLog(logParams)
	},
  }
}
</script>

<style scoped>
.notice-list-inner li:hover {
  cursor: pointer;
}

.fileBtn {
  text-transform: uppercase;
}
</style>
