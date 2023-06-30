import axiosService from './common/axios'

function searchBoardList (paramData) {
	return axiosService.get('notice/boards/commBoardList', { params: paramData })	
}
function boardCnt (paramData) {
	return axiosService.get('notice/boards/commBoardTotalCnt', { params: paramData })
}
function updateBoardHits (paramData) {
	return axiosService.get('notice/boards/commBoardHits', { params: paramData })
}
function searchBoardDetail (paramData) {
	return axiosService.get('notice/boards/commDetailInfo', { params: paramData })
}
function searchBoardFileList (paramData) {
	return axiosService.get('notice/boards/selectNoticeboardAttachFileList', { params: paramData })
}
function selectCodeList() {
	return axiosService.get('notice/boards/selectIndexReportCodeList')
}
function searchRschBoardList (paramData) {
	return axiosService.get('notice/boards/selectRschBoardList', { params: paramData })
}
function srvyListTotalCnt (paramData) {
	return axiosService.get('notice/boards/selectSrvyListTotalCnt', { params: paramData })
}
function searchSrvyDetail (paramData) {
	return axiosService.get('notice/boards/selectSrvyListInfo', { params: paramData })
}
function selectPopBoardList (paramData) {
	return axiosService.get('notice/boards/selectPopBoardList', { params: paramData })
}
export { searchBoardList, boardCnt, updateBoardHits, searchBoardDetail, searchBoardFileList, selectCodeList, searchRschBoardList, srvyListTotalCnt, searchSrvyDetail, selectPopBoardList }