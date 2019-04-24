<template>
    <CheckBoxWrapper>

        <CheckBoxButton v-if="selected"
                        v-on:click="cancelHandler"
                        class="fa fa-check-square-o" />

        <CheckBoxButton v-if="!selected"
                        v-on:click="selectHandler"
                        class="fa fa-square-o"/>

    </CheckBoxWrapper>
</template>

<script>
    import {CheckBoxWrapper,CheckBoxButton} from "./style";

    export default {
        props: {
            selected: Boolean,
            selectHandler: Function,
            cancelHandler: Function
        },
        methods: {

        },
        components: {
            CheckBoxWrapper,CheckBoxButton
        },

    }
</script>

<style scoped>

</style>