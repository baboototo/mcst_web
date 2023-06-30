<template>
  <div class="layout">
    <div class="sns-wrap">
      <table class="sns-table">
        <caption></caption>
        <colgroup>
          <col style="width:100px;">
          <col>
          <col style="width:100px;">
          <col>
        </colgroup>
        <tbody>
        <tr>
          <th scope="row" style="width:100px;"><label for="searchWord">검색키워드</label></th>
          <td><input type="search" v-model="keyword" id="searchWord"></td>
          <th scope="row" style="width:100px;"><label for="dataGetDate">수집일자</label></th>
          <td>
            <input type="date" v-model="startDate" id="dataGetDate">
            <i class="tilde">~</i>
            <label for="dataGetDate2" class="ir">까지</label>
            <input type="date" v-model="endDate" id="dataGetDate2">
            <button type="button" class="btn default" style="vertical-align: middle;" @click="searchSnsData">조회</button>
          </td>
        </tr>
        <tr>
          <th scope="row" style="width:100px;"><label for="">채널</label></th>
          <td colspan="3">
            <div class="align-between">
              <div class="align-around" style="display: inline-flex;">
                <div class="radio-box">
                  <input type="checkbox" v-model="channels" id="channels1" @change="changeChannelAll($event)" value="">
                  <label for="channels1">전체</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channels" id="channels2" @change="changeChannel($event)" value="10">
                  <label for="channels2">뉴스</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channels" id="channels3" @change="changeChannel($event)" value="20">
                  <label for="channels3">블로그/카페</label>
                </div>
                <div class="radio-box">
                  <input type="checkbox" v-model="channels" id="channels4" @change="changeChannel($event)" value="30">
                  <label for="channels4">트위터</label>
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
      <div class="align-between" v-show="tabIndex == 0" style="flex-wrap: wrap;">
        <WordCloud ref="refWordCloud" :searchParams="searchParams" ></WordCloud>
        <div class="data-box half">
          <h3>채널별추이</h3>
          <VChart :option="channelPieCharOption" style="height: 500px;"  autoresize :loading="isLoadingChannelPieChar"></VChart>
        </div>
        <div class="data-box half">
          <h3>수집추이</h3>
          <VChart :option="channelDataAreaZoomChartOption" style="height: 500px;" autoresize :loading="isLoadingChannelDataAreaZoomChart"></VChart>
        </div>
        <div class="data-box full">
          <h3>리스트</h3>
          <div class="sns-option-wrap">
            <label for="webDocumentFindInput" class="ir">검색창</label>
            <input type="search" v-model="webDocumentFindInput" id="webDocumentFindInput" placeholder="검색어입력">
          </div>
          <div style="padding: 70px 10px 10px 10px;">
            <Grid ref="webDocumentGrid"
                  :theme="webDocumentGrid.snsTheme"
                  :options="webDocumentGrid.options"
                  :data="webDocumentGrid.data"
                  :columns="webDocumentGrid.columns"
                  @mouseover="mouseoverWebDocument"
                  @mouseout="mouseoutWebDocument"
                  @click="clickWebDocument"></Grid>
          </div>

        </div>
      </div>
      <div class="align-between" v-show="tabIndex == 1" style="flex-wrap: wrap;" >
        <div class="data-box half">
          <h3>연관어 리스트</h3>
          <div style="padding: 10px;position: relative; z-index: 100;">
            <Grid ref="hotKeywordGrid"
                  :theme="hotKeywordGrid.snsTheme"
                  :options="hotKeywordGrid.options"
                  :data="hotKeywordGrid.data"
                  :columns="hotKeywordGrid.columns"
                  @expand="expandHotKeywordGrid" @collapse="collapseHotKeywordGrid" @click="clickHotKeywordGrid"></Grid>
          </div>
        </div>
        <div class="data-box half">
          <h3>연관어 채널별 추이 - {{ selectedHotKeywordName }}</h3>
          <VChart :option="hotKeywordDataAreaZoomChartOption" autoresize style="height: 500px;" :loading="isLoadingHotKeywordDataAreaZoomChartOption"></VChart>
        </div>
        <div class="data-box full">
          <h3>최근 4주간 연관어 추이</h3>
          <div style="" class="recentMonth-wrap">
            <div style="width: 25%;" class="recentMonth">
              <span ref="recentMonthGrid1Date"></span>
              <Grid ref="recentMonthGrid1"
                    :theme="recentMonthGrid1.snsTheme"
                    :options="recentMonthGrid1.options"
                    :data="recentMonthGrid1.data"
                    :columns="recentMonthGrid1.columns"
                    @mouseover="mouseover" @mouseout="mouseout" @click="click"
              ></Grid>
            </div>
            <div style="width: 25%;" class="recentMonth">
              <span ref="recentMonthGrid2Date"></span>
              <Grid ref="recentMonthGrid2"
                    :theme="recentMonthGrid2.snsTheme"
                    :options="recentMonthGrid2.options"
                    :data="recentMonthGrid2.data"
                    :columns="recentMonthGrid2.columns"
                    @mouseover="mouseover" @mouseout="mouseout" @click="click"
              ></Grid>
            </div>
            <div style="width: 25%;" class="recentMonth">
              <span ref="recentMonthGrid3Date"></span>
              <Grid ref="recentMonthGrid3"
                    :theme="recentMonthGrid3.snsTheme"
                    :options="recentMonthGrid3.options"
                    :data="recentMonthGrid3.data"
                    :columns="recentMonthGrid3.columns"
                    @mouseover="mouseover" @mouseout="mouseout" @click="click"
              ></Grid>
            </div>

            <div style="width: 25%;" class="recentMonth">
              <span ref="recentMonthGrid4Date"></span>
              <Grid ref="recentMonthGrid4"
                    id="apple"
                    :theme="recentMonthGrid4.snsTheme"
                    :options="recentMonthGrid4.options"
                    :data="recentMonthGrid4.data"
                    :columns="recentMonthGrid4.columns"
                    @mouseover="mouseover" @mouseout="mouseout" @click="click"
              ></Grid>
            </div>
          </div>
        </div>
      </div>
      <div class="align-between" v-show="tabIndex == 2" style="flex-wrap: wrap;" >
        <div class="data-box half">
          <h3>감성 연관어</h3>
          <VChart :option="sentimentalBubbleChartOption" autoresize style="height: 500px;" :loading="false"></VChart>
        </div>
        <div class="data-box half">
          <h3>감성어 랭킹</h3>
          <div style="padding: 10px;">
            <Grid ref="sentimentalGrid"
                  :theme="sentimentalGrid.snsTheme"
                  :options="sentimentalGrid.options"
                  :data="sentimentalGrid.data"
                  :columns="sentimentalGrid.columns"
                  @mouseover="mouseoverWebDocument"
                  @mouseout="mouseoutWebDocument"
                  @click="clickWebDocument"></Grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import api from "../../api/Sns";
