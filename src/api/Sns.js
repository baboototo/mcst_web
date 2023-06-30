import axiosService from './common/axiosSNS'
import {reject} from "eslint-plugin-promise/rules/lib/promise-statics";

const api = {
  searchWordCloud: function (keyword, paramData) {
    return axiosService.get('wordCloud/v1.0/words/' + keyword, { params: paramData })
  },

  searchWordCloudSubKeyword: function (keyword, subKeyword, paramData) {
    return axiosService.get('wordCloud/v1.0/words/' + keyword + '/' + subKeyword, { params: paramData })
  },

  searchKeywordByWordChild: function (keyword, paramData) {
    return axiosService.get('wordCloud/v1.0/words/' + keyword + '/child', { params: paramData })
  },

  // 채널별 추이 조회 (채널 단건 조회)
  searchChannelDetailCollectionSumApi: function (channelCd, keyword, paramData) {
    return axiosService.get('pie/v1.0/channels/' + channelCd + '/' + keyword, {params: paramData})
  },

  // 채널별 추이 조회
  searchChannelCollectionSumApi: function (keyword, paramData) {
    return axiosService.get('pie/v1.0/channels/' + keyword, {params: paramData})
  },

  // 수집 추이 조회 (채널 단건 조회)
  searchChannelDetailCollectionApi: function (channelCd, keyword, paramData) {
    return axiosService.get('dataZoom/v1.0/channels/'+ channelCd +'/collection/days/' + keyword, {params: paramData})
  },

  // 수집 추이 조회
  searchChannelCollectionApi: function (keyword, paramData) {
    return axiosService.get('dataZoom/v1.0/channels/collection/days/' + keyword, {params: paramData})
  },

  // 감성분석 차트 조회
  searchSentimentalAnalysisEChartApi: function (keyword, paramData) {
    return axiosService.get('sentimental/v1.0/echart/' + keyword, {params: paramData})
  },

  // 감성분석 그리드 조회
  searchSentimentalAnalysisGridApi: function (keyword, paramData) {
    return axiosService.get('/sentimental/v1.0/grid/' + keyword, {params: paramData})
  },

  // 웹문서 조회
  searchWebDocumentApi: function (keyword, paramData) {
    return axiosService.get('data/v1.0/original/documents/' + keyword, {params: paramData})
  },

  // 연관어 조회
  searchHotKeywordApi: function (keyword, paramData) {
    return axiosService.get('data/v1.0/original/documents/' + keyword, {params: paramData})
  },

  // 최근 4주간 연관어 추이
  searchRecentMonthApi: function (keyword, paramData) {
    return axiosService.get('data/v1.0/month/documents/' + keyword, {params: paramData})
  },
}

export default api
