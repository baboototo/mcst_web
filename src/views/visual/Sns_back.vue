<template>
  <div class="layout">
    <div class="sns-wrap">
      <table class="sns-table">
        <caption></caption>
        <colgroup>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <tbody>
        <tr>
          <th><label for="">검색키워드</label></th>
          <td><input type="search" v-model="keyword"></td>
          <th><label for="">수집일자</label></th>
          <td>
            <input type="date" v-model="startDate">
            <i class="tilde">~</i>
            <input type="date" v-model="endDate">
            <button type="button" class="btn default" style="vertical-align: middle;" @click="clickSearch">조회</button>
          </td>
        </tr>
        <tr>
          <th><label for="">채널</label></th>
          <td colspan="3">
            <div class="align-between">
              <div class="align-around" style="display: inline-flex;">
                <div class="radio-box">
                  <input type="checkbox" v-model="channel" @change="changeChannelAll($event)" value="">
                  <label for="">전체</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channel"  @change="changeChannel($event)" value="10">
                  <label for="">뉴스</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channel"  @change="changeChannel($event)" value="20">
                  <label for="">블로그/카페</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channel"  @change="changeChannel($event)" value="30">
                  <label for="">트위터</label>
                </div>
              </div>
              <div class="align-start" style="display: inline-flex;">
                <a href="javascript:;" class="data-tab-btn" :class="{on: tabIndex == 0}" @click="clickTab(0)">키워드분석</a>
                <a href="javascript:;" class="data-tab-btn" :class="{on: tabIndex == 1}" @click="clickTab(1)">연관어분석</a>
                <a href="javascript:;" class="data-tab-btn" :class="{on: tabIndex == 2}" @click="clickTab(2)">감성분석</a>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="align-between" style="flex-wrap: wrap;" v-show="tabIndex === 0">
        <WordCloud></WordCloud>
        <div class="data-box half">
          <h3>채널별추이</h3>
          <VChart :option="channelPieCharOption" style="height: 500px;" :loading="false"></VChart>
        </div>
        <div class="data-box half">
          <h3>수집추이</h3>
          <VChart :option="channelDataAreaZoomChartOption" style="height: 500px;" :loading="false"></VChart>
        </div>
        <div class="data-box full">
          <h3>리스트</h3>
          <i></i>
          <div class="sns-option-wrap">
            <select>
              <option value="">70</option>
              <option value="">100</option>
            </select>
            <input type="search" placeholder="검색어입력">
          </div>
        </div>
      </div>
      <div class="align-between" style="flex-wrap: wrap;" v-show="tabIndex === 1">
        <div class="data-box half">
          <h3>연관어 리스트</h3>
          <i></i>
        </div>
        <div class="data-box half">
          <h3>연관어 채널별 추이 - 지역</h3>
          <VChart :option="hotKeywordDataAreaZoomChartOption" style="height: 500px;" :loading="false"></VChart>
          <i></i>
        </div>
        <div class="data-box full">
          <h3>최근 4주간 연관어 추이</h3>
          <i></i>
          <div class="sns-option-wrap">
            <select name="" id="">
              <option value="">70</option>
              <option value="">100</option>
            </select>
            <input type="search" placeholder="검색어입력">
          </div>
        </div>
      </div>
      <div class="align-between" style="flex-wrap: wrap;" v-show="tabIndex === 2">
        <div class="data-box half">
          <h3>감성 연관어</h3>
          <VChart :option="sentimentalBubbleChartOption" style="height: 500px;" :loading="false"></VChart>
        </div>
        <div class="data-box half">
          <h3>감성어 랭킹</h3>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/Sns";
import WordCloud from '../../components/sns/WordCloud'
import VChart from "vue-echarts"
import eChartUtils from "../../assets/js/chartUtils"
import eChartOption from "../../assets/js/chartOption"

