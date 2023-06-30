<template>
  <header id="header" @mouseleave="eventMouseOutTopMenu">
    <div class="layout">
      <h1 id="logo">
        <a href="javascript:;" @click.prevent="goMain" title="홈으로">
          <img id="logoImg" :src="logoImage" alt="문화셈터">
        </a>
      </h1>
      <nav id="gnb" class="align-between">
        <i id="focusBar" style="display: none"></i>
        <ul class="align-start">
          <li v-for="(topMenRoute, i) in routes" :key="i" @focusin="eventMouseInTopMenu($event)" @mouseenter="eventMouseInTopMenu($event)">
            <a href="javascript:;" @click="clickTopMenu(topMenRoute)">{{ topMenRoute.name }}</a>
            <ul class="depth02">
              <li v-for="(subMenuRoute, j) in topMenRoute.children" :key="j">
                <a href="javascript:;" @click="clickSubMenu(subMenuRoute)">{{ subMenuRoute.name }}</a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="header-option align-end">
          <button type="button" class="header-search-btn" @click="clickShowSearch()" title="검색하기">
            <img :src="searchImage" alt="통합검색">
          </button>
          <button type="button" class="all-menu md_open_btn" @click="clickShowSiteMap()" title="전체메뉴보기">
            <img :src="hamburgerImage" alt="전체메뉴보기">
          </button>
        </div>
      </nav>
    </div>
    <span id="gnbSlideDown"></span>
    <div class="header-search-wrap" ref="headerSearchWrap">
      <div class="main-search-wrap">
        <div class="main-search">
          <label for="findNm" class="ir">검색창</label>
          <input type="search" v-model="findNm" id="findNm" placeholder="통계자료 검색·키워드를 입력해주세요." v-on:keyup.enter="goSearch()">
          <a href="javascript:;" @click="goSearch()" title="검색하기">
            <img src="../assets/img/ico_main_search.png" alt="검색하기">
          </a>
        </div>
        <div class="popular-search-terms align-start">
          <span>인기검색어</span>
          <a href="javascript:;" @click="goSearch(data.srchLang)" v-for="(data, idx) in setKeywordDataList" :key="idx">#{{data.srchLang}}</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import EventBus from "../assets/js/eventBus";
import $ from 'jquery';


export default {
  name: 'Header',
  components: {},
  props: {
    isShowFocusMenuType: {
      type: Boolean,
      default: false
    },
    keywordDataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      logoImage: require('../assets/img/logo.png'),
      searchImage: require('../assets/img/ico_main_search4.png'),
      hamburgerImage: require('../assets/img/hamburger.png'),
      findNm: ''
    }
  },
  computed: {
    routes() {
      const topMenus = []
      for (const topMenu of this.$router.options.routes) {
        if (topMenu.meta.visible) {

          const subMenus = []
          for (const subMenu of topMenu.children) {
            if (subMenu.meta.visible) {
              subMenus.push(subMenu)
            }
          }

          topMenu.children = subMenus
          topMenus.push(topMenu)
        }
      }
      return topMenus
    },

    setKeywordDataList(){ // 인기검색어
      let data = this.keywordDataList

      if(this.$store.getters.trendKeywords != ''){
        data = this.$store.getters.trendKeywords[0].items
      }
      return data
    }
  },
  watch: {
    isShowFocusMenuType: function() {
      this.showMenuStyle(false)
    },
  },
  created() {},
  destroyed() {},
  methods: {
    eventMouseInTopMenu(event) {
      if (event.target.tagName === 'LI') {
        this.showMenuStyle(true)

        $(".depth02").stop().slideDown(500);

        $(event.target).addClass("on").siblings().removeClass("on");

        const focusBar = document.getElementById('focusBar')
        focusBar.style.display = ''

        if(window.innerWidth > 1200){
          focusBar.style.transform = 'translateX(' + (Math.floor($(event.target).position().left)+35) + 'px)'
        }else{
          focusBar.style.transform = 'translateX(' + (Math.floor($(event.target).position().left)+ 0) + 'px)'
        }
        document.getElementById('gnbSlideDown').className = 'down'
      }
    },

    eventMouseOutTopMenu(event) {
      if (event.target) {
        this.showMenuStyle(false)

        const subMenuItemUl = event.target.nextElementSibling
        if(subMenuItemUl) {
          $(subMenuItemUl).stop().slideDown(500)
        }

        $(".depth02").stop().slideUp(300);

        const focusBar = document.getElementById('focusBar')
        focusBar.style.display = 'none'

        document.getElementById('gnbSlideDown').classList.remove('down')
      }
    },

    showMenuStyle(isEventMouseIn) {
      if (this.isShowFocusMenuType) {
        this.logoImage = require('../assets/img/logo_hover.png')
        this.searchImage  = require('../assets/img/ico_main_search3.png')
        this.hamburgerImage = require('../assets/img/hamburger_hover.png')

        $('#gnb > ul > li > a').css({color:"#333333"})
        $('#header').css({backgroundColor: '#ffffff'})

      } else {
        if (isEventMouseIn) {
          this.logoImage = require('../assets/img/logo_hover.png')
          this.searchImage  = require('../assets/img/ico_main_search3.png')
          this.hamburgerImage = require('../assets/img/hamburger_hover.png')

          $('#gnb > ul > li > a').css({color:"#333333"})
          $('#header').css({backgroundColor: '#ffffff'})

        } else {
          this.logoImage = require('../assets/img/logo.png')
          this.searchImage  = require('../assets/img/ico_main_search4.png')
          this.hamburgerImage = require('../assets/img/hamburger.png')

          $('#gnb > ul > li > a').css({color:"#ffffff"})
          $('#header').css({backgroundColor: 'transparent'})
        }
      }
    },

    goMain() {
      this.$router.push({name: '메인화면'})
    },

    clickTopMenu(route) {
      this.closeSearch()

      let params = {}
      let routePath = ''

      if (route.children) {
        routePath = route.children[0].name

        if (route.children[0].meta.subMenuItemMgmNo) {
          params = {
            subItemId: route.children[0].meta.subMenuItemMgmNo
          }
        }
        this.$router.push( {name: routePath, params: params} )
      }
    },
    clickSubMenu(route) {
      this.closeSearch()

      let params = {}
      let routePath = ''

      if (route) {
        routePath = route.name

        if (route['component']){
          if (route.meta.subMenuItemMgmNo) {
            params = {
              subItemId: route.meta.subMenuItemMgmNo
            }
          }

          this.$router.push( {name: routePath, params: params} )
        } else {
          if (route.meta.linkUrl) {
            window.open(route.meta.linkUrl);
          }
        }
      }
    },

    clickShowSiteMap() {
      EventBus.$emit('showSideMenu', true)
    },

    clickShowSearch() {
      if (this.$refs.headerSearchWrap.classList.toggle('on')) {
        $(".depth02").stop().slideUp(300);
        document.getElementById('gnbSlideDown').classList.remove('down')
      }
    },

    closeSearch() {
      // this.showMenuStyle(false)
      this.$refs.headerSearchWrap.classList.remove('on')
    },

    goSearch(srchLang){
      let findNm = this.findNm

      if(srchLang != undefined){
        findNm = srchLang
      }

      const param = {
        searchFindNm : findNm
      }

      this.$router.push({name: '통합 검색', query: param})
      this.$refs.headerSearchWrap.classList.remove('on')
      this.findNm = ''

    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px){
  #header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid hsl(0, 0%, 78%);
  }
}
</style>
