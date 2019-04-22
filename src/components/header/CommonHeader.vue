<template>
    <HeaderWrapper>

        <Logo v-on:click.native="() => goTo('/')"/>

        <NavList>
            <Item>
                <span class="iconfont"
                      :style="{fontSize:'1.5rem'}"
                      v-on:click="() => goTo('/manage')">&#xe76a;</span>
                <span v-on:click="() => goTo('/manage')">索引</span>
            </Item>

            <Item>
                <span class="iconfont"
                      :style="{fontSize:'1.5rem'}"
                      v-on:click="() => goTo('/edit')">&#xe67f;</span>
                <span v-on:click="() => goTo('/edit')">写作</span>
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