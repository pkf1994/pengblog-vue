<template>
    <FooterWrapper>

        <Row1>粤ICP备18156165号 |&nbsp;
            <ContactMe v-on:click="showContactMeModal">
                与我联系
            </ContactMe>
        </Row1>
        <Row2>
            Copyright © 2019-2020 Kaifan Peng
        </Row2>

    </FooterWrapper>
</template>

<script>
    import {FooterWrapper,Row1,Row2,ContactMe} from './style'
    import {mapMutations} from "vuex";
    import {MUTATION_TRIGGER_SHOW_MODAL} from "../../store/modules/mutation_types";
    export default {
        methods: {
            showContactMeModal(){
                const payload = {
                    show: true,
                    context: 'contactMe'
                }
                this.mutation_triggerShowModal(payload)
            },
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL
            })
        },
        components: {
            FooterWrapper,Row1,Row2,ContactMe
        }
    }
</script>

<style scoped>

</style>