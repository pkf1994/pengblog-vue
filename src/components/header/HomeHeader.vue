<template>
    <HeaderWrapper>

        <Logo v-on:click.native="() => goTo('/')"/>

        <NavList>
            <Item>
                <span class="iconfont"
                      :style="{fontSize:'1.2rem'}"
                      v-on:click="() => goTo('/manage')">&#xe76a;</span>
                <span v-on:click="() => goTo('/manage')">索引</span>
            </Item>

            <Item v-if="alreadyLogin">
                <span class="iconfont"
                      :style="{fontSize:'1.2rem'}"
                      v-on:click="() => goTo('/edit')">&#xe67f;</span>
                <span v-on:click="() => goTo('/edit')">写作</span>
            </Item>
        </NavList>
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