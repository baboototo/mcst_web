<template>
  <div class="meta-data" v-if="metaInfoList != null && metaInfoList.length > 0">
    <table>
      <caption class="ir">메타정보테이블</caption>
      <colgroup>
        <col>
        <col>
      </colgroup>
      <tbody>
      <tr>
        <th scope="row">통계명</th>
        <td v-html="metaInfoList[0].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">현재자료기준연도</th>
        <td v-html="metaInfoList[14].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">입력예정연도</th>
        <td v-html="metaInfoList[15].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">통계종류</th>
        <td v-html="metaInfoList[1].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">법적근거</th>
        <td v-html="metaInfoList[2].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사목적</th>
        <td v-html="metaInfoList[3].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사주기</th>
        <td v-html="metaInfoList[4].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사대상</th>
        <td v-html="metaInfoList[5].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사방법</th>
        <td v-html="metaInfoList[6].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사기간</th>
        <td v-html="metaInfoList[7].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">조사내용</th>
        <td v-html="metaInfoList[8].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">작성체계</th>
        <td v-html="metaInfoList[9].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">최신자료</th>
        <td v-html="metaInfoList[10].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">자료검색</th>
        <td v-html="metaInfoList[11].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">담당기관</th>
        <td v-html="metaInfoList[12].metaContents"></td>
      </tr>
      <tr>
        <th scope="row">이용시 유의점</th>
        <td v-html="metaInfoList[13].metaContents"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MetaInfo",
  props: {
    metaInfoList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>

</style>
