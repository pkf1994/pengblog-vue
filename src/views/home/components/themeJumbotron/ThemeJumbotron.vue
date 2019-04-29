<template>
    <transition name="fade" appear>

        <ThemeJumbotronWrapper>

            <ThemeJumbotron :minHeightOfJumbotron="minHeightOfJumbotron"
                            :themeImage_Ready="themeImage_Ready"
                            :background="themeImage_">

            </ThemeJumbotron>

            <Inner>
                <ThemeImageWrapper>
                    <ThemeImage :src="themeImage"
                                :themeImageReady="themeImageReady"
                                :style="{width:'100%'}"/>
                    <transition name="slide-up-delay" appear>
                        <ThemeTitle/>
                    </transition>
                </ThemeImageWrapper>
            </Inner>
        </ThemeJumbotronWrapper>

    </transition>
</template>

<script>
    import {ThemeJumbotronWrapper,ThemeJumbotron,Inner,ThemeImageWrapper,ThemeImage,Gap,PoweredBy,VueLogo,Title} from './style'
    import {ThemeTitle} from './components'
    import vueLogo from '@/assets/svg/vue.svg'
    import {mapState} from "vuex";
    import {imageLoader} from "../../../../exJs/imageLoader";

    export default {
        data() {
            return {
                themeImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/theme.png',
                themeImageReady: false,
                vueLogo,
                themeImage_: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/black-and-white-nature-sky-field.440ec64e.jpg',
                themeImage_Ready: false
            }
        },
        computed: {
            ...mapState({
                minHeightOfJumbotron: state => 'calc(' + state.meta.heightOfWindow + 'px' + ' - ' + state.meta.heightOfHeader + ')'
            })
        },
        created() {
            this.preloadImage()
        },
        methods: {
            preloadImage() {
                this.imageLoader(this.themeImage,() => {
                    this.themeImageReady = true
                })
                this.imageLoader(this.themeImage_,() => {
                    this.themeImage_Ready = true
                })
            },
            imageLoader
        },
        components: {
            ThemeJumbotronWrapper,
            ThemeJumbotron,
            Inner,
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

    .fade-delay-enter-active,.fade-delay-leave-active{
        transition: all 1s ease;
        transition-delay: 1s;
    }

    .fade-delay-enter,.fade-delay-leave-to{
        opacity: 0;
    }


    .slide-up-delay-enter-active,.slide-up-delay-leave-active{
        transition: all 1s ease;
        transition-delay: 0.5s;
    }

    .slide-up-delay-enter,.slide-up-delay-leave-to{
        transform: translateY(50px);
        opacity: 0;
    }

    .fade-enter-active,.fade-leave-active{
        transition: all 1s ease;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
        transform: translateY(10px);
    }
</style>