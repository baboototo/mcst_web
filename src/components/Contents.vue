<template>
  <div id="wrapper"  ref="">
    <Header :isShowFocusMenuType="isShowFocusMenuType"></Header>
    <main id="container" ref="wrapper">
      <section class="content-wrap">
        <SubMenu></SubMenu>
        <article class="sub-content">
          <router-view></router-view>
        </article>
      </section>
      <Footer></Footer>
    </main>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Contents',
  components: {
    Header: () => import('../components/Header'),
    SubMenu: () => import('./menu/SubMenu'),
    Footer: () =>  import('./Footer')
  },
  data () {
    return {
      isShowFocusMenuType: false,
      isIEBrowser: false,
    }
  },
  mounted() {
    if (this.isIEBrowser) {
      this.eventSmoothScroll(document,200,12)
    }
    this.eventViewScroll()
  },

  created() {
    const agent = window.navigator.userAgent.toLowerCase()
    const appName = window.navigator.appName.toLowerCase()

    if ((appName === 'netscape' && agent.indexOf('trident')!== -1) || agent.indexOf('msie') !== -1) {
      this.isIEBrowser = true
    } else {
      this.isIEBrowser = false
    }

    window.addEventListener('scroll', this.eventViewScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.eventViewScroll)
  },

  methods: {
    eventSmoothScroll(target, speed, smooth) {
      if (target === document) {
        target = (document.scrollingElement
                  || document.documentElement
                  || document.body.parentNode
                  || document.body) // cross browser support for document scrolling
      }

      let moving = false
      let pos = target.scrollTop
      let frame = target === document.body && document.documentElement ? document.documentElement : target // safari is the new IE
      target.addEventListener('mousewheel', scrolled, { passive: false })
      target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

      function scrolled(e) {
        e.preventDefault();

        const delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

        // if (!moving) update()
        update()
      }

      function normalizeWheelDelta(e){
        if(e.detail){
          if(e.wheelDelta)
            return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
          else
            return -e.detail/3 // Firefox
        }else
          return e.wheelDelta/120 // IE,Safari,Chrome
      }

      function update() {
        moving = true

        const delta = (pos - target.scrollTop) / smooth
        target.scrollTop += delta

        // if (Math.abs(delta) > 0.5) {
        //   requestFrame(update)
        // } else {
        //   moving = false
        // }
      }

      const requestFrame = function() { // requestAnimationFrame cross browser
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(func) {
            window.setTimeout(func, 1000 / 50);
          }
        );
      }()
    },

    eventViewScroll() {
      if (this.isIEBrowser) {
        const scrollTop = $(window).scrollTop();
        const subTitle = $("#container .content-wrap .sub-title");
        const subGnb = $("#subGnb");
        const subCnt = $(".sub-content");
        if(scrollTop >= 179){
          if (subTitle.css('position') !== 'fixed') {
            subTitle.css({position:"fixed"});
            subGnb.css({position:"fixed",top:"98px"});
            subCnt.css({marginTop:"321px"});
          }
        }else{
          subGnb.css({position:"absolute",top:"278px"});
          subTitle.css({position:"static"});
          subCnt.css({marginTop:"0px"});
        }
      }
      if (window.pageYOffset > 10 && window.innerWidth <= 1024) {
        this.isShowFocusMenuType = true
      } else {
        this.isShowFocusMenuType = false
      }
    },
  }
}
</script>

<style scoped>
@import '../assets/css/style.css';
</style>
