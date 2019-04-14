<template>
    <InputWrapper>

        <input  class="input"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                :showWarn="showWarn"
                :maxlenght="maxLenght"
                :style="inputStyle"
                v-on="inputListeners"/>

        <IconFixer>
            <Icon :iconColor="iconColor">
                <i :class="iconClassName"/>
            </Icon>
        </IconFixer>

        <transition name="zoom">
            <WarnPopover  v-if="showWarn">
                {{warnMsg ? warnMsg : '格式有误'}}
                <PopoverArrow/>
            </WarnPopover>
        </transition>

    </InputWrapper>
</template>

<script>
    import {InputWrapper,Inputer,Icon,WarnPopover,PopoverArrow,IconFixer} from "./style";

    export default {
        data() {
            return {
                metaBorderColor: window.metaBorderColor,
                inputStyle: {
                    borderColor: this.showWarn ? 'red' : this.metaBorderColor,
                    padding: window.innerWidth > window.maxMobileWidth ? '0.5rem' : '0.8rem'
                }
            }
        },

        props: {
            id: String,
            maxLength: Number,
            type: String,
            placeholder: String,
            value: String,
            iconColor: String,
            iconClassName: String,
            showWarn: Boolean,
            warnMsg: String,
            maxLenght: Number
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
                        }
                    }
                )
            }
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
            IconFixer
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
</style>