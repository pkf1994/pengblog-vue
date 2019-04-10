<template>
    <ForMoreWrapper>

        <NoMore v-if="noMore && !loading">
            NO MORE TO SHOW (￣﹁￣)
        </NoMore>

        <ClickToGetMore v-if="!noMore && !loading"
                        v-on:click="moreDataGetter">
            CLICK FOR MORE づ￣ 3￣)づ
        </ClickToGetMore>

        <LoadingIcon v-if="loading" :src="loadingSpin"/>

    </ForMoreWrapper>
</template>

<script>
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    import {ForMoreWrapper,NoMore,ClickToGetMore,LoadingIcon} from './style'
    export default {
        props:{
            moreDataGetter: Function,
            noMore: Boolean,
            loading: Boolean
        },
        data(){
            return {
                loadingSpin:loadingSpin,
            }
        },
        components: {
            ForMoreWrapper,NoMore,ClickToGetMore,LoadingIcon
        }
    }
</script>

<style scoped>

</style>