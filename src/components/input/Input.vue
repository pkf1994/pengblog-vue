<template>
    <InputWrapper :width="width">

        <Inputer id="id"
                 type="type"
                 placeholder="placeholder"
                 value="value"
                 onChange="onChange"
                 onFocus="onFocus"
                 onBlur="onBlur"
                 showWarn="showWarn"
                 fontSize="fontSize"
                 padding="padding"
                 maxLenght="maxLenght"
                 backgroundColor="backgroundColor"
                 disableFocusStyle="disableFocusStyle"
                 fontColor="fontColor"/>

        <IconFixer>
            <Icon :iconColor="iconColor">
                <i :class="iconClassName"/>
            </Icon>
        </IconFixer>

        <transition name="zoom">
            <WarnPopover>
                {{warnMsg ? warnMsg : '格式有误'}}
                <PopoverArrow/>
            </WarnPopover>
        </transition>

    </InputWrapper>
</template>

<script>
    import {InputWrapper,Inputer,Icon,WarnPopover,PopoverArrow,IconFixer} from "./style";

    export default {

        props: {
            id: String,
            width: String,
            maxLength: Number,
            type: String,
            placeholder: String,
            fontSize: String,
            padding: String,
            value: String,
            onChange: Function,
            iconClassName: String,
            iconColor: String,
            showWarn: Boolean,
            warnMsg: String,
            onBlur: Function,
            onFocus: Function,
            backgroundColor: String,
            disableFocusStyle: Boolean,
            fontColor: String
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
    }

</style>