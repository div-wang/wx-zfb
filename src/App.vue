<style lang='less'>
  @import './styles/index';
</style>

<template>
  <div class="app">
    <input type="text" name="copyInput" id="copyInput" style="position:absolute;opacity: 0;">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from 'router'
  import urlQuery from 'utils/urlQuery'

  const isEmptyObject = (o) => {
    for (let t in o) {
      return false
    }
    return true
  }

  export default {
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>
