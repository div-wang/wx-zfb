<template>
  <div id="jump">
    {{loadingTxt}}
    <div class="layer" v-show="is_wechat_qq">
        <img src="//div-1255800596.cos.ap-beijing.myqcloud.com/share/live_weixin.png" alt="">
    </div>
  </div>
</template>

<script>

  import urlQuery from 'utils/urlQuery'
  import UA from 'utils/userAgent'

  export default {
    data () {
      return {
        ua: UA,
        is_wechat_qq: false,
        loadingTxt: '正在打开支付宝...'
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        const id = urlQuery()
        const url = `https://qr.alipay.com/${id}`

        // function android_auto_jump() {
        //     WeixinJSBridge.invoke("jumpToInstallUrl", {}, function (e) {});
        //     window.close();
        //     WeixinJSBridge.call("closeWindow")
        // }

        // function ios_auto_jump() {
        //     if (url != "") {
        //         location.href = url
        //     } else {
        //         window.close();
        //         WeixinJSBridge.call("closeWindow")
        //     }
        // }

        // function onAutoinit() {
        //     if (UA.android()) {
        //         android_auto_jump();
        //         return false
        //     }
        //     if (UA.ios()) {
        //         ios_auto_jump();
        //         return false
        //     }
        // }
        if (UA.wechat() || UA.qq()) {
          this.is_wechat_qq = true
          // if (typeof WeixinJSBridge == "undefined") {
          //   if (document.addEventListener) {
          //     document.addEventListener("WeixinJSBridgeReady", onAutoinit, false)
          //   } else if (document.attachEvent) {
          //     document.attachEvent("WeixinJSBridgeReady", onAutoinit);
          //     document.attachEvent("onWeixinJSBridgeReady", onAutoinit)
          //   }
          // } else {
          //   onAutoinit()
          // }
        } else {
          if (url != "") {
              location.href = url
          } else {
              window.close()
          }
        }
      }
    }
  }
</script>
