<template>
    <PaginationWrapper>

        <GoToFirstPageIcon v-on:click="() => jumpToThePage(1)">
            <i class="fa fa-angle-double-left"/>
        </GoToFirstPageIcon>

        <GoToLastIcon v-on:click="() => jumpToThePage(currentPage - 1)">
            <i class="fa fa-angle-left"/>
        </GoToLastIcon>


        <ThereAreMore v-if="currentPage - 4 > 0">
            ...
        </ThereAreMore>



       <Item v-for="item in itemList"
             :key=item
             v-if="item > 0 && item <= maxPage"
             :isCurrentPage="currentPage === item"
             v-on:click="() => jumpToThePage(item)">
            {{item}}
        </Item>



        <ThereAreMore v-if="currentPage + 3 < maxPage">
            ...
        </ThereAreMore>


        <GoToNextIcon v-on:click="() => jumpToThePage(currentPage + 1)">
            <i class="fa fa-angle-right"/>
        </GoToNextIcon>

        <GoToEndPageIcon v-on:click="() => jumpToThePage(maxPage)">
            <i class="fa fa-angle-double-right"/>
        </GoToEndPageIcon>

    </PaginationWrapper>
</template>

<script>
    import {PaginationWrapper,
        GoToFirstPageIcon,
        GoToLastIcon,
        GoToEndPageIcon,
        GoToNextIcon,
        ThereAreMore,
        Item} from "./style"
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_PAGINATION} from "../../store/modules/mutation_types";

    export default {
        props: {
            paginationId: String
        },
        computed: {
            ...mapState({
                currentPage(state){
                    return state.pagination[this.paginationId].currentPage
                },
                maxPage(state){
                    return state.pagination[this.paginationId].maxPage
                },
                itemList(state){
                    let currentPage = state.pagination[this.paginationId].currentPage

                    let itemList = [currentPage - 3,
                                    currentPage - 2,
                                    currentPage - 1,
                                    currentPage,
                                    currentPage + 1,
                                    currentPage + 2,
                                    currentPage + 3]

                    return itemList
                }
            })
        },
        watch: {
           currentPage() {
               if(this.currentPage < 1){
                   this.jumpToThePage(1)
               }
           }
        },
        created() {
            if(this.currentPage < 1){
                this.jumpToThePage(1)
            }
        },
        methods: {
            ...mapMutations({
                mutation_appointPagination: MUTATION_APPOINT_PAGINATION
            }),
            jumpToThePage(currentPage) {
                const payload = {
                    paginationId: this.paginationId,
                    currentPage: currentPage
                }
                this.mutation_appointPagination(payload)
            }
        },
        components: {
            PaginationWrapper,
            GoToFirstPageIcon,
            GoToLastIcon,
            GoToEndPageIcon,
            GoToNextIcon,
            ThereAreMore,
            Item
        }
    }
</script>

<style scoped>

</style>