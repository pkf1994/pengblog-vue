<template>
    <IpManagePageWrapper>


        <MainArea>
            <IPItem v-for="(ip,index) in ipList"
                    :key="ip.ip_ip"
                    :ip="ip"
                    :withHeader="index === 0"/>
        </MainArea>

        <PaginationFixer>
            <Pagination paginationId="ipManagePage"/>
        </PaginationFixer>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>

    </IpManagePageWrapper>
</template>

<script>
    import {
        IpManagePageWrapper,
        LoadingWrapper,
        PaginationFixer,
        MainArea,
        Title} from "./style";
    import {Loading,
        Pagination} from '@/components'
    import {IPItem} from './components'
    import {mapActions, mapState} from "vuex";
    import {ACTION_GET_IP_LIST} from "../../store/modules/action_types";
    export default {

        computed: {
            ...mapState({
                loading: state => state.ipManage.loading,
                ipList: state => state.ipManage.ipList,
                currentPage: state => state.pagination.ipManagePage.currentPage
            })
        },

        watch: {
            currentPage() {
                if(this.currentPage !== 0) {
                    this.action_getIPList()
                }
            }
        },

        methods: {
            ...mapActions({
                action_getIPList: ACTION_GET_IP_LIST
            })
        },

        components: {
            IpManagePageWrapper,
            LoadingWrapper,
            PaginationFixer,
            MainArea,
            Title,
            Loading,
            Pagination,
            IPItem
        }
    }
</script>

<style scoped>

</style>