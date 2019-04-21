<template>
    <HeaderWrapper>

        <Inner>
            <Logo v-on:click.native="() => goTo('/')"/>
            <GapLineVertical/>
            <Item>索引</Item>
        </Inner>

    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper,NavList,Item,Inner,GapLineVertical} from "./style"
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
            Item,
            Inner,
            GapLineVertical
        }
    }
</script>

<style scoped>

</style>