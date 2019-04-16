<template>
    <div id="app">
        <router-view name="header"/>

        <keep-alive>
            <router-view name="Home"/>
        </keep-alive>

        <router-view name="ArticlePage"/>
        <Notice/>
        <Modal/>
    </div>
</template>

<script>
  import {Modal,Notice} from './components'
  export default {
        components: {
            Modal,Notice
        }
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
