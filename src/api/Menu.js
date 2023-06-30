import axiosService from './common/axios'

function searchMenuSubItems (paramData) {
  return axiosService.get('menu/sub/items', { params: paramData })
}

export { searchMenuSubItems }
