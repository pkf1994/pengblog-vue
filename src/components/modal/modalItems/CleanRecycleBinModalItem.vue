<template>
    <ModalItemWrapper>
        <ModalTitle>
            提示
        </ModalTitle>

        <ModalContent>
            {{modalContent}}
        </ModalContent>

        <OperationColumn>

            <ConfirmButton v-on:click="clean">
                确定
            </ConfirmButton>

            <CancelButton v-on:click="closeModal">
                取消
            </CancelButton>

        </OperationColumn>

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
    import {MUTATION_RESET, MUTATION_TRIGGER_SHOW_MODAL} from "../../../store/modules/mutation_types";
    import {ACTION_CLEAN_RECYCLEBIN, ACTION_GET_ARTICLE_LIST_DATA} from "../../../store/modules/action_types";
    export default {

        computed: {
            ...mapState({
                modalContent: state => state.modal.modalContent,
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_reset: MUTATION_RESET
            }),
            ...mapActions({
                action_cleanRecycleBin: ACTION_CLEAN_RECYCLEBIN,
                action_getArticleListOfHome: ACTION_GET_ARTICLE_LIST_DATA
            }),
            closeModal(){
                const payload = {
                    show: false
                }
                this.mutation_triggerShowModal(payload)
            },
            async clean() {

                this.action_cleanRecycleBin()

                const payload = {
                    show: false
                }

                this.mutation_triggerShowModal(payload)

                this.mutation_reset('home')

                this.action_getArticleListOfHome()

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