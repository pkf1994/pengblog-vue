<template>
    <IPItemWrapper>

        <Header v-if="withHeader">
            <Ip>IP</Ip>
            <DateOfBeingBanned>封禁日期</DateOfBeingBanned>
            <LiftedButtonWrapper>操作</LiftedButtonWrapper>
        </Header>

        <Body>
            <Ip :isLifted="!ip.ip_isBanned">{{ip.ip_ip}}</Ip>

            <DateOfBeingBanned :isLifted="!ip.ip_isBanned">{{DateFormat('yy-MM-dd hh:mm',new Date(ip.ip_banTime))}}</DateOfBeingBanned>

            <LiftedButtonWrapper>
                <LiftedButton :loading="loading"
                              :disabled="!ip.ip_isBanned || loading"
                              v-on:click="tryToLiftedIP"
                              :style="{flexGrow:'0'}">

                    <span v-if="!loading">&nbsp;&nbsp;lifted&nbsp;&nbsp;</span>
                    <span v-if="loading">trying...</span>

                </LiftedButton>
            </LiftedButtonWrapper>
        </Body>
    </IPItemWrapper>
</template>

<script>
    import {DateFormat} from "../../../../exJs/dateFormatUtil";
    import {IPItemWrapper,Header,Body,Ip,DateOfBeingBanned,LiftedButtonWrapper,LiftedButton} from "./style";
    import {ACTION_LIFTED_IP} from "../../../../store/modules/action_types";
    import {mapActions, mapMutations} from "vuex";
    import {MUTATION_RESET_PAGINATION} from "../../../../store/modules/mutation_types";

    export default {
        data() {
            return {
                loading: false
            }
        },
        props: {
            ip: Object,
            withHeader: Boolean
        },
        methods: {
            ...mapActions({
                action_liftedIP: ACTION_LIFTED_IP
            }),
            ...mapMutations({
                mutation_resetPagination: MUTATION_RESET_PAGINATION
            }),
            async tryToLiftedIP() {
                this.loading = true

                await this.action_liftedIP(this.ip.ip_ip)

                this.mutation_resetPagination('ipManagePage')

            },
            DateFormat
        },
        components: {
            IPItemWrapper,Header,Body,Ip,DateOfBeingBanned,LiftedButtonWrapper,LiftedButton
        }
    }
</script>

<style scoped>

</style>