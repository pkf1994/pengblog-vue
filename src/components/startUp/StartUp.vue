<template>
    
</template>

<script>
    import {CurrentBrowserEdit} from '../../exJs/currentBrowserEdit'
    export default {
        created() {
            window.metaColor = '#4fc08d'
            window.metaGray = '#A2A2A2'
            window.metaBorderColor = '#F0F0F0'
            window.maxMobileWidth = 768
            window.milePost = 1024
            window.bigScreenWidth = 1600
            window.heightOfHeader = '4.5rem'
            window.defaultImageSrc = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/default.png'
            window.browserEdit = CurrentBrowserEdit()
        }
    }
</script>

<style scoped>

</style>