<template>
    <ShareWrapper>

        <ShareItem color="#00bb29" v-on:click="showShareToWechatModal">
            <i class="fa fa-wechat"/>
        </ShareItem>

        <ShareItem color="#e05244" v-on:click="shareToWeibo">
            <i class="fa fa-weibo"/>
        </ShareItem>

        <ShareItem color="grey" id="copyLinkBtn" :data-clipboard-text="link">
            <i class="fa fa-link"/>
        </ShareItem>

    </ShareWrapper>
</template>

<script>
    import Clipboard from 'clipboard'

    import {ShareWrapper,ShareItem} from './style'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_TRIGGER_SHOW_MODAL} from "../../../../store/modules/modal/constant";

    export default {

        data(){
            return {
                link: window.location.href
            }
        },

        mounted(){
            this.initClipboard()
        },

        methods:{
            showShareToWechatModal() {
                const payload = {
                    context: 'shareToWechat',
                    show: true
                }
                this.mutation_triggerShowModal(payload)
            },
            initClipboard(){

                const _this = this

                var clipboard = new Clipboard('#copyLinkBtn')

                clipboard.on('success', function(e) {
                    const payload = {
                        noticeContent: '链接已拷贝到剪贴板',
                        show: true
                    }
                    _this.notify(payload)
                });

                clipboard.on('error', function(e) {
                    const payload = {
                        noticeContent: '链接拷贝失败',
                        show: true
                    }
                    _this.notify(payload)
                });
            },
            shareToWeibo(){
                let shareToXinLangWeiboUrl = 'http://v.t.sina.com.cn/share/share.php?'
                let title = this.article.article_title
                let picUrl = this.article.article_previewImageUrl
                shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + 'title=我正在阅读文章:' + title + '，出自远方有鱼。  -- '
                shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&url=' + window.location.href
                shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&content=utf-8&sourceUrl=' + window.location.href
                if( picUrl !== undefined)
                    shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&pic=' + picUrl

                window.open(shareToXinLangWeiboUrl,'newwindow','height=400,width=400,top=100,left=100');
            },
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL
            })
        },

        computed: {
            ...mapState({
                article: state => state.article.article
            })
        },

        components: {
            ShareWrapper,ShareItem
        }
    }
</script>

<style scoped>

</style>