import axiosService from './common/axios'

function searchMenuStatItems (paramData) {
  return axiosService.get('menu/stat/items', { params: paramData })
}

function searchIndexStatCode (paramData) {
  return axiosService.get('index/stat/indexStatCode', { params: paramData })
}

function searchEbarometersList (paramData) {
  return axiosService.get('index/stat/eBarometersList', { params: paramData })
}

function searchEbarometersDtl (paramData) {
  return axiosService.get('index/stat/eBarometersDtl', { params: paramData })
}

function searchMetaInfoList (paramData) {
  return axiosService.get('subject/metaInfoList', { params: paramData })
}


export { searchMenuStatItems, searchIndexStatCode, searchMetaInfoList, searchEbarometersList, searchEbarometersDtl }
