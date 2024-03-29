export function setInterceptors (axiosService, store) {
	axiosService.interceptors.request.use(function (config) {
		// 요청을 보내기 전에 어떤 처리를 할 수 있다.
		// console.log('axiosService.interceptors.request.use')
    store.commit('showLoadingBar')
		return config
	}, function (error) {
		// 요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
		// console.log('axiosService.interceptors.request.use error')
    console.log('데이터 처리 중 오류가 발생했습니다.')
		return Promise.reject(error)
	})

	axiosService.interceptors.response.use(function (response) {
		// 서버에 요청을 보내고 나서 응답을 받기 전에 어떤 처리를 할 수 있다
		// console.log('axiosService.interceptors.response.use')
		// console.log(response)
    store.commit('hiddenLoadingBar')
		return response.data
	}, function (error) {
    store.commit('hiddenLoadingBar')
		// 응답이 에러인 경우에 미리 전처리할 수 있다.
		// console.log('axiosService.interceptors.response.use error')
    console.log('데이터 처리 중 오류가 발생했습니다.')
		return Promise.reject(error)
	})
	return axiosService
}
