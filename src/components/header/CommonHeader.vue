<template>
    <HeaderWrapper>

        <Logo v-on:click.native="() => goTo('/')"/>

    </HeaderWrapper>

</template>

<script>
    import {HeaderWrapper,NavList,Item} from "./style"
    import {Logo} from './components'
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState({
                alreadyLogin: state => state.login.alreadyLogin
            })
        },
        methods: {
            goTo(path) {
                this.$router.push({path:path})
            }
        },
        components:{
            HeaderWrapper,
            Logo,
            NavList,
            Item
        }
    }
</script>

<style scoped>

</style>