<template>
    <HeaderWrapper>
        <RouterLink to="/">
            <Logo/>
        </RouterLink>
    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper} from "./style"
    import {Logo} from './components'
    export default {
        components:{
            HeaderWrapper,
            Logo
        }
    }
</script>

<style scoped>

</style>