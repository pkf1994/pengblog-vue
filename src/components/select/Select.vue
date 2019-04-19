<template>
    <SelectWrapper>
        <SelectHead>

            <SelectContent :width="width">{{value}}</SelectContent>

            <SelectButton>
                <SelectButtonFixer>
                    <i class='fa fa-angle-down' v-on:click="() => triggerShow(true)"/>
                </SelectButtonFixer>
            </SelectButton>
        </SelectHead>

        <Options :showOptions="show" :height="heightOfOptions">
            <Inner ref="options">
                <OptionItem v-for="item in optionList"
                            :key="item"
                            v-on:click="() => clickHandler(item)">
                    {{item}}
                </OptionItem>
            </Inner>
        </Options>

        <Cover v-if="show" v-on:click="() => triggerShow(false)"/>

    </SelectWrapper>
</template>

<script>
    import {
        SelectWrapper,
        SelectHead,
        SelectContent,
        SelectButton,
        SelectButtonFixer,
        Options,
        OptionItem,
        Cover,
        Inner} from './style'
    export default {
        props: {
            optionList: Array,
            valueAppointer: Function,
            value: {},
            width: String
        },
        data() {
            return {
                show: false,
                heightOfOptions: '0px'
            }
        },
        mounted() {
            this.recordHeightOfOptions()
        },
        watch: {
            optionList() {
                this.$nextTick(() => {
                    this.recordHeightOfOptions()
                })
            }
        },
        methods: {
            clickHandler(item) {
                this.show = false
                this.valueAppointer(item)
            },
            triggerShow(flag) {
                this.show = flag
            },
            recordHeightOfOptions() {
                this.heightOfOptions = window.getComputedStyle(this.$refs.options.$el).height
            }
        },
        components: {
            SelectWrapper,
            SelectHead,
            SelectContent,
            SelectButton,
            SelectButtonFixer,
            Options,
            OptionItem,
            Cover,
            Inner
        }
    }
</script>

<style scoped>

</style>