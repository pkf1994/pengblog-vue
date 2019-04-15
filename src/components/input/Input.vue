<template>
    <InputWrapper>

        <input  :class="[ex ? 'input-ex' : 'input', {isFocus: isFocus}]"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :showWarn="showWarn"
                :maxlenght="maxLength"
                :style="inputStyle"
                v-on="inputListeners"/>

        <IconFixer>
            <Icon :iconColor="iconColor">
                <i :class="iconClassName"/>
            </Icon>
        </IconFixer>

        <TheLine v-if="ex">
            <Color :isFocus="isFocus"
                   :lineColor="lineColor" />
        </TheLine>

        <transition name="zoom">
            <WarnPopover  v-if="showWarn">
                {{warnMsg ? warnMsg : '格式有误'}}
                <PopoverArrow/>
            </WarnPopover>
        </transition>

    </InputWrapper>
</template>

<script>
    import {InputWrapper,Inputer,Icon,WarnPopover,PopoverArrow,IconFixer,TheLine,Color} from "./style";
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                isFocus: false,
                inputStyle: {
                    borderColor: this.showWarn ? 'red' : this.metaBorderColor,
                    padding: window.innerWidth > this.maxMobileWidth ? '0.5rem' : '0.8rem'
                }
            }
        },

        props: {
            maxLength: Number,
            type: String,
            placeholder: String,
            value: String,
            iconColor: String,
            iconClassName: String,
            showWarn: Boolean,
            warnMsg: String,
            ex: false,
        },

        computed: {
            inputListeners: function () {
                let vm = this
                // `Object.assign` 将所有的对象合并为一个新对象
                return Object.assign({},
                    // 我们从父级添加所有的监听器
                    this.$listeners,
                    // 然后我们添加自定义监听器，
                    // 或覆写一些监听器的行为
                    {
                        // 这里确保组件配合 `v-model` 的工作
                        input: function (event) {
                            vm.$emit('input', event)
                        },
                        focus: function () {
                            vm.$emit('focus')
                            vm.isFocus = true
                        },
                        blur: function () {
                            vm.$emit('blur')
                            vm.isFocus = false
                        }
                    }
                )
            },
            ...mapState({
                metaBorderColor: state => state.meta.metaBorderColor,
                lineColor: state => state.meta.lineColor,
                maxMobileWidth: state => state.meta.maxMobileWidth
            })
        },

        methods: {
            focusHandler() {
                console.log('f')

            }
        },

        components: {
            InputWrapper,
            Inputer,
            Icon,
            WarnPopover,
            PopoverArrow,
            IconFixer,
            TheLine,
            Color
        }
    }
</script>

<style scoped>

    .zoom-enter-active,.zoom-leave-active{
        transition: all .4s ease;
    }

    .zoom-enter,.zoom-leave-to{
        transform: translateY(10px) scale(0.5);
        opacity: 0;
    }

    .input{
        flex-grow: 1;
        color: black;
        position: relative;
        background: #F7F7F7;
        font-size: 1rem;
        outline: none;
        padding: 0.8rem;
        padding-left: 2rem !important;
        border: solid 1px #F7F7F7;
        border-radius: 0.4rem;
    }
    .input:focus{
         box-shadow: 1px 1px 2px #999999 inset;
         border: solid 1px #E6E6E6;
     }

    .input-ex{
        width: 100%;
        position: relative;
        background: none;
        outline: none;
        border: none;
        padding: 0.5rem;
        padding-left: 1rem !important;
        transition: all 0.2s ease;}
    .input-ex::placeholder{
     }
    .input-ex:disabled{
         color: #CCCCCC;
     }
    .input-ex:-webkit-autofill,
    .input-ex:-webkit-autofill:hover,
    .input-ex:-webkit-autofill:focus,
    .input-ex:-webkit-autofill:active {
         -webkit-transition-delay: 99999s;
         -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }

    .isFocus::placeholder{
        opacity: 0;
    }
</style>