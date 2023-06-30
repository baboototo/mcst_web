import axiosService from './common/axios'

function searchEbookList (paramData) {
	return axiosService.get('ebook/ebookBoardList', { params: paramData })
}
function selectCodeList () {
	return axiosService.get('ebook/selectCodeList')
}
function selectEbookClass (paramData) {
	return axiosService.get('ebook/selectEbookClass', { params: paramData })
}

export { searchEbookList, selectCodeList, selectEbookClass }