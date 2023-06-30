import EventBus from "../../src/assets/js/eventBus";

const mixin = {
  data() {
    return {}
  },
  methods: {
    showLoading() {
      EventBus.$emit('showLoading', true)
    },

    hideLoading() {
      EventBus.$emit('showLoading',  false)
    }
  }
}

export default mixin
