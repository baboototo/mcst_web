const chartUtils = {

  chartValueSum: function(chartDatta) {
    let valueSum = 0;
    chartDatta.forEach(data => valueSum += data['value'])

    return valueSum;
  },




}


export default chartUtils
