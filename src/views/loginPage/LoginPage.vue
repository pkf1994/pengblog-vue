<template>
    <LoginPageWrapper>

        <Jumbotron :imageSrc="themeImage">
            <Slogan>「人生の宝物を探しにいこう」</Slogan>
        </Jumbotron>

        <Gap/>

        <LoginBar>

            <SwitchButton>
                <Item :active="loginMode === 'common'" v-on:click="() => appointLoginMode('common')">账户登录</Item>
                <Item :active="loginMode === 'dynamic'" v-on:click="() => appointLoginMode('dynamic')">短信登录</Item>
                <Space/>
            </SwitchButton>

            <Loginer v-if="loginMode === 'common'"/>

            <DynamicLoginer  v-if="loginMode === 'dynamic'"/>

        </LoginBar>

    </LoginPageWrapper>
</template>

<script>
    import {Loginer,DynamicLoginer} from '@/components'
    import {LoginPageWrapper,Jumbotron,Slogan,Gap,LoginBar,SwitchButton,Item,Space} from './style'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_LOGIN_MODE} from "../../store/modules/mutation_types";
    export default {
        data() {
            return {
                themeImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/black-and-white-nature-sky-field.440ec64e.jpg'
            }
        },
        computed: {
            ...mapState({
                loginMode: state => state.login.loginMode
            })
        },
        methods: {
            ...mapMutations({
                mutation_appointMode: MUTATION_APPOINT_LOGIN_MODE
            }),
            appointLoginMode(loginMode) {
                this.mutation_appointMode(loginMode)
            }
        },
        components: {
            Loginer,DynamicLoginer,LoginPageWrapper,Jumbotron,Slogan,Gap,LoginBar,SwitchButton,Item,Space
        }
    }
</script>

<style scoped>

</style>