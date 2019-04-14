<template>
    <LoadingWrapper>
        <img :src="loadingSpin" alt="Loading icon"/>
        <Title v-if="showTitle">IS LOADING</Title>
    </LoadingWrapper>
</template>

<script>
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    import {LoadingWrapper,Title} from './style'

    export default {
        props: {
            showTitle: true
        },
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