<template>
    <TextareaWrapper>

        <Textarear  :placeholder="placeholder"
                    :value="value"
                    :onChange="onChange"
                    :showWarn="showWarn"
                    :rows="rows"
                    :maxLength="maxLength"
                    :onBlur="onBlur"
                    :onFocus="onFocus"/>

        <WarnPopover>
            {{warnMsg ? warnMsg : '格式有误'}}
            <PopoverArrow/>
        </WarnPopover>

    </TextareaWrapper>
</template>

<script>
    import {TextareaWrapper,
            Textarear,
            WarnPopover,
            PopoverArrow} from "./style";

    export default {

        props: {
            placeholder: String,
            value: String,
            onChange: Function,
            showWarn: Boolean,
            warnMsg: Boolean,
            rows: Number,
            onBlur: Function,
            onFocus: Function,
            maxLength: Number
        },

        components: {
            TextareaWrapper,
            Textarear,
            WarnPopover,
            PopoverArrow
        }
    }
</script>

<style scoped>

</style>