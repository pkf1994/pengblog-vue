<template>
    <SearchBarWrapper>

        <input class="input"
               :style="inputStyle"
               :value="value"
               :class="{focus:isFocus}"
               placeholder="标题、作者、标签"
               v-on:input="appointValue"
               v-on:focus="() => triggerFocus(true)"
               v-on:blur="() => triggerFocus(false)"
               v-on:keydown="checkKeyNumber"/>

        <SubmitButton :isFocus="isFocus" v-on:click="clickHandler">
            <i class='fa fa-search'/>
        </SubmitButton>

    </SearchBarWrapper>
</template>

<script>
    import {SearchBarWrapper,SubmitButton} from './style'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_SEARCHBAR} from "../../store/modules/mutation_types";
    export default {
        props: {
            searchBarId: String,
            searchBarPostHandler: Function
        },
        data() {
            return {
                isFocus: false
            }
        },
        computed: {
            ...mapState({
                metaBorderColor: state => state.meta.metaBorderColor,
                value(state){
                     return state.searchBar[this.searchBarId].value
                }
            }),
            inputStyle() {
                return {
                    borderColor: this.metaBorderColor
                }
            }
        },
        methods: {
            ...mapMutations({
               mutation_appointSearchBar: MUTATION_APPOINT_SEARCHBAR
            }),
            appointValue(event) {
                const payload = {
                    searchBarId: this.searchBarId,
                    value: event.target.value
                }
                this.mutation_appointSearchBar(payload)
            },
            triggerFocus(flag) {

                this.isFocus = flag

            },
            clickHandler(){
                this.searchBarPostHandler()
            },
            checkKeyNumber(e){
                if(e.keyCode === 108 || e.keyCode === 13 ) {
                    this.searchBarPostHandler()
                }
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
    .input::-webkit-input-placeholder{
        transition: all .4s ease;
    }
    .focus{
        transition: all .4s ease;
    }
    .focus::-webkit-input-placeholder{
        transition: all .4s ease;
        opacity:0;
    }
</style>