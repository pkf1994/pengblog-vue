<template>
    <NoticeWrapper>
        <NoticePositioner>
            <transition name="notice-animate">
                <NoticeBody v-if="show">
                    {{noticeContent}}
                </NoticeBody>
            </transition>
        </NoticePositioner>
    </NoticeWrapper>
</template>

<script>
    import {NoticeWrapper,NoticePositioner,NoticeBody} from './style'
    import {mapState} from "vuex";

    const noticeTime = 3500

    export default {

        computed: {
            ...mapState({
                show: state => state.notice.show,
                noticeContent: state => state.notice.noticeContent
            })
        },

        watch: {
            show() {
                const _this = this
                if(_this.show) {
                    setTimeout(() => {
                        const payload = {
                            show: false
                        }
                        _this.notify(payload)
                    }, noticeTime)
                }
            }
        },

        components: {
            NoticeWrapper,NoticePositioner,NoticeBody
        }
    }
</script>

<style scoped>
    .notice-animate-enter-active,.notice-animate-leave-active{
        transition: all .4s ease;
    }
    .notice-animate-enter,.notice-animate-leave-to{
        transform: translateY(-100px);
        opacity: 0;
    }

</style>