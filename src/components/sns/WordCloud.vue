<template>
  <div class="data-box full">
    <h3>워드클라우드</h3>
    <div id="wordCloud" style="width: 100vm; height: 600px;"></div>
    <div class="sns-option-wrap">
      <label for="searchCount" class="ir">갯수</label>
      <select v-model="searchCount" id="searchCount">
        <option value="70">70</option>
        <option value="100">100</option>
      </select>
      <label for="wordCloudIdx" class="ir">모양</label>
      <select v-model="wordCloudIdx" id="wordCloudIdx">
        <option value="1">기본</option>
        <option value="2">옷</option>
        <option value="3">그래프</option>
        <option value="4">나무</option>
        <option value="5">생각</option>
        <option value="6">좋아요</option>
        <option value="7">통계</option>
        <option value="8">퍼즐</option>
      </select>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud';
import api from '../../api/Sns'

export default {
  name: "WordCloud",
  props: {
    searchParams: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      searchCount: 70,
      wordCloudIdx: '1',
      maskImage: new Image(),
      wordCloudData: [],
      option: {
        series: [ {
          type: 'wordCloud',
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          sizeRange: [20, 130],
          rotationRange: [0, 0],
          rotationStep: 20,
          gridSize: 0,
          shape: 'circle',
          maskImage: this.maskImage,
          drawOutOfBound: false,
          layoutAnimation: true,
          data: [],
        } ]
      }
    }
  },

  watch: {
    searchParams: function() {
      this.searchWordCloud()
    },

    searchCount: function() {
      this.searchWordCloud()
    },

    wordCloudIdx: function(newWordCloudIdx) {
      this.maskImage.src = require('../../assets/img/wordcloud/'+ newWordCloudIdx +'.png')
    },
  },

  created() {},

  mounted() {
    this.$nextTick(function () {
      this.chart = echarts.init(document.getElementById('wordCloud'));
    })
  },

  methods: {
    chartResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    async searchWordCloud() {
      this.searchParams['rowCount'] = this.searchCount
      const searchData = await api.searchWordCloud(this.searchParams.keyword, this.searchParams)

      if (searchData) {
        for (const data of searchData) {
          data['textStyle'] = {
            color: 'rgb(' + [Math.round(Math.random() * 160),Math.round(Math.random() * 160),Math.round(Math.random() * 160)].join(',') + ')'
          }
          data['emphasis'] = {
            textStyle: {color: 'red'}
          }
        }
        this.wordCloudData = searchData
        this.maskImage.src = require('../../assets/img/wordcloud/'+ this.wordCloudIdx +'.png')
        this.maskImage.onload = this.eventLoadWordCloudImage
      }
    },

    eventLoadWordCloudImage() {
      this.option.series[0].maskImage = this.maskImage
      this.option.series[0].data = this.wordCloudData
      this.option.series[0].gridSize = 10
      this.chart.setOption(this.option)
    }
  },
}
</script>

<style scoped>

</style>