import WordCloud from '../../components/sns/WordCloud'
import VChart from "vue-echarts"
import CommonUtil from "../../assets/js/commonUtil"
import eChartUtils from "../../assets/js/chartUtils"
import eChartOption from "../../assets/js/chartOption"
import GridOption from "../../assets/js/gridOption"


// import 'tui-grid/dist/tui-grid.css'
import '../../assets/css/tui-grid.css'
import 'tui-pagination/dist/tui-pagination.css';
import { Grid } from '@toast-ui/vue-grid'

export default {
  name: "Sns",
  components: {
    WordCloud,
    VChart,
    Grid
  },
  data() {
    return {
      resizeTo: 0,
      tabIndex: 0,
      chart: {},
      keyword: '관광',
      startDate: '',
      endDate: '',
      channels: ['', '10', '20', '30'],
      searchParams: {},

      selectedHotKeywordName: '',

      isLoadingChannelPieChar: false,
      isLoadingChannelDataAreaZoomChart: false,
      isLoadingHotKeywordDataAreaZoomChartOption: false,

      // eChart (채널별추이/수집추이/연관어채널별추이/감성연관어)
      channelPieCharOption: {},
      channelDataAreaZoomChartOption: {},
      hotKeywordDataAreaZoomChartOption: {},
      sentimentalBubbleChartOption: {},

      // 웹문서 리스트 그리드
      webDocumentFindInput: '',
      webDocumentGrid: {},
      webDocumentGridData: [],

      // 연관어 그리드
      hotKeywordGrid: {},
      hotKeywordGridData: [],

      // 최근 4주간 연관어 추이 그리드
      recentMonthGrid1: {},
      recentMonthGridData1: [],
      recentMonthGrid2: {},
      recentMonthGridData2: [],
      recentMonthGrid3: {},
      recentMonthGridData3: [],
      recentMonthGrid4: {},
      recentMonthGridData4: [],

      // 감성어 랭킹 그리드
      sentimentalGrid: {},
      sentimentalGridData: [],

      appendRowKey: 0,
      appendData:[],
    }
  },
  computed: {},
  watch: {
    webDocumentFindInput: function() {
      this.$refs.webDocumentGrid.invoke('filter', 'TTL_NM', [{code: 'contain', value: this.webDocumentFindInput}])
    },
  },
  created() {
    this.initView()

    // 그리드 옵션 설정
    this.webDocumentGrid = GridOption.webDocumentGridOption()
    this.hotKeywordGrid = GridOption.hotKeywordGridOption()
    this.recentMonthGrid1 = GridOption.recentMonthGridOption()
    this.recentMonthGrid2 = GridOption.recentMonthGridOption()
    this.recentMonthGrid3 = GridOption.recentMonthGridOption()
    this.recentMonthGrid4 = GridOption.recentMonthGridOption()
    this.sentimentalGrid = GridOption.sentimentalGridOption()
  },
  mounted() {
    window.addEventListener('resize', this.eventViewResize)

    const filterTags = document.getElementsByClassName('tui-grid-btn-filter')
    filterTags.forEach(filterTag => filterTag.style.display = 'none')

    this.searchSnsData()

    // 최근 4주간 연관어 추이 이벤트
    this.eventFoucsRecentMonthGrid()
  },
  destroyed() {
    window.removeEventListener('resize', this.eventViewResize)
  },
  methods: {

    // 화면 초기화 및 기초 데이터 설정
    initView() {
      const toDay = new Date()

      let searchEndBaseDate = new Date()
      searchEndBaseDate.setDate(toDay.getDate() - 1)
      let searchStartBaseDate = new Date()
      searchStartBaseDate.setDate(toDay.getDate() - 7)

      this.startDate = CommonUtil.getFormatDate(searchStartBaseDate, '-')
      this.endDate = CommonUtil.getFormatDate(searchEndBaseDate, '-')
    },

    // 화면 리사이즈 이벤트 (워드클라우드 리사이즈 호출)
    eventViewResize() {
      if (this.tabIndex === 0) {
         if (this.resizeTo) {
          clearTimeout(this.resizeTo)
        }
        this.resizeTo = setTimeout(this.$refs.refWordCloud.chartResize, 500)
      }
    },

    // 채널 전체선택 이벤트
    changeChannelAll(event) {
      if (event.target.checked) {
        this.channels = ['', '10', '20', '30']
      } else {
        this.channels = []
      }
    },

    // 채널 옵션 변경 이벤트
    changeChannel(event) {
      if (event.target.checked) {
        if (this.channels.length >= 3) {
          this.channels = ['', '10', '20', '30']
        }
      } else {
        const idx = this.channels.indexOf('')
        if (idx > -1) this.channels.splice(idx, 1)
      }
    },

    // SNS 분석 조회
    searchSnsData() {
      if (!this.keyword || this.keyword.replace( /^\s+|\s+$/g, '') === '') {
        alert('검색어를 입력해 주세요.')
        return
      }

      if (this.startDate === '' || this.endDate === '') {
        alert('수집일자를 선택해 주세요.')
        return
      }

      if (this.channels.length === 0) {
        alert('하나 이상의 채널을 선택해 주세요.')
        return
      }

      // 선택된 채널 코드값 설정
      let searchChannel = this.channels.sort().join(',')
      if (searchChannel.indexOf(',') == 0) {
        searchChannel = searchChannel.substring(1)
      }

      this.tabIndex = 0
      this.searchParams = {
        keyword: this.keyword,
        startDate: CommonUtil.replaceAll(this.startDate, '-', ''),
        endDate: CommonUtil.replaceAll(this.endDate, '-', ''),
        channels: searchChannel,
        chnlCd: searchChannel,
        recentStartDate: CommonUtil.addMonthDate(CommonUtil.replaceAll(this.endDate, '-', ''), -2, ''),
        rowCount: 70,
        useExcludeKeyword: "Y",
        useExcludeSearchKeyword: "Y",
      }

      if (this.channels.length === 1) {
        delete this.searchParams.channels
      } else {
        delete this.searchParams.chnlCd
      }

      try {
        // eChart 조회
        this.searchChannelPieChart()
        this.searchChannelDataAreaZoomChart()
        this.searchHotKeyWordDataAreaZoomChart()
        this.searchSentimentalAnalysisEChartApi()

        // 그리드 조회
        this.searchWebDocumentApi()
        this.searchHotKeywordApi()
        this.searchRecentMonthApi()
        this.searchSentimentalAnalysisGridApi()
      }catch (e) {
        console.log('데이터 처리 중 오류가 발생했습니다.')
      }
    },

    clickTab(index) {
      this.tabIndex = index

      this.$nextTick(function () {
        if (this.tabIndex === 0) {
          this.eventViewResize()
          this.$refs.webDocumentGrid.invoke('refreshLayout')
        } else if (this.tabIndex === 1) {
          this.$refs.hotKeywordGrid.invoke('refreshLayout')
          this.$refs.recentMonthGrid1.invoke('refreshLayout')
          this.$refs.recentMonthGrid2.invoke('refreshLayout')
          this.$refs.recentMonthGrid3.invoke('refreshLayout')
          this.$refs.recentMonthGrid4.invoke('refreshLayout')

        } else if (this.tabIndex === 2) {
          this.$refs.sentimentalGrid.invoke('refreshLayout')
        }
      })
    },

    /*********************************************************************************************************
     * 키워드 븐석 Tab
     **/

    // 채널별 추이 조회
    async searchChannelPieChart() {
      this.isLoadingChannelPieChar = true

      let resultData = {}

      if (this.channels.length === 1) {
        resultData = await api.searchChannelDetailCollectionSumApi(this.channels[0], this.keyword, this.searchParams)
      } else {
        resultData = await api.searchChannelCollectionSumApi(this.keyword, this.searchParams)
      }

      if (resultData) {
        this.channelPieCharOption = eChartOption.channelPieChart()
        let channelSum = eChartUtils.chartValueSum(resultData["series"])
        this.channelPieCharOption.title.text = CommonUtil.addNumberComma(channelSum) + "건"
        this.channelPieCharOption.legend.data = resultData["legend"]
        this.channelPieCharOption.toolbox.feature.magicType.option.funnel.max = channelSum
        this.channelPieCharOption.series[0].data = resultData["series"]
        this.isLoadingChannelPieChar = false
      }
    },

    // 수집추이 조회
    async searchChannelDataAreaZoomChart() {
      this.isLoadingChannelDataAreaZoomChart = true

      let resultData = {}

      if (this.channels.length === 1) {
        resultData = await api.searchChannelDetailCollectionApi(this.channels[0], this.keyword, this.searchParams)
      } else {
        resultData = await api.searchChannelCollectionApi(this.keyword, this.searchParams)
      }

      if (resultData) {
        this.channelDataAreaZoomChartOption = eChartOption.dataAreaZoom()
        this.channelDataAreaZoomChartOption.legend.data = resultData["legend"]
        this.channelDataAreaZoomChartOption.xAxis[0].data = resultData["xaxis"]
        this.channelDataAreaZoomChartOption.series = resultData["series"]
        this.isLoadingChannelDataAreaZoomChart = false
      }
    },

    // 웹문서 리스트 조회
    async searchWebDocumentApi() {
      const resultData = await api.searchWebDocumentApi(this.keyword, this.searchParams)
      if (resultData) {
        this.webDocumentGridData = resultData
        this.$refs.webDocumentGrid.invoke('resetData', this.webDocumentGridData)
      }
    },

    /*********************************************************************************************************
     * 연관어 븐석 Tab
     **/

    // 연관어 리스트 조회
    async searchHotKeywordApi() {
      const resultData = await api.searchWordCloud(this.keyword, this.searchParams)
      if (resultData) {
        this.hotKeywordGridData = resultData

        for (const data of this.hotKeywordGridData) {
          data['_children'] = []
        }
        this.$refs.hotKeywordGrid.invoke('resetData', this.hotKeywordGridData)

        if (this.hotKeywordGridData && this.hotKeywordGridData.length > 0) {
          await this.searchHotKeyWordDataAreaZoomChart(this.hotKeywordGridData[0].name)
        }
      }
    },

    // 연관어 키워드에 해당하는 연관어 조회
    async searchHotKeywordSubKeyword(keyword, subKeyword) {
      const resultData = await api.searchWordCloudSubKeyword(keyword, subKeyword, this.searchParams)
      return resultData
    },

    // 연관어 채널별 추이 (연관어 리스트 키워드 조회)
    async searchHotKeyWordDataAreaZoomChart(searchHotKeyword) {
      this.selectedHotKeywordName = searchHotKeyword
      this.isLoadingHotKeywordDataAreaZoomChartOption = true

      let resultData = {}

      if (this.channels.length === 1) {
        resultData = await api.searchChannelDetailCollectionApi(this.channels[0], this.selectedHotKeywordName, this.searchParams)
      } else {
        resultData = await api.searchChannelCollectionApi(this.selectedHotKeywordName, this.searchParams)
      }
      if (resultData) {
        this.hotKeywordDataAreaZoomChartOption = eChartOption.dataAreaZoom()
        this.hotKeywordDataAreaZoomChartOption.legend.data = resultData["legend"]
        this.hotKeywordDataAreaZoomChartOption.xAxis[0].data = resultData["xaxis"]
        this.hotKeywordDataAreaZoomChartOption.series = resultData["series"]
        this.isLoadingHotKeywordDataAreaZoomChartOption = false
      }
    },

    // 최근 4주간 연관어 추이 조회
    async searchRecentMonthApi() {
      const resultData = await api.searchRecentMonthApi(this.keyword, this.searchParams)
      if (resultData) {

        let count = 0
        for (const data of resultData) {
          if (data['SORT_ORD'] == 1) {
            count++
          }

          if (count == 1) {
            this.recentMonthGridData1.push(data)
          } else if (count == 2) {
            this.recentMonthGridData2.push(data)
          } else if (count == 3) {
            this.recentMonthGridData3.push(data)
          } else if (count == 4) {
            this.recentMonthGridData4.push(data)
          }
        }

        if (this.recentMonthGridData1) {
          this.$refs.recentMonthGrid1Date.innerHTML = this.sliceDateFormat(this.recentMonthGridData1[0]['BASE_YMD'])
        }
        if (this.recentMonthGridData2) {
          this.$refs.recentMonthGrid2Date.innerHTML = this.sliceDateFormat(this.recentMonthGridData2[0]['BASE_YMD'])
        }
        if (this.recentMonthGridData3) {
          this.$refs.recentMonthGrid3Date.innerHTML = this.sliceDateFormat(this.recentMonthGridData3[0]['BASE_YMD'])
        }
        if (this.recentMonthGridData4) {
          this.$refs.recentMonthGrid4Date.innerHTML = this.sliceDateFormat(this.recentMonthGridData4[0]['BASE_YMD'])
        }

        this.$refs.recentMonthGrid1.invoke('resetData', this.recentMonthGridData1)
        this.$refs.recentMonthGrid2.invoke('resetData', this.recentMonthGridData2)
        this.$refs.recentMonthGrid3.invoke('resetData', this.recentMonthGridData3)
        this.$refs.recentMonthGrid4.invoke('resetData', this.recentMonthGridData4)

      }
    },

    sliceDateFormat(str){
      return str.slice(0,4) + "." + str.slice(4,6) + "." + str.slice(6,8) + str.slice(8,15) + "." + str.slice(15,17) + "." + str.slice(17,19)
    },

    /*********************************************************************************************************
     * 감성 븐석 Tab
     **/

    // 감성 연관어 차트 조회
    async searchSentimentalAnalysisEChartApi() {
      const resultData = await api.searchSentimentalAnalysisEChartApi(this.keyword, this.searchParams)
      if (resultData) {
        const pColor = {normal : {color : "#bddaf5"}}
        const nColor = {normal : {color : "#fbd1ad"}}
        const cLabel = {color : "#1e1e1e", fontWeight : 'bold'}
        const maxSymbolSize = 155

        let chartSeriesData = resultData["series"]

        if (chartSeriesData && chartSeriesData.length > 0){
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
      }
    },

    // 감성 연관어 그리드 조회
    async searchSentimentalAnalysisGridApi() {
      const resultData = await api.searchSentimentalAnalysisGridApi(this.keyword, this.searchParams)
      if (resultData) {
        this.sentimentalGridData = resultData
        this.$refs.sentimentalGrid.invoke('resetData', this.sentimentalGridData)
      }
    },

    /*********************************************************************************************************
     * 그리드 이벤트
     **/

    // 웹문서 리스트 마우스 이벤트
    mouseoverWebDocument(ev) {
      if (ev.columnName === 'LINK_NM') {
        ev.instance.el.style = 'cursor: pointer'
      }
    },

    // 웹문서 리스트 마우스 이벤트
    mouseoutWebDocument(ev) {
      if (ev.columnName === 'LINK_NM') {
        ev.instance.el.style = 'cursor: default'
      }
    },

    // 웹문서 리스트 클릭 이벤트
    clickWebDocument(ev) {
      if (ev.columnName === 'LINK_NM') {
        window.open(this.webDocumentGridData[ev.rowKey]['LINK_NM'], '_blank')
      }
    },

    collapseHotKeywordGrid(ev) {
    },

    expandHotKeywordGrid(ev) {
      const { rowKey } = ev
      const rowData = this.$refs.hotKeywordGrid.invoke('getRow', rowKey)
      const descendantRows = this.$refs.hotKeywordGrid.invoke('getDescendantRows', rowKey)

      if (!descendantRows.length) {

        for (let idx = 0; idx < 5; idx++) {
          this.$refs.hotKeywordGrid.invoke('appendRow', {name: '', value: ''}, {parentRowKey: rowKey})
        }

        const resultData = this.searchHotKeywordSubKeyword(this.keyword, rowData.name)
        resultData.then((data) => {
          const descendantRows = this.$refs.hotKeywordGrid.invoke('getDescendantRows', rowKey)
          if (descendantRows) {
            for (let idx = 0; idx < descendantRows.length; idx++) {
              this.$refs.hotKeywordGrid.invoke('setValue', descendantRows[idx]['rowKey'], 'name', data[idx]['name'])
              this.$refs.hotKeywordGrid.invoke('setValue', descendantRows[idx]['rowKey'], 'value', data[idx]['value'])
            }
          }

        })
      }
    },

    // 연관어 검색어 그리드 클릭 이벤트
    clickHotKeywordGrid(ev) {
      const rowData = this.$refs.hotKeywordGrid.invoke('getRow', ev.rowKey)
      if (rowData) {
        this.searchHotKeyWordDataAreaZoomChart(rowData.name)
      }
    },

    eventFoucsRecentMonthGrid() {
      $('.recentMonth .tui-grid-table tbody').on('mouseover', 'tr', function (e) {
        const $this = $(this)
        $this.addClass("tui-grid-row-hover");

        $('.recentMonth .tui-grid-table tbody tr').each(function(idx, itm){
          const $itm = $(itm);
          if($itm.children("td:eq(1)").text() === $this.children("td:eq(1)").text()){
            $itm.addClass("tui-grid-row-hover");
          }
        });

        e.stopPropagation();
      }).on("mouseout", "tr", function(e){
        $('.recentMonth .tui-grid-table tbody tr').removeClass("tui-grid-row-hover");
      })
    },

    mouseover(ev) {
    },

    mouseout(ev) {
    },

    click(ev) {
    },
  },
}
</script>

<style scoped>

.tui-grid-btn-filter {
  display: none !important;
}

</style>

