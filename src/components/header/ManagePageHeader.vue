<template>
    <HeaderWrapper>
        <Inner>
            <Logo v-on:click.native="() => goTo('/')"/>
            <GapLineVertical/>
            <Title>索引</Title>

        </Inner>

        <Item v-on:click="tryToCleanRecycleBin"
              v-if="!cleaningRecycleBin">
            <span class="iconfont" :style="{fontSize:'1.1rem'}">&#xef52;</span>
            &nbsp;清空回收站
        </Item>

        <Item :disabled="true" v-if="cleaningRecycleBin">
            <img :src=loadingSpin alt="Loading icon" :style="{transform:'scale(0.7)'}"/>
            Trying. . .
        </Item>

    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper,NavList,Title,Inner,GapLineVertical,Item} from "./style"
    import {Logo} from './components'
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {ACTION_CLEAN_RECYCLEBIN} from "../../store/modules/action_types";
    import {MUTATION_TRIGGER_SHOW_MODAL} from "../../store/modules/mutation_types";
    export default {
        data() {
            return {
                loadingSpin
            }
        },
        computed: {
            ...mapState({
                cleaningRecycleBin: state => state.manage.header.loading
            })
        },
        methods: {
            ...mapActions({
                action_cleanRecycleBin: ACTION_CLEAN_RECYCLEBIN
            }),
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL
            }),
            tryToCleanRecycleBin() {
                const payload = {
                    show: true,
                    context: 'cleanRecycleBin',
                    modalContent: '你正在尝试清空回收站，请确认。'
                }
                this.mutation_triggerShowModal(payload)
            },
            goTo(path) {
                this.$router.push({path:path})
            }
        },
        components:{
            HeaderWrapper,
            Logo,
            NavList,
            Title,
            Inner,
            GapLineVertical,
            Item
        }
    }
</script>

<style scoped>

</style>