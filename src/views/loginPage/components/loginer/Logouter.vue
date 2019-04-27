<template>
    <LogouterWrapper>

        <Title>
            已登录
        </Title>


        <CurrentAutoInfo>
            <Info>
                <span>当前用户:&nbsp;</span>
                <span>{{currentUser}}</span>
            </Info>

            <Info>
                <span>过期时间:&nbsp;</span>
                <span>{{expireTime}}</span>
            </Info>
        </CurrentAutoInfo>



        <ButtonWrapper>

            <ButtonFixer>
                <Button :disabled="loading"
                        backgroundColor="#FFDDE4"
                        color="#99001F"
                        v-on:click="tryToLogout"
                        borderColor="#FFDDE4" >
                    <i class="fa fa-sign-out" v-if="!loading"/>
                    {{loading ? 'trying...' : '  登出  '}}
                </Button>
            </ButtonFixer>

        </ButtonWrapper>
    </LogouterWrapper>
</template>

<script>
    import {DateFormat} from "../../../../exJs/dateFormatUtil";
    import {Button} from '@/components'
    import {LogouterWrapper,Title,CurrentAutoInfo,Info,ButtonWrapper,ButtonFixer} from './style'
    import {mapActions, mapState} from "vuex";
    import {ACTION_LOGOUT} from "../../../../store/modules/action_types";
    export default {
        data() {
            return {
                expireTime: 'unknow'
            }
        },
        computed: {
            ...mapState({
                currentUser: state => state.login.currentUser,
                loading: state => state.login.loading
            })
        },
        mounted() {
            this.initExpireTime()
        },
        methods: {
            DateFormat,
            tryToLogout() {
                  this.action_logout()
            },
            initExpireTime() {
                if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
                    let tokenObj = JSON.parse(localStorage.getItem('token'))
                    this.expireTime = DateFormat('MM/dd hh:mm:ss',new Date(tokenObj.expTime))
                }
            },
            ...mapActions({
                action_logout: ACTION_LOGOUT
            })
        },
        components: {LogouterWrapper,Title,CurrentAutoInfo,Info,ButtonWrapper,Button,ButtonFixer}
    }
</script>

<style scoped>

</style>