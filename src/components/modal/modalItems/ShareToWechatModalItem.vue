<template>
    <ModalItemWrapper>
        <ModalTitle>
            分享到微信
        </ModalTitle>

        <QrcodeContainer id="qrcode"/>
    </ModalItemWrapper>
</template>

<script>
    import {ModalItemWrapper,ModalTitle,ModalContent} from "../style"
    import {QrcodeContainer} from "./style"
    import QRCode from 'qrcodejs2'
    export default {

        mounted() {
            this.initQrcode()
        },

        methods: {
            initQrcode(){

                let qrcode = new QRCode(document.getElementById('qrcode'), {
                    width: 180, //图像宽度
                    height: 180, //图像高度
                    colorDark : "#000000", //前景色
                    colorLight : "#ffffff", //背景色
                    typeNumber:4,
                    correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
                })

                qrcode.clear() //清除二维码
                qrcode.makeCode(window.location.href) //生成另一个新的二维码
            }
        },

        components: {
            ModalItemWrapper,
            ModalTitle,
            ModalContent,
            QrcodeContainer
        }
    }
</script>

<style scoped>

</style>