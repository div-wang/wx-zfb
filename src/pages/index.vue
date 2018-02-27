<template>
  <div id="content">
    <h2>请上传您的支付宝红包二维码</h2>
    <h5 ref="h5">这里显示您的短链接</h5>
    <div id="button" ref="button">
      <span class="primary" @click="copy(uri)">复制链接</span>
      <span class="primary" @click="weibo(uri)" v-if="false">生成微博短链</span>
    </div>
    <input id="upload" type="file" style="display: none" ref="upload">
    <div id="preview" @click="upload" ref="preview">
      <img src="https://zos.alipayobjects.com/cmsmng/cms/images/ixszvlta/df0ea6a6-170a-4b76-ba00-8c9b860d32a3.png" alt="" ref="image">
    </div>
  </div>
</template>

<script>
  import copyUrl from 'utils/copyUrl'

  export default {
    data () {
      return {
        copy: copyUrl,
        uri: 'https://ie34.com/short-link'
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      logError (str) {
        let h5 = this.$refs.h5
        let button = this.$refs.button
        h5.style.color = 'red'
        h5.textContent = str
        button.style.display = 'none'
      },
      logSuccess (str) {
        let h5 = this.$refs.h5
        let button = this.$refs.button
        h5.style.color = '#fff'
        h5.textContent = str
        button.style.display = 'block'
      },
      upload () {
        this.$refs.upload.click()
      },
      weibo () {

      },
      onReady () {
        let _this = this
        let qr = new QrCode()
        let upload = this.$refs.upload

        qr.callback = (err, res) => {
          if(res){
            let url = res.result
            let uriArr = url.split('qr.alipay.com')

            if (uriArr[1]) {
              _this.uri = 'https://ie34.com/short-link' + uriArr[1]
              _this.logSuccess(_this.uri)
            } else {
              _this.logError('无效二维码')
            }
          }
          else{
            _this.logError('二维码无法识别，请换一个二维码')
            console.error(err)
          }
        }

        upload.addEventListener('change', function() {
          for (var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            if (!/^image\//.test(file.type)) {
              _this.logError('请上传图片')
              return false
            }
            // Read file
            var reader = new FileReader();
            reader.addEventListener('load', function() {
              let img = _this.$refs.image
              img.style.margin = '20px'
              img.style.width = '240px'
              img.src = this.result
              // Analyse code
              qr.decode(this.result);
            }.bind(reader), false);
            reader.readAsDataURL(file);
          }
        }, false);
      }
    }
  }
</script>
