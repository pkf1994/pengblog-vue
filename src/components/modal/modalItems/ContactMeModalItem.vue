<template>
    <ModalItemWrapper>
        <ModalTitle>
            与我联系（邮件、微信）
        </ModalTitle>

        <WechatQrcodeWrapper>
            <WechatQrcode :src="wechatQrcode"/>
        </WechatQrcodeWrapper>

        <Email>
            <i class="fa fa-envelope"/>&nbsp;2811825214@qq.com
        </Email>
    </ModalItemWrapper>
</template>

<script>
    import {ModalItemWrapper,ModalTitle,WechatQrcodeWrapper,WechatQrcode,Email} from "../style"
    import wechatQrcodeSrc from '@/assets/wechatQrcode.jpg'
    export default {

        data() {
            return {
                wechatQrcode: wechatQrcodeSrc
            }
        },
        components: {
            ModalItemWrapper,
            ModalTitle,
            WechatQrcodeWrapper,
            WechatQrcode,
            Email
        }
    }
</script>

<style scoped>

</style>