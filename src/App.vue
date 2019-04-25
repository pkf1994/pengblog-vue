<template>
    <div id="app">

        <router-view name="header"/>

        <MainArea>
            <keep-alive>
                <router-view name="Home"/>
            </keep-alive>

            <router-view name="ArticlePage"/>

            <keep-alive>
                <router-view name="ManagePage"/>
            </keep-alive>

            <router-view name="ArticleEditPage"/>

            <router-view name="LoginPage"/>

        </MainArea>

        <Notice/>
        <Modal/>
    </div>
</template>

<script>
  import {Modal,Notice} from './components'
  import styled from 'vue-styled-components'
  import store from '@/store'
  const MainArea = styled.div`
        margin-top: ${store.state.meta.heightOfHeader};
    `
  export default {
        components: {
            Modal,Notice,MainArea
        }
  }
</script>


<style>

#app{
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    color:#2c3e50;
}

.slide-up-fade-enter-active {
    transition: all .4s ease;
}

.slide-up-fade-enter, .slide-up-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
}

</style>
