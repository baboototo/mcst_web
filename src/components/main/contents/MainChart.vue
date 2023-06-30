<template>
  <swiper class="swiper" style="width: 100%; height: 100%;" :options="swiperOption">
    <swiper-slide>
      <div class="">
      <h2 class="right-title">주요지표 그래프</h2>
      <div class="graph-box01">
        <div class="graph-title-h1">
          <h3>소비자물가지수</h3>
        </div>
        <div class="graph-wrap align-around" style="width:100%;height:240px;">
          <div class="graph-obj">
            <div class="graph-title-h2">
              <p>국내여행 참가 횟수</p>
              <span>(단위 : 만회)</span>
            </div>
            <div class="graph-view">
              <img src="../../../assets/img/sample_graphbox01.png" alt="">
            </div>
          </div>
          <div class="graph-obj">
            <div class="graph-title-h2">
              <p>국내여행 총비용</p>
              <span>(단위 : 억원)</span>
            </div>
            <div class="graph-view">
              <img src="../../../assets/img/sample_graphbox02.png" alt="">
            </div>
          </div>
          <div class="graph-obj">
            <div class="graph-title-h2">
              <p>국내여행 이동총량</p>
              <span>(단위 : 만일)</span>
            </div>
            <div class="graph-view">
              <img src="../../../assets/img/sample_graphbox03.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="graph-box02 align-between top">
        <div class="graph-title-h1">
          <h3>소비자동향지수</h3>
          <span>현황 [ 종합 CSI ]</span>
        </div>
        <div class="graph-wrap">
          <div class="graph-view">
            <img src="../../../assets/img/sample_graphbox04.png" alt="">
          </div>
        </div>
      </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="">
        <h2 class="right-title">주요지표 그래프</h2>
        <div class="graph-box01">
          <div class="graph-title-h1">
            <h3>소비자물가지수</h3>
          </div>
          <div class="graph-wrap align-around" style="width:100%;height:240px;">
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 참가 횟수</p>
                <span>(단위 : 만회)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox01.png" alt="">
              </div>
            </div>
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 총비용</p>
                <span>(단위 : 억원)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox02.png" alt="">
              </div>
            </div>
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 이동총량</p>
                <span>(단위 : 만일)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox03.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="graph-box02 align-between top">
          <div class="graph-title-h1">
            <h3>소비자동향지수</h3>
            <span>현황 [ 종합 CSI ]</span>
          </div>
          <div class="graph-wrap">
            <div class="graph-view">
              <img src="../../../assets/img/sample_graphbox04.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="">
        <h2 class="right-title">주요지표 그래프</h2>
        <div class="graph-box01">
          <div class="graph-title-h1">
            <h3>소비자물가지수</h3>
          </div>
          <div class="graph-wrap align-around" style="width:100%;height:240px;">
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 참가 횟수</p>
                <span>(단위 : 만회)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox01.png" alt="">
              </div>
            </div>
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 총비용</p>
                <span>(단위 : 억원)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox02.png" alt="">
              </div>
            </div>
            <div class="graph-obj">
              <div class="graph-title-h2">
                <p>국내여행 이동총량</p>
                <span>(단위 : 만일)</span>
              </div>
              <div class="graph-view">
                <img src="../../../assets/img/sample_graphbox03.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="graph-box02 align-between top">
          <div class="graph-title-h1">
            <h3>소비자동향지수</h3>
            <span>현황 [ 종합 CSI ]</span>
          </div>
          <div class="graph-wrap">
            <div class="graph-view">
              <img src="../../../assets/img/sample_graphbox04.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="main-chart-swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "MainChart",
  components: {
    swiper,
    swiperSlide,
    VChart
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.main-chart-swiper-pagination',
          clickable: true
        }
      },
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '소비자동향지수',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 0
            },
            label: {
              formatter: '{b}\n\n{c} 개'
            },
            data: [
              { value: 1359, name: '스포츠 수' },
              { value: 608, name: '문화서비스 수' },
            ]
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
.main-chart-swiper-pagination {
  text-align: center;
}
.chart {
  width: 50vw;
  height: 450px;
}
</style>

