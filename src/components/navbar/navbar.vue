<!-- 顶部header -->
<template>
  <div class="header">
    <div class="header-items">
      <div class="header-item">
        <img src="../../common/images/ios/icon@2x.png" alt="">
      </div>
      <div class="header-item-title">
        <h3>{{title}}</h3>
      </div>
      <div class="header-item">
        <img src="../../common/images/ios/icon-search@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: 'HOME'
    }
  }
}

</script>
<style lang='less' scoped>
.header {
   z-index: 10000!important;
    position: fixed;
    top: 0;
    width: 3.75rem;
    background-color:#fff;
    .header-items {
      height: .7rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding-top: 0.2rem;
      .header-item {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin: 0 auto;
        }
      }
      .header-item-title {
        position: relative;
        -webkit-box-flex: 4;
        -ms-flex: 4;
        flex: 4;
        text-align: center;
        h3 {
          color: #000;
          line-height: 0.5rem;
          font-size: 0.16rem;
        }
      }
    }
}
</style>
