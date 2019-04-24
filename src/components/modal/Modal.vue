<template>
    <ModalWrapper>

        <transition name="fade">
            <BackgroundCover v-if="show"
                             v-on:click="close"/>
        </transition>

        <transition name="slide-in">
            <ModalBody v-if="show">

                <ShareToWechatModalItem v-if="context === 'shareToWechat'"/>

                <CaptchaModalItem v-if="context === 'captcha'"/>

                <ContactMeModalItem v-if="context === 'contactMe'"/>

                <DeleteArticleModalItem v-if="context === 'deleteArticle'"/>

                <DeleteArticleListModalItem v-if="context === 'deleteArticleList'"/>

                <CloseButton class="iconfont"
                             :loading="loading"
                             v-on:click="close">&#xe70b;</CloseButton>

            </ModalBody>
        </transition>

    </ModalWrapper>
</template>

<script>
    import {ModalWrapper,
            BackgroundCover,
            ModalBody,
            CloseButton} from './style'
    import {ShareToWechatModalItem,
            CaptchaModalItem,
            ContactMeModalItem,
            DeleteArticleModalItem,
            DeleteArticleListModalItem} from './modalItems'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_TRIGGER_SHOW_MODAL} from "../../store/modules/mutation_types";

    export default {

        computed: {
            ...mapState({
                loading: state => state.modal.loading,
                show: state => state.modal.show,
                context: state => state.modal.context
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL
            }),
            //关闭modal
            close() {
                const payload = {
                    show: false
                }
                this.mutation_triggerShowModal(payload)
            }
        },
        components: {
            ModalWrapper,
            BackgroundCover,
            ModalBody,
            CloseButton,
            ShareToWechatModalItem,
            CaptchaModalItem,
            ContactMeModalItem,
            DeleteArticleModalItem,
            DeleteArticleListModalItem
        }
    }
</script>

<style scoped>
    .fade-enter-active,.fade-leave-active{
        transition: all .2s ease;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
    }

    .slide-in-enter-active{
        transition: all .4s ease;
    }
    .slide-in-leave-active{
        transition: all .2s ease;
    }
    .slide-in-enter{
        transform: translateY(-100px);
        opacity: 0;
    }
    .slide-in-leave-to{
        transform: scale(0.8);
        opacity: 0;
    }
</style>