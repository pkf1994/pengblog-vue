<template>
    <SearchBarWrapper>

        <input class="input"
               :style="inputStyle"
               v-on:focus="() => triggerFocus(true)"
               v-on:blur="() => triggerFocus(false)"/>

        <SubmitButton :isFocus="isFocus">
            <i class='fa fa-search'/>
        </SubmitButton>

    </SearchBarWrapper>
</template>

<script>
    import {SearchBarWrapper,SubmitButton} from './style'
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                isFocus: false
            }
        },
        computed: {
            ...mapState({
                 metaBorderColor: state => state.meta.metaBorderColor
            }),
            inputStyle() {
                return {
                    borderColor: this.metaBorderColor
                }
            }
        },
        methods: {
            triggerFocus(flag) {

                this.isFocus = flag

            }
        },
        components: {
            SearchBarWrapper,SubmitButton
        }
    }
</script>

<style scoped>
    .input{
        box-sizing: border-box;
        width: 100%;
        color: black;
        position: relative;
        background: #F7F7F7;
        font-size: 1rem;
        outline: none;
        padding: 0.5rem;
        border: solid 1px #F7F7F7;
        border-radius: 0.4rem;
        transition: all .4s ease;
    }
    .input:focus{
        background: white;
    }
</style>