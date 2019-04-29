<template>
    <MobileHeaderWrapper>

        <transition name="fade">
            <Cover v-if="showMenuList"
                   v-on:click="triggerShowMenuList"/>
        </transition>


        <MenuListWrapper :showMenuList="showMenuList" :heightOfMenuList="heightOfMenuList">
            <MenuList ref="menuList">

                <MenuItem v-on:click="() => redirect('/')">
                    <span class="iconfont"
                          :style="{fontSize: '1.6rem'}">&#xe626;</span>
                    &nbsp;主页
                </MenuItem>

                <MenuItem v-on:click="() => redirect('/login')">
                    <span class="iconfont"
                          :style="{fontSize: '1.6rem'}">&#xe624;</span>
                    &nbsp;登录
                </MenuItem>


                <MenuItem v-on:click="() => redirect('/edit')" v-if="alreadyLogin">
                    <span class="iconfont"
                          :style="{fontSize: '1.6rem'}">&#xe67f;</span>
                    &nbsp;写作
                </MenuItem>

                <MenuItem v-on:click="() => redirect('/login')" v-if="alreadyLogin">
                    <span class="iconfont"
                          :style="{fontSize: '1.6rem'}">&#xe7cd;</span>
                    &nbsp;登出
                </MenuItem>

                <MenuItem :style="{borderBottom:'none'}"
                          v-on:click="() => redirect('/ip')"
                          v-if="alreadyLogin">
                    <span class="iconfont"
                          :style="{fontSize: '1.6rem'}">&#xe64f;</span>
                    &nbsp;管理IP
                </MenuItem>

            </MenuList>
        </MenuListWrapper>

        <MainArea>

            <Logo v-on:click="() => redirect('/')">遠</Logo>

            <MenuButtonWrapper :showMenuList="showMenuList">
                <Button class="iconfont"
                        v-on:click="triggerShowMenuList"
                        :style="{fontSize: '1.6rem'}">&#xe60b;</Button>
            </MenuButtonWrapper>

        </MainArea>

    </MobileHeaderWrapper>
</template>

<script>
    import {
        MobileHeaderWrapper,
        MainArea,
        Logo,
        MenuButtonWrapper,
        Button,
        MenuListWrapper,
        MenuList,
        MenuItem,
        Cover} from './style'
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                heightOfMenuList: '0px',
                showMenuList: false
            }
        },
        computed: {
            ...mapState({
                alreadyLogin: state => state.login.alreadyLogin
            })
        },
        mounted() {
            this.recordHeightOfMenuList()
        },
        methods: {
            triggerShowMenuList() {
                this.showMenuList = !this.showMenuList
            },
            recordHeightOfMenuList() {
                this.heightOfMenuList = window.getComputedStyle(this.$refs.menuList.$el).height
            },
            redirect(path) {
                this.$router.push({path:path})
                this.showMenuList = false
            }
        },

        components: {
            MobileHeaderWrapper,
            MainArea,
            Logo,
            MenuButtonWrapper,
            Button,
            MenuListWrapper,
            MenuList,
            MenuItem,
            Cover
        }
    }
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{
    transition: all .4s ease;
}

.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>