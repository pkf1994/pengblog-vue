<template>
    <NotFoundPageWrapper>
        <NotFoundImage :src="imageUrl" :imageUrlReady="imageUrlReady"/>
        <Title>40X ERR</Title>
    </NotFoundPageWrapper>
</template>

<script>
    import {NotFoundPageWrapper, NotFoundImage, Title} from "./style";
    import {imageLoader} from "../../exJs/imageLoader";

    export default {
        data() {
            return {
                imageUrl: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/box_PNG132.png',
                imageUrlReady: false
            }
        },
        created() {
            this.preloadImage()
        },
        methods:{
            preloadImage() {
                this.imageLoader(this.imageUrl,() => {
                    this.imageUrlReady = true
                })
            },
            imageLoader
        },
        components: {
            NotFoundPageWrapper, NotFoundImage, Title
        }
    }
</script>

<style scoped>

</style>