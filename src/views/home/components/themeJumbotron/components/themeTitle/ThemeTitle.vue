<template>
    <ThemeTitleWrapper>

        <Elem1>
        It's a Wonderful Life
        </Elem1>

        <transition name="stretch" appear>
            <ColorLine/>
        </transition>

        <Elem2>
            「人生の宝物を探しにいこう」
        </Elem2>

    </ThemeTitleWrapper>
</template>

<script>
    import {ThemeTitleWrapper,Elem1,Elem2,ColorLine} from './style'
    export default {
        components: {
            ThemeTitleWrapper,Elem1,Elem2,ColorLine
        }
    }
</script>

<style scoped>
.stretch-enter-active,.stretch-leave-active{
    transition: all 1s ease;
    transition-delay: 1s;
}

.stretch-enter,.stretch-leave-to{
    opacity: 0;
    transform: scaleX(0);
}
</style>