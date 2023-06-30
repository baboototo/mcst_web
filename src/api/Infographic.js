import axiosService from './common/axios'

function searchBoardList (paramData) {
  return axiosService.get('notice/boards/commBoardList', { params: paramData })
}

export { searchBoardList }