export default {
  name: "Sns",
  components: {
    WordCloud,
    VChart
  },
  data() {
    return {
      chart: {},
      keyword: '관광',
      startDate: '2021-11-04',
      endDate: '2021-11-14',
      channel: ['', '10', '20', '30'],
      tabIndex: 2,
      channelPieCharOption: {},
      channelDataAreaZoomChartOption: {},
      hotKeywordDataAreaZoomChartOption: {},
      sentimentalBubbleChartOption: {},
      searchParams: {
        channels: "10,20,30",
        endDate: "20211108",
        keyword: "관광",
        recentStartDate: "20211008",
        rowCount: 70,
        startDate: "20211102",
        useExcludeKeyword: "Y",
        useExcludeSearchKeyword: "Y",
      },
      option1: {}
    }
  },
  computed: {
  },
  watch: {},
  created() {
    this.searchChannelPieChart()
    this.searchChannelDataAreaZoomChart()
    this.searchHotKeyWordDataAreaZoomChart()
    this.searchSentimentalAnalysisEChartApi()
  },
  methods: {
    clickSearch() {

    },

    changeChannelAll(event) {
      if (event.target.checked) {
        this.channel = ['', '10', '20', '30']
      } else {
        this.channel = []
      }
    },

    changeChannel(event) {
      if (event.target.checked) {
        if (this.channel.length >= 3) {
          this.channel = ['', '10', '20', '30']
        }
      } else {
        const idx = this.channel.indexOf('')
        if (idx > -1) this.channel.splice(idx, 1)
      }
    },

    clickTab(index) {
      this.tabIndex = index
    },


    async searchChannelPieChart() {
      const resultData = await api.searchChannelCollectionSumApi(this.keyword, this.searchParams)
      if (resultData) {
        this.channelPieCharOption = eChartOption.channelPieChart()
        let channelSum = eChartUtils.chartValueSum(resultData["series"])
        this.channelPieCharOption.title.text = eChartUtils.addNumberComma(channelSum) + "건"
        this.channelPieCharOption.legend.data = resultData["legend"]
        this.channelPieCharOption.toolbox.feature.magicType.option.funnel.max = channelSum
        this.channelPieCharOption.series[0].data = resultData["series"]
      }
      // this.option.series[0].data = searchData
      // this..setOptiochartn(this.option)
    },

    async searchChannelDataAreaZoomChart() {
      const resultData = await api.searchChannelCollectionApi(this.keyword, this.searchParams)
      if (resultData) {
        this.channelDataAreaZoomChartOption = eChartOption.dataAreaZoom()
        this.channelDataAreaZoomChartOption.legend.data = resultData["legend"]
        this.channelDataAreaZoomChartOption.xAxis[0].data = resultData["xaxis"]
        this.channelDataAreaZoomChartOption.series = resultData["series"]
      }
    },

    async searchHotKeyWordDataAreaZoomChart() {
      const resultData = await api.searchChannelCollectionApi(this.keyword, this.searchParams)
      if (resultData) {
        this.hotKeywordDataAreaZoomChartOption = eChartOption.dataAreaZoom()
        this.hotKeywordDataAreaZoomChartOption.legend.data = resultData["legend"]
        this.hotKeywordDataAreaZoomChartOption.xAxis[0].data = resultData["xaxis"]
        this.hotKeywordDataAreaZoomChartOption.series = resultData["series"]
      }
    },

    async searchSentimentalAnalysisEChartApi() {
      const resultData = await api.searchSentimentalAnalysisEChartApi(this.keyword, this.searchParams)
      if (resultData) {
        const pColor = {normal : {color : "#bddaf5"}}
        const nColor = {normal : {color : "#fbd1ad"}}
        const cLabel = {color : "#1e1e1e", fontWeight : 'bold'}
        const maxSymbolSize = 155

        let chartSeriesData = resultData["series"]
        let symbolMaxIdx = 0
        const maxData = chartSeriesData[0].value

        for (const data of chartSeriesData) {
          data.draggable = true
          data.label = cLabel

          if (data.gbn === "긍정") {
            data.itemStyle = pColor
            data.category = 0
          } else {
            data.itemStyle = nColor
            data.category = 1
          }

          // 데이터 배수 구하기
          const times = Math.floor(Number(maxData)/data.value * 100)/100;
          if (times >= 1 && times <= 1.1) {
            data.symbolSize = maxSymbolSize
          } else if (times > 1.1 && times <= 1.13) {
            data.symbolSize = Math.round(170/times)
          } else if (times > 1.13 && times <= 1.5) {
            data.symbolSize = Math.round(160/times)+10
          } else if (times > 1.5) {
            data.symbolSize = Math.round(140/times)+25
          }

          if (data.symbolSize > 100) {
            symbolMaxIdx++
          }
        }

        if (symbolMaxIdx >= 5) {
          for (const resetData of chartSeriesData) {
            resetData.symbolSize = resetData.symbolSize - 20;
          }
        }

        this.sentimentalBubbleChartOption = eChartOption.bubbleChart()
        this.sentimentalBubbleChartOption.series[0].data = chartSeriesData
      }
    },

  },


}
</script>

<style scoped>

</style>
