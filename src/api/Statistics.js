import axiosService from './common/axios'

function statisticsList (paramData) {
	return axiosService.get('subject/statisticsList', { params: paramData })
}

function stblInfoList (paramData) {
	return axiosService.get('subject/stblInfoList', { params: paramData })
}

function statisticsKeywordList (paramData) {
	return axiosService.get('subject/statisticsKeywordList', { params: paramData })
}

function statisticsInitialList (paramData) {
	return axiosService.get('subject/statisticsInitialList', { params: paramData })
}

function statisticsDetailSearchList (paramData) {
	return axiosService.get('subject/statisticsDetailSearchList', { params: paramData })
}

function selectMdssUpAnlClsId (paramData) {
	return axiosService.get('mdss/selectMdssUpAnlClsId', { params: paramData })
}

function selectMdssNavi (paramData) {
	return axiosService.get('mdss/selectMdssNavi', { params: paramData })
}

function selectMdssItmList (paramData) {
	return axiosService.get('mdss/selectMdssItmList', { params: paramData })
}

function selectMdssFileList (paramData) {
	return axiosService.get('mdss/selectMdssFileList', { params: paramData })
}

function saveRequest (paramData) {
	return axiosService.get('mdss/saveRequest', { params: paramData })
}

function savePostRequest (paramData) {
	return axiosService.post('mdss/savePostRequest', paramData)
}

function insertExcelDownLog (paramData) {
	return axiosService.get('insertExcelDownLog', { params: paramData })
}

function metaInfoList (paramData) {
	return axiosService.get('subject/metaInfoList', { params: paramData })
}

function selectItmData (paramData) {
	return axiosService.get('mdss/selectItmData', { params: paramData })
}

function selectMdssConSetCodeList (paramData) {
	return axiosService.get('mdss/selectMdssConSetCodeList', { params: paramData })
}

function selectMcstRqstMst (paramData) {
	return axiosService.post('mdss/selectMcstRqstMst', paramData)
}

function selectRequestsDetails (paramData) {
	return axiosService.get('mdss/selectRequestsDetails', { params: paramData })
}

function saveMdssZip (paramData) {
	return axiosService.get('mdss/saveMdssZip', { params: paramData })
}

function selectBasicInfo (paramData) {
	return axiosService.get('subject/selectBasicInfo', { params: paramData })
}

function insertAccessLog (paramData) {
	return axiosService.get('insertAccessLog', { params: paramData })
}

export { statisticsList, stblInfoList, statisticsKeywordList, statisticsInitialList, statisticsDetailSearchList, selectMdssUpAnlClsId, selectMdssNavi, selectMdssItmList, selectMdssFileList, saveRequest, insertExcelDownLog, metaInfoList, selectItmData, selectMdssConSetCodeList, selectMcstRqstMst, selectRequestsDetails, saveMdssZip, selectBasicInfo, insertAccessLog,savePostRequest } 