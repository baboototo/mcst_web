import axiosService from './common/axios'

function searchMainStatBoardData (paramData) {
  return axiosService.get('main/statBoard', { params: paramData })
}

export { searchMainStatBoardData }
