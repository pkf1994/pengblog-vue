<template>
    <HeaderWrapper>

        <Inner>
            <Logo v-on:click.native="() => goTo('/')"/>
            <GapLineVertical/>
            <Title>索引</Title>

        </Inner>

    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper,NavList,Title,Inner,GapLineVertical} from "./style"
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
            Title,
            Inner,
            GapLineVertical
        }
    }
</script>

<style scoped>

</style>