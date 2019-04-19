<template>
    <HeaderWrapper>

        <Logo v-on:click.native="() => goTo('/')"/>

        <NavList>
            <Item>
                <span class="iconfont" :style="{fontSize:'1.5rem'}">&#xe76a;</span>
                索引
            </Item>
        </NavList>
    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper,NavList,Item} from "./style"
    import {Logo} from './components'
    export default {
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