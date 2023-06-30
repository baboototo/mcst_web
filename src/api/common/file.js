import axios from 'axios'

/**
 * 파일 다운로드
 * @param paramData
 */
function download (paramData) {
  const axiosService = axios.create({
    baseURL: process.env.VUE_APP_SERVER + '/api/'
  })

  axiosService.get('file/download', {
    headers: {responseType: 'arraybuffer'},
    responseType: 'blob',
    params: paramData
  }).then( res => {
    let blob = new Blob([res.data], { type: res.headers['content-type'] })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    const contentDisposition = res.headers['content-disposition']
    let fileName = ''

    if (contentDisposition) {
      const [ fileNameMatch ] = contentDisposition.split(';').filter(str => str.includes('filename'))
      if (fileNameMatch)
        [ , fileName ] = fileNameMatch.replace(/"/g, '').split('=');
    }
    fileName = decodeURI(fileName)

    if (window.navigator.msSaveOrOpenBlob) { // IE 10+
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else { // not IE
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    }
  })
  .catch( error => {
    alert('다운로드 중 오류가 발생했습니다.')
  })
}

/**
 * 전체경로에서 파일명만 추출 후 반환
 * @param fullFilePath
 * @param fileSeparator
 * @returns {*|string}
 */
function findFileName(fullFilePath, fileSeparator) {
  let separator = '/'

  if (fileSeparator) {
    separator = fileSeparator
  }

  const filePathList = fullFilePath.split(separator);
  const filePathLength = filePathList.length
  let fileName = ''

  if (filePathLength > 1) {
    fileName = filePathList[filePathLength - 1]
  } else {
    return this.findFileName(fullFilePath, '\\')
  }

  return fileName;
}

export { download, findFileName }
