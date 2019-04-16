<template>
    <ThemeJumbotron>

        <Inner>
            <ThemeImageWrapper>
                <ThemeImage :src="themeImage"/>
                <ThemeTitle/>
            </ThemeImageWrapper>


            <PoweredBy>
                <VueLogo :src="vueLogo"/>
                <Title>Vue.js</Title>
            </PoweredBy>
        </Inner>

    </ThemeJumbotron>
</template>

<script>
    import {ThemeJumbotron,Inner,ThemeImageWrapper,ThemeImage,Gap,PoweredBy,VueLogo,Title} from './style'
    import {ThemeTitle} from './components'
    import vueLogo from '@/assets/svg/vue.svg'
    export default {
        data() {
            return {
                themeImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/theme.a5d5fc1c.png',
                vueLogo
            }
        },
        components: {
            ThemeJumbotron,Inner,
            ThemeImageWrapper,
            ThemeImage,
            Gap,
            PoweredBy,
            ThemeTitle,
            VueLogo,Title
        }
    }
</script>

<style scoped>

</style>