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

            <router-view name="IPManagePage"/>

            <router-view name="NotFoundPage"/>

        </MainArea>

        <Notice/>
        <Modal/>
    </div>
</template>

<script>
  import {Modal,Notice} from './components'
  import styled from 'vue-styled-components'
  import store from '@/store'
  import {mapMutations} from "vuex";
  import {MUTATION_RESOLVE_LOGIN_RESULT} from "./store/modules/mutation_types";
  const MainArea = styled.div`
        margin-top: ${store.state.meta.heightOfHeader};
    `
  export default {
        created() {
            this.initLoginStatus()
        },
        methods: {
            ...mapMutations({
                mutation_resolveLoginResult: MUTATION_RESOLVE_LOGIN_RESULT
            }),
            initLoginStatus() {
                if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
                    return
                }

                if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
                    let tokenObj = JSON.parse(localStorage.getItem('token'))
                    let expTime = tokenObj.expTime

                    if(expTime < new Date().getTime()){
                        return
                    }

                    this.mutation_resolveLoginResult(tokenObj.username)

                }
            }
        },
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
