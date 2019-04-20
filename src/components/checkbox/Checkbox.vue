<template>
    <CheckBoxWrapper>

        <CheckBoxButton v-if="selected"
                        v-on:click="() => selecter(false)"
                        class="fa fa-check-square-o" />

        <CheckBoxButton v-if="!selected"
                        v-on:click="() => selecter(true)"
                        class="fa fa-square-o"/>

    </CheckBoxWrapper>
</template>

<script>
    import {CheckBoxWrapper,CheckBoxButton} from "./style";

    export default {
        props: {
            selected: Boolean,
            selecter: Function
        },
        components: {
            CheckBoxWrapper,CheckBoxButton
        }
    }
</script>

<style scoped>

</style>