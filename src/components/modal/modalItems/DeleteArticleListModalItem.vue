<template>
    <ModalItemWrapper>
        <ModalTitle>
            提示
        </ModalTitle>

        <ModalContent>
            {{modalContent}}
        </ModalContent>

        <OperationColumn>

            <ConfirmButton v-on:click="deleteArticleList">
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
    import {
        MUTATION_TRIGGER_IS_LOADING,
        MUTATION_TRIGGER_MULTI_SELECTING,
        MUTATION_TRIGGER_SHOW_MODAL
    } from "../../../store/modules/mutation_types";
    import {ACTION_DELETE_ARTICLE_LIST} from "../../../store/modules/action_types";
    export default {

        computed: {
            ...mapState({
                modalContent: state => state.modal.modalContent,
                loading: state => state.modal.loading
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING,
                mutation_triggerMultiSelecting: MUTATION_TRIGGER_MULTI_SELECTING
            }),
            ...mapActions({
                action_deleteArticleList: ACTION_DELETE_ARTICLE_LIST
            }),
            closeModal(){
                const payload = {
                    show: false
                }
                this.mutation_triggerShowModal(payload)
            },
            async deleteArticleList() {
                const payload = {
                    loading: true,
                    id: 'modal'
                }
                this.mutation_triggerIsLoading(payload)

                await this.action_deleteArticleList()

                const payload__ = {
                    loading: false,
                    id: 'modal'
                }
                this.mutation_triggerIsLoading(payload__)

                const payload___ = {
                    show: false
                }

                this.mutation_triggerShowModal(payload___)

                this.mutation_triggerMultiSelecting(false)
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