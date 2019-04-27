<template>
    <LoadingWrapper>
        <img v-if="browser !== 'Edge'" :src="loadingSpin" alt="Loading icon" :style="{opacity:'1'}"/>
        <i v-if="browser === 'Edge'" class="fa fa-spinner fa-pulse fa-2x"/>
        <Title v-if="showTitle">IS LOADING</Title>
    </LoadingWrapper>
</template>

<script>
    import loadingSpin from '../../assets/svg/loading-spin.svg'
    import {LoadingWrapper,Title} from './style'
    import {mapState} from "vuex";

    export default {
        props: {
            showTitle: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {loadingSpin: loadingSpin}
        },
        computed: {
            ...mapState({
                browser: state => state.meta.browser
            })
        },
        components: {
            LoadingWrapper,
            Title
        }
    }
</script>

<style scoped>

</style>