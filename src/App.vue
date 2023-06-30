<template>
  <div id="app" >
    <div class="modal_cnt" id="allMenu" ref="allMenu">
      <div class="modal-header">
        <h2>전체메뉴</h2>
        <a href="javascript:;" class="close_btn" @click="clickCloseSideMenu">
          <img :src="sideMenuCloseIcon" alt="닫기">
        </a>
      </div>
      <div class="modal-content">
        <div class="site-map">
          <ul class="site-map-depth01 align-between top">
            <li v-for="(topMenRoute, i) in routes" v-bind:key="i">
              <a href="javascript:;" @click="clickSideMenuTop($event, topMenRoute)">{{ topMenRoute.name }}</a>
              <ul  class="site-map-depth02" :class="{'align-between': i === 0, 'top': i === 0}">
                <li v-for="(subMenuRoute, j) in topMenRoute.children" v-bind:key="j">
                  <a href="javascript:;" @click="clickSideMenuSub($event, subMenuRoute)">{{ subMenuRoute.name }}</a>
                  <ul class="site-map-depth03" v-if="subMenuRoute.meta.subMenuItemMgmNo">
                    <li v-for="(subMenuItem,  k) in findSubMenuItems(subMenuRoute.meta.subMenuItemMgmNo)" v-bind:key="k">
                      <a href="javascript:;" @click="clickSideMenuSubItem(subMenuRoute, subMenuItem)">{{ subMenuItem.title }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <spinner :loading="this.$store.state.loadingBarStatus"></spinner>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import * as api from '@/api/Menu.js'
import $ from 'jquery';
import EventBus from "./assets/js/eventBus";
import Spinner from "./components/Spinner";
import * as searchApi from '@/api/Search.js'

export default {
  components: {
    Spinner
  },

  data() {
    return {
      isShowSideMenu: false,
      sideMenuCloseIcon: require('./assets/img/popup_close2.png'),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
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
  },
  created() {
    this.keywordData()  // 인기검색어
    this.initEventBus()
    this.loadSubMenuItem()
    window.addEventListener('resize', this.eventWindowResize)
  },

  destroyed() {
    window.removeEventListener('resize', this.eventWindowResize)
  },

  methods: {
    ...mapActions({
      addSubMenuItem: 'addSubMenuItem',
      trendKeywords: 'trendKeywords'      // 인기검색어
    }),

    eventWindowResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      this.showSideMenu()
    },

    initEventBus() {
      EventBus.$on('showSideMenu', (isShowSideMenu) => {
        this.isShowSideMenu = isShowSideMenu
        this.showSideMenu()
      })
    },

    async keywordData() {
      const keywordData = await searchApi.selectSrchLang()
      if (keywordData.data.length > 0) {
        this.trendKeywords({items: keywordData.data})
      }
    },

    loadSubMenuItem() {
      const rootMenus = this.$router.options.routes
      if (rootMenus) {
        for (const rootMenu of rootMenus) {
          if (rootMenu.children) {
            for (const subMenu of rootMenu.children ) {
              if (subMenu.meta.subMenuItemType) {
                this.searchSubMenuItems(subMenu.meta)
              }
            }
          }
        }
      }
    },

    async searchSubMenuItems(meta) {
      localStorage.clear()
      sessionStorage.clear()

      const paramData = {
        type: meta.subMenuItemType,
        upMgmNo: meta.subMenuItemMgmNo
      }
      const subItems = await api.searchMenuSubItems(paramData)
      if (subItems.data.length > 0) {
        this.addSubMenuItem({id: meta.subMenuItemMgmNo, items: subItems.data})
      }
    },

    findSubMenuItems(subMenuId) {
      const subMenuItem = this.$store.getters.findSubMenu(subMenuId)
      if (subMenuItem) {
        return subMenuItem.items
      }
      return []
    },

    showSideMenu() {
      if (!this.isShowSideMenu) {
        return
      }

      if (this.windowWidth > 1200) {
        this.sideMenuCloseIcon = require('./assets/img/popup_close.png')
        $('.site-map-depth02').show()
        $('.site-map-depth03').show()
      } else {
        this.sideMenuCloseIcon = require('./assets/img/popup_close2.png')
      }

      const $modalCnt = $('#allMenu')
      if ($modalCnt.css("display") == 'none') {
        $modalCnt.before('<div id="mask"></div>')
        $("#mask").add($modalCnt).stop().fadeIn("fast")
        $modalCnt.attr("tabIndex", 0).focus()
      }

      $modalCnt.css({
        top: (this.windowHeight - $modalCnt.outerHeight()) / 2,
        left: (this.windowWidth - $modalCnt.outerWidth()) / 2,
      })
    },

    clickCloseSideMenu() {
      this.isShowSideMenu = false

      const $modalCnt = $('#allMenu')
      $("#mask").add($modalCnt).stop().fadeOut("fast",function  () {
        $("#mask").remove()
        $modalCnt.removeAttr("tabIndex")
      });
    },

    clickSideMenuTop(event, route) {
      if (this.windowWidth <= 1200) {
        const topMenuObj = $(event.target)
        topMenuObj.addClass("on").siblings().removeClass("on").parent().siblings().children().removeClass("on");
        topMenuObj.next().show().parent().siblings().find(".site-map-depth02").hide();
        topMenuObj.parent().siblings().find("ul").hide();
      } else {
        this.clickCloseSideMenu()

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
      }
    },

    clickSideMenuSub(event, route) {
      let isMoveMenu = true

      if (this.windowWidth <= 1200) {
        const subMenuObj = $(event.target)
        subMenuObj.next().slideDown().parent().siblings().find("ul").slideUp();

        const subMenuItemUl = event.target.nextElementSibling
        if (subMenuItemUl && subMenuItemUl.children) {
          isMoveMenu = false
        } else {
          isMoveMenu = true
        }
      }

      if (isMoveMenu) {
        this.clickCloseSideMenu()

        if (route) {
          let routePath = route.name
          let params = {}

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
      }
    },

    clickSideMenuSubItem(route, subMenuItem) {
      if (subMenuItem) {
        this.clickCloseSideMenu()

        const params = {
          subItemId: subMenuItem.mgmNo,
          subItemNm: subMenuItem.title
        }
        this.$router.push( {name: route.name, params: params} )
      }
    },
  }
}
</script>

<style lang="stylus">
@import 'assets/css/nanumbarungothicsubset.css'
@import 'assets/css/noto-sans-kr.css'
@import 'assets/css/kopubworld.css'
@import 'assets/css/nomalize.css'
@import 'assets/css/style.css'
@import 'assets/css/swiper.min.css'
@import 'assets/css/main.css'
</style>

<style scoped>
.modal_cnt {
  z-index: 110;
}
</style>
