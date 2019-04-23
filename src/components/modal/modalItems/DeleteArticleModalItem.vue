<template>
    <ModalItemWrapper>
        <ModalTitle>
            提示
        </ModalTitle>

        <ModalContent>
            {{modalContent}}
        </ModalContent>

        <OperationColumn>

            <ConfirmButton v-on:click="deleteArticle">
                确定
            </ConfirmButton>

            <CancelButton v-on:click="closeModal">
                取消
            </CancelButton>

        </OperationColumn>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>
    </ModalItemWrapper>
</template>

<script>
    import {
        ModalItemWrapper,
        ModalTitle,
        ModalContent,
        OperationColumn,
        ConfirmButton,
        CancelButton,
        LoadingWrapper} from "../style"
    import {Loading} from '@/components'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {MUTATION_TRIGGER_IS_LOADING, MUTATION_TRIGGER_SHOW_MODAL} from "../../../store/modules/mutation_types";
    import {ACTION_DELETE_ARTICLE} from "../../../store/modules/action_types";
    export default {

        computed: {
            ...mapState({
                modalContent: state => state.modal.modalContent,
                deletingArticleId: state => state.modal.deletingArticleId,
                loading: state => state.modal.loading
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING
            }),
            ...mapActions({
                action_deleteArticle: ACTION_DELETE_ARTICLE
            }),
            closeModal(){
                const payload = {
                    show: false
                }
                this.mutation_triggerShowModal(payload)
            },
            async deleteArticle() {
                const payload = {
                    loading: true,
                    id: 'modal'
                }
                this.mutation_triggerIsLoading(payload)

                const payload_ = {
                    article_id: this.deletingArticleId
                }

                await this.action_deleteArticle(payload_)

                const payload__ = {
                    loading: false,
                    id: 'modal'
                }
                this.mutation_triggerIsLoading(payload__)

                const payload___ = {
                    show: false
                }

                this.mutation_triggerShowModal(payload___)

            }
        },
        components: {
            ModalItemWrapper,
            ModalTitle,
            ModalContent,
            OperationColumn,
            ConfirmButton,
            CancelButton,
            LoadingWrapper,
            Loading
        }
    }
</script>

<style scoped>

</style>