<template>
  <article class="sub-title">
    <h2 class="title" ref="title">
      <div class="layout">
        <strong>{{ topMenuName }}</strong>
        <p>{{ menuInfo }}</p>
      </div>
    </h2>
    <nav id="subGnb">
      <ul class="layout align-start" ref="subMenu">
        <li name="subMenuItem" class="on" v-for="route in routeChildren">
          <a href="javascript:;" :class="{'on': isSelectedSubMenu(route), 'depth-on': route.meta.subMenuItemMgmNo}" @click="eventClickSubMenu($event, route)">{{ route.name }}</a>
          <div v-if="route.meta.subMenuItemMgmNo" ref="subMenuItem" style="position:relative;z-index:10">
            <ul class="subGnb-depth03" v-if="route.meta.subMenuItemMgmNo">
              <li v-for="subMenuItem in findSubMenuItems(route.meta.subMenuItemMgmNo)">
                <a href="javascript:;" @click="eventClickSubMenuItem($event, route, subMenuItem)">{{ subMenuItem.title }}</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </article>
</template>

<script>
import $ from 'jquery';

export default {
  name: "SubMenu",
  data() {
    return {
      up : false,
      routePath: '',
      subMenuData: [],
    }
  },
  created() {
    window.addEventListener('scroll', this.eventMenuTextSlide)
  },

  destroyed() {
    window.removeEventListener('scroll', this.eventMenuTextSlide)
  },

  mounted() {
    this.$nextTick(function () {
      const subGnbLl = document.getElementsByName('subMenuItem')
      subGnbLl.forEach(function(li, idx) {
        li.style.width = (100 / subGnbLl.length) + '%'
      })
    })
  },
  updated() {
    this.$nextTick(function () {
      const subGnbLl = document.getElementsByName('subMenuItem')
      subGnbLl.forEach(function(li, idx) {
        li.style.width = (100 / subGnbLl.length) + '%'
      })
    })
  },
  computed: {
    routeChildren() {
      if ( (this.routePath === this.$route.matched[0].path) && this.subMenuData) {
        return this.subMenuData
      }

      this.routePath = this.$route.matched[0].path
      this.subMenuData = this.getSubMenuData(this.routePath)

      return this.subMenuData
    },

    topMenuName() {
      return this.$route.matched[0].name
    },
    menuInfo() {
      if ( this.$route.meta && (this.$route.meta.menuInfo === undefined || this.$route.meta.menuInfo === '') ) {
        return '메뉴 소개글 없다.';
      }
      return this.$route.meta.menuInfo;
    },

  },
  methods: {
    eventMenuTextSlide() {
      const scrollTop = $(window).scrollTop()
      const title = $(".sub-title > .title")
      if (scrollTop >= 75) {
        title.addClass('scroll')
      } else {
        title.removeClass('scroll')
      }
    },

    findSubMenuItems(subMenuId) {
      const subMenuItem = this.$store.getters.findSubMenu(subMenuId)
      if (subMenuItem) {
        return subMenuItem.items
      }
      return []
    },

    eventClickSubMenu(event, subMenu) {
      if (event.target) {
        const subMenuItemDiv = event.target.nextElementSibling
        if(subMenuItemDiv && subMenuItemDiv.children) {

          const subMenuItemUl = subMenuItemDiv.querySelector('.subGnb-depth03');
          if (subMenuItemUl.style.display === 'block') {
            $(subMenuItemDiv.children[0]).stop().slideUp()
          } else {
            $(subMenuItemDiv.children[0]).stop().slideDown()
          }
        } else {
          let params = {}
          let routePath = ''

          if (subMenu) {
            routePath = subMenu.name

            if (subMenu['component']){
              if (subMenu.meta.subMenuItemMgmNo) {
                params = {
                  subItemId: subMenu.meta.subMenuItemMgmNo
                }
              }

              this.$router.push( {name: routePath, params: params} )
            } else {
              if (subMenu.meta.linkUrl) {
                window.open(subMenu.meta.linkUrl);
              }
            }
          }
        }
      }
    },

    isSelectedSubMenu(subMenu) {
      if (this.$route.name === subMenu.name) {
        return true
      } else {
        if (this.$route.name.indexOf(subMenu.name) > -1 && this.$route.name.indexOf('상세') > -1) {
          return true
        }
      }
      return false
    },

    eventClickSubMenuItem(event, route, subMenuItem) {
      for (const subMenuItemDiv of this.$refs.subMenuItem) {
        $(subMenuItemDiv.children[0]).stop().slideUp()
      }

      // const subMenuItemDiv = event.target.parentElement.parentElement.parentElement
      // if(subMenuItemDiv && subMenuItemDiv.children) {
      //   const subMenuItemUl = subMenuItemDiv.querySelector('.subGnb-depth03');
      //   if (subMenuItemUl.style.display === 'block') {
      //     $(subMenuItemDiv.children[0]).stop().slideUp()
      //   } else {
      //     $(subMenuItemDiv.children[0]).stop().slideDown()
      //   }
      // }

      if (subMenuItem) {
        const params = {
          subItemId: subMenuItem.mgmNo,
          subItemNm: subMenuItem.title
        }
        this.$router.push( {name: route.name, params: params} )
      }
    },

    getSubMenuData(path) {
      const subMenus = []
      const children = this.$router.options.routes
      if (path) {
        let chunks = path.split('/')
        chunks = chunks.filter((chunk) => chunk !== '')
        if (chunks.length) {
          if (children) {
            const found = children.find((child) => child.path === path)
            if (found) {
              for (let subMenu of found.children) {
                if (subMenu.meta.visible) {
                  subMenus.push(subMenu)
                }
              }
            }
          }
        }
      }
     return subMenus;
    },
  }
}
</script>

<style scoped>
/*.slide-enter-active, .slide-leave-active {*/
/*  -moz-transition-duration: 1s;*/
/*  -webkit-transition-duration: 1s;*/
/*  -o-transition-duration: 1s;*/
/*  transition-duration: 1s;*/
/*  -moz-transition-timing-function: ease-in;*/
/*  -webkit-transition-timing-function: ease-in;*/
/*  -o-transition-timing-function: ease-in;*/
/*  transition-timing-function: ease-in;*/
/*}*/
/*.slide-leave-active {*/
/*  -moz-transition-duration: 1s;*/
/*  -webkit-transition-duration: 1s;*/
/*  -o-transition-duration: 1s;*/
/*  transition-duration: 1s;*/
/*  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);*/
/*  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);*/
/*  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);*/
/*  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);*/
/*}*/
/*.slide-enter-to, .slide-leave {*/
/*  max-height: 500px;*/
/*  overflow: hidden;*/
/*}*/
/*.slide-enter, .slide-leave-to {*/
/*  overflow: hidden;*/
/*  max-height: 0;*/
/*}*/

</style>
