import axiosService from './common/axios'

function selectRetrieve (paramData) {
	return axiosService.get('search/selectRetrieve', { params: paramData })
}

function selectBoardCnt (paramData) {
	return axiosService.get('search/selectBoardCnt', { params: paramData })
}

function insertSrchLang (paramData) {
	return axiosService.get('search/insertSrchLang', { params: paramData })
}

function selectSrchLang (paramData) {
	return axiosService.get('search/selectSrchLang', { params: paramData })
}

export { selectRetrieve, selectBoardCnt, insertSrchLang, selectSrchLang }