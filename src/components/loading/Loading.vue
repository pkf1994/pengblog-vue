<template>
    <LoadingWrapper>
        <img :src="loadingSpin" alt="Loading icon"/>
        <Title>IS LOADING</Title>
    </LoadingWrapper>
</template>

<script>
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    import {LoadingWrapper,Title} from './style'

    export default {
        data(){
            return {loadingSpin: loadingSpin}
        },
        components: {
            LoadingWrapper,
            Title
        }
    }
</script>

<style scoped>

</style>