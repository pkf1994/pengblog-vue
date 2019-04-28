<template>
    <NotFoundPageWrapper>
        <NotFoundImage :src="imageUrl"/>
            <Title>404 NOT FOUND</Title>
    </NotFoundPageWrapper>
</template>

<script>
    import {NotFoundPageWrapper, NotFoundImage, Title} from "./style";

    export default {
        data() {
            return {
                imageUrl: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/box_PNG132.png'
            }
        },

        components: {
            NotFoundPageWrapper, NotFoundImage, Title
        }
    }
</script>

<style scoped>

</style>