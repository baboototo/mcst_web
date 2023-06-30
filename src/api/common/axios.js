import axios from 'axios'
import { setInterceptors } from './axiosInterceptors'
import store from '../../store/index'

function createAxiosService () {
	const axiosService = axios.create({
		baseURL: process.env.VUE_APP_SERVER + '/api/'
	})
	return setInterceptors(axiosService, store)
}

const axiosService = createAxiosService()

export default axiosService
