import commonUtil from "./commonUtil";

const chartOption = {

  channelPieChart: function() {
    return {
      title: {
        left: '49%',
        top: '50%',
        textAlign: 'center',
        textVerticalAlign: 'middle',
        textStyle: {
          color: '#000000',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}<br/>{c}건 ({d}%)",
        textStyle: {
          align: 'center',
          fontSize: 13
        }
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        y: 450
      },
      toolbox: {
        show: true,
        padding: [10, 40, 0, 0],
        itemSize: 15,
        itemGap: 10,
        feature: {
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            title: {
              pie: '원형',
              funnel: '깔대기'

            },
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'center'
              }
            }
          },
          saveAsImage: {
            show: true,
            type: 'jpeg',
            title: '저장',
            name: '채널별 추이',
            lang: ['다운로드']
          }
        }
      },
      calculable: false,
      series: [
        {
          type: 'pie',
          radius: ['30%', '60%'],
          roseType: 'radius',
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: function (dataSetObj) {
                  if (dataSetObj.seriesType == 'pie') {
                    return dataSetObj.name + "\n" + commonUtil.addNumberComma(dataSetObj.data.value) + "건\n(" + dataSetObj.percent + "%)";
                  }
                  return dataSetObj.name + " - " + commonUtil.addNumberComma(dataSetObj.data.value) + "건";
                }
              },
              labelLine: {
                show: true
              }
            }
          },
          data: []
        }
      ],
      noDataLoadingOption: function () {
        return {
          text: '',
          x: 'center',
          y: 'center',
          effect: null,
          effectOption: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }
        }
      }
    }
  },

  dataAreaZoom: function() {
    return {
      tooltip : {
        trigger: 'axis',
        textStyle: {
          align: 'center',
          fontSize: 13
        }
      },
      legend: {
        orient : 'horizontal',
        x : 'center',
        y: 450
      },
      toolbox: {
        show : true,
        padding:[10, 40, 0, 0],
        itemSize: 15,
        itemGap: 10,
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        feature: {
          magicType: {
            show: true,
            type: ['line', 'bar', 'stack', 'tiled'],
            title: {
              line: '라인',
              bar: '바',
              stack: '스택',
              tiled: '타일드'
            }
          },
          dataZoom : {
            show: true,
            title: {
              dataZoom: '차트 확대',
              dataZoomReset: '차트 확대 되돌리기'
            }
          },
          saveAsImage : {
            show: true,
            type: 'jpeg',
            title: '저장',
            name: '수집 추이',
            lang: ['다운로드']
          }
        }
      },
      calculable : true,
      dataZoom : {
        show : true,
        realtime : true,
        y: 400,
        start : 40,
        end : 100
      },
      grid : {
        x: 40,
        y: 60,
        x2: 40,
        y2: 130
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ]
    }
  },

  bubbleChart: function() {
    return {
      backgroundColor: '#fff',
      tooltip: {},
      legend: [{
        top : "bottom",
        data: ["긍정", "부정"]
      }],
      animationDurationUpdate: function(idx) {
        return idx * 100000;
      },
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 190,
          edgeLength: 100
        },
        roam: false,
        label: {
          normal: {
            show: true
          }
        },
        itemStyle : {
          borderColor: '#fff',
          borderWidth : 1
        },
        categories: [{
          name: "긍정",
          itemStyle : {
            color : "#bddaf5"
          }
        }, {
          name: "부정",
          itemStyle : {
            color : "#fbd1ad"
          }
        }]
      }],
    }
  },

}


export default chartOption
