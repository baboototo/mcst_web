import commonUtil from "./commonUtil";
import { SentimentalImageRenderer, HotKeywordImageRenderer } from './gridRenderer'

const gridOption = {
  snsTheme: function() {
    return {
      name: 'default',
      value: {
        selection: {
          background: '#4daaf9',
          border: '#004082'
        },
        scrollbar: {
          background: '#f5f5f5',
          thumb: '#d9d9d9',
          active: '#c1c1c1'
        },
        row: {
          even: {
            background: '#f4f4f4'
          },
          hover: {
            background: '#ccc'
          }
        },
        cell: {
          normal: {
            background: '#fbfbfb',
            border: '#e0e0e0',
            showVerticalBorder: true
          },
          header: {
            background: '#eee',
            border: '#ccc',
            showVerticalBorder: true
          },
          rowHeader: {
            border: '#ccc',
            showVerticalBorder: true
          },
          editable: {
            background: '#fbfbfb'
          },
          selectedHeader: {
            background: '#d8d8d8'
          },
          focused: {
            border: '#418ed4'
          },
          disabled: {
            text: '#b0b0b0'
          }
        }
      }
    }
  },

  webDocumentGridOption: function() {
    return {
      options: {
        header: {
          height: 50
        },
        selectionUnit: 'row',
        scrollX: true,
        scrollY: false,
        minBodyWidth: 700,
        minBodyHeight: 400,
        pageOptions: {
          useClient: true,
          perPage: 10
        },
      },
      showDummyRows: true,
      data:[],
      columns: [
        {
          header: '채널1',
          name: 'CHNL_LCLS_NM',
          align: 'center',
          sortable: true,
          width: 100
        },
        {
          header: '채널2',
          name: 'CHNL_MCLS_NM',
          align: 'center',
          sortable: true,
          width: 100
        },
        {
          header: '채널3',
          name: 'CHNL_SCLS_NM',
          align: 'center',
          sortable: true,
          width: 100
        },
        {
          header: '제목',
          name: 'TTL_NM',
          align: 'left',
          sortable: true,
          filter: 'text'
        },
        {
          header: 'URL',
          name: 'LINK_NM',
          align: 'center',
          sortable: true,
          width: 200
        },
        {
          header: '날짜',
          name: 'BASE_DATE',
          align: 'center',
          sortable: true,
          width: 100,
          formatter: function (row) {
            return commonUtil.addDateFormat(row.value, "-");
          }
        },
      ],
      snsTheme: this.snsTheme()
    }
  },

  hotKeywordGridOption: function() {
    return {
      options: {
        header: {
          height: 50
        },
        selectionUnit: 'row',
        scrollX: false,
        scrollY: true,
        bodyHeight: 420,
        treeColumnOptions: {
          name: 'name',
          // useCascadingCheckbox: true,
          useIcon: false
        },
      },
      data:[],
      columns: [
        {
          header: '키워드',
          name: 'name',
          align: 'center',
          sortable: true,
        },
        {
          header: '문서수',
          name: 'value',
          align: 'center',
          sortable: true,
          formatter: function (row) {
            return commonUtil.addNumberComma(row.value) + ' 건';
          }
        },
      ],
      snsTheme: this.snsTheme()
    }
  },

  recentMonthGridOption: function() {
    return {
      options: {
        header: {
          height: 50
        },
        selectionUnit: 'row',
        scrollX: false,
        scrollY: true,
        bodyHeight: 420,
      },
      showDummyRows: true,
      data:[],
      columns: [
        {
          header: '순위',
          name: 'SORT_ORD',
          align: 'center',
          sortable: true,
        },
        {
          header: '연관어',
          name: 'WRD_NM',
          align: 'center',
          sortable: true,
        },
        {
          header: '건수',
          name: 'DOC_CNT',
          align: 'center',
          sortable: true,
        },
      ],
      snsTheme: this.snsTheme()
    }
  },

  sentimentalGridOption: function() {
    return {
      options: {
        header: {
          height: 50
        },
        rowHeaders: ['rowNum'],
        selectionUnit: 'cell',
        scrollX: false,
        scrollY: false,
      },
      showDummyRows: true,
      data:[],
      columns: [
        {
          header: '분류',
          name: 'GBN',
          align: 'center',
          width: 120,
          renderer: {
            type: SentimentalImageRenderer,
            options: {}
          },
        },
        {
          header: '키워드',
          name: 'WRD_NM',
          align: 'center',
          sortable: true,
        },
        {
          header: '건수',
          name: 'DOC_CNT',
          align: 'center',
          sortable: true,
        },
      ],
      snsTheme: this.snsTheme()
    }
  },

}


export default gridOption
