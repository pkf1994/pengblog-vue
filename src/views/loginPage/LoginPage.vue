<template>
    <LoginPageWrapper>

        <Jumbotron :imageSrc="themeImage">
            <Slogan>「人生の宝物を探しにいこう」</Slogan>
        </Jumbotron>

        <Gap/>

        <LoginBar>

            <transition name="fade">
                <SwitchButton v-if="!alreadyLogin">
                    <Item :active="loginMode === 'common'" v-on:click="() => appointLoginMode('common')">账户登录</Item>
                    <Item :active="loginMode === 'dynamic'" v-on:click="() => appointLoginMode('dynamic')">短信登录</Item>
                    <Space/>
                </SwitchButton>
            </transition>

            <transition name="fade" mode="out-in">
                <component v-bind:is="currentLoginer"/>
            </transition>

        </LoginBar>

    </LoginPageWrapper>
</template>

<script>
    import {Loginer,DynamicLoginer,Logouter} from './components'
    import {LoginPageWrapper,Jumbotron,Slogan,Gap,LoginBar,SwitchButton,Item,Space} from './style'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_LOGIN_MODE} from "../../store/modules/mutation_types";
    export default {
        data() {
            return {
                themeImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/black-and-white-nature-sky-field.440ec64e.jpg',
            }
        },
        computed: {
            ...mapState({
                loginMode: state => state.login.loginMode,
                alreadyLogin: state => state.login.alreadyLogin
            }),
            currentLoginer() {
                if(this.alreadyLogin){
                    return 'Logouter'
                }

                switch (this.loginMode) {
                    case 'common':
                        return 'Loginer'
                    case 'dynamic':
                        return 'DynamicLoginer'
                }
            }
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
            Loginer,DynamicLoginer,Logouter,LoginPageWrapper,Jumbotron,Slogan,Gap,LoginBar,SwitchButton,Item,Space
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave-to
        /* .component-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
</style>