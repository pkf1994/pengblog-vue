<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
  </div>
</template>

<script>
    import {CurrentBrowserEdit} from './exJs/currentBrowserEdit'
    window.metaColor = '#4fc08d'
    window.metaGray = '#A2A2A2'
    window.metaBorderColor = '#F0F0F0'
    window.maxMobileWidth = 768
    window.milePost = 1024
    window.bigScreenWidth = 1600
    window.heightOfHeader = '4.5rem'
    window.defaultImageSrc = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/default.png'
    window.browserEdit = CurrentBrowserEdit()
  export default {

  }
</script>


<style lang="stylus">
#app
  font-family 'Microsoft Yahei', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
