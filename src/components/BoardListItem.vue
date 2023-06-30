<!-- 공지사항 게시판 리스트 -->
<template>
  <div class="notice-list type02">
		<ul class="notice-list-inner">
			<li v-for="(data, idx) in boardListData" v-bind:key="idx">
				<a href="javascript:;" @click.prevent="showDetailView(data.boardId, data.boardType, data.orderRowNum)">
					<div class="notice-content">
						<h3>{{ data.boardtitle }}</h3>
						<p v-html="data.boardDescription"></p>
					</div>
          <div class="align-start">
            <div class="notice-date">
              <p class="year">{{ data.dateYy }}</p>
              <p class="mmdd">{{ data.dateMm }}.{{ data.dateDd }}</p>
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

export default {
	name: 'BoardListItem',
	data(){
		return {
      isNoBoardData: false
    }
	},
  props: {
    boardListData: {
      type: Array,
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
    showDetailView(boardId, boardType, orderRowNum) {
      this.$emit("showDetailView", boardId, boardType, orderRowNum)
    },

    // 파일 다운로드
    async fileDownload(data) {
      let fileMgmNo = ''
      for (const fileData of data['attachFileList']) {
        if (fileData['fileTypeCd'] === 'pdf') {
          fileMgmNo = fileData.fileMgmNo
        } else if (fileData['fileTypeCd'] === 'hwp') {
          fileMgmNo = fileData.fileMgmNo
          break;
        }
      }

      // 파일 다운로드 파라미터 설정
      const params = {
        type: 'board',
        boardId: data.boardId,
        fileMgmNo: fileMgmNo
      }

      // 파일 다운로드 호출
      await file.download(params)
    },
  }
}
</script>

<style scoped>
  
</style>
