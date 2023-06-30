<template>
    <li v-if="isVisible" >
      <a @click="clickTopMenu()">{{ menuName }}</a>
      <ul class="depth02">
        <li v-for="subMenu in subMenuLink">
          <a @click="clickSubMenu(subMenu)">{{ subMenu.name }}</a>
        </li>
      </ul>
    </li>
</template>

<script>
export default {
  name: "TopMenu",
  props: {
    route: {
      type: Object,
    },
  },
  computed: {
    isVisible() {
      if ( this.route.meta && (this.route.meta.visible === undefined || this.route.meta.visible) ) {
        return true;
      }
      return false;
    },
    menuName() {
      return this.route.name
    },
    subMenuLink() {
      return this.route.children.filter(subMenu => {return subMenu.meta.visible})
    }
  },
  methods: {
    clickTopMenu() {
      let params = {}
      let routePath = ''

      if (this.route.children) {
        routePath = this.route.children[0].name

        if (this.route.children[0].meta.subMenuItemMgmNo) {
          params = {
            subItemId: this.route.children[0].meta.subMenuItemMgmNo
          }
        }
        this.$router.push( {name: routePath, params: params} )
      }
    },
    clickSubMenu(subMenu) {
      let params = {}
      let routePath = ''

      if (subMenu) {
        routePath = subMenu.name

        if (subMenu.meta.subMenuItemMgmNo) {
          params = {
            subItemId: subMenu.meta.subMenuItemMgmNo
          }
        }
        this.$router.push( {name: routePath, params: params} )
      }
    }
  }
}
</script>

<style scoped>

</style>
