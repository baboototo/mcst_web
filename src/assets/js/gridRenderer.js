
class SentimentalImageRenderer {
  constructor(props) {
    this.el = document.createElement('img')
    this.render(props)
  }

  getElement() {
    return this.el
  }

  render(props) {
    if (props.value === '부정') {
      this.el.src = String('https://stat.mcst.go.kr/mcst/sns/images/grid/btn_neg.png')
    } else {
      this.el.src = String('https://stat.mcst.go.kr/mcst/sns/images/grid/btn_pos.png')
    }
  }
}

class HotKeywordImageRenderer {
  constructor(props) {
    this.el = document.createElement('img')
    this.render(props)
  }

  getElement() {
    return this.el
  }

  render(props) {
    this.el.src = String('https://stat.mcst.go.kr/mcst/sns/images/grid/btn_neg.png')
  }
}

export {SentimentalImageRenderer, HotKeywordImageRenderer}
