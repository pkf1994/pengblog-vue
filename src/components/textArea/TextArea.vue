<template>
    <TextareaWrapper>

        <textarea class="textarea"
                  v-model="_value"
                  :rows="rows"
                  :placeholder="placeholder"
                  v-on="inputListeners"
                  :style="{borderColor: showWarn ? 'red' : metaBorderColor}">
        </textarea>

        <transition name="zoom">
            <WarnPopover v-if="showWarn">
                {{warnMsg ? warnMsg : '格式有误'}}
                <PopoverArrow/>
            </WarnPopover>
        </transition>

    </TextareaWrapper>
</template>

<script>
    import {TextareaWrapper,
            WarnPopover,
            PopoverArrow} from "./style";

    export default {

        data(){
            return {
                _value: '',
                metaBorderColor: window.metaBorderColor
            }
        },

        props: {
            placeholder: String,
            value: String,
            onChange: Function,
            showWarn: Boolean,
            warnMsg: String,
            rows: Number,
            onBlur: Function,
            onFocus: Function,
            maxLength: Number
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
                            vm.$emit('input', event.target.value)
                        },
                        focus: function () {
                            vm.$emit('focus')
                        }
                    }
                )
            }
        },
        created() {
            this._value = this.value
        },
        watch: {
            value() {
                this._value = this.value
            }
        },
        components: {
            TextareaWrapper,
            WarnPopover,
            PopoverArrow
        }
    }
</script>

<style scoped>

.textarea{
    flex-grow: 1;
    position: relative;
    font-family: Microsoft YaHei;
    font-size: 16px;
    line-height: 1.4;
    outline: none;
    padding: 0.5em;
    border: solid 1px #f7f7f7;
    background: #f7f7f7;
    border-radius: 3px;
    transition: all 0.2s ease;
}

.textarea:focus{
    box-shadow: 1px 1px 3px #999999 inset;
    border: solid 1px #E6E6E6;
}

.zoom-enter-active,.zoom-leave-active{
    transition: all .4s ease;
}

.zoom-enter,.zoom-leave-to{
    transform: translateY(10px) scale(0.5);
    opacity: 0;
}
</style>