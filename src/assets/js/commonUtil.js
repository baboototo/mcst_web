const commonUtil = {

  addNumberComma: function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },

  addDateFormat: function(dateStr, pattern) {
    return dateStr.replace(/(\d{4})(\d{2})(\d{2})/g, '$1'+ pattern +'$2'+ pattern +'$3')
  },

  replaceAll: function(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr)
  },

  getFormatDate: function(date, pattern) {
    if (!pattern) {
      pattern = ''
    }

    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + pattern + month + pattern + day
  },

  addMonthDate: function(str, addMonth, pattern) {
    const dateStr = this.replaceAll(str, pattern, '')

    const date = new Date(dateStr.substring(0, 4)
      , dateStr.substring(4, 6)
      , dateStr.substring(6, 8))

    date.setMonth(date.getMonth() + (addMonth))
    return this.getFormatDate(date, pattern)
  }
}



export default commonUtil
