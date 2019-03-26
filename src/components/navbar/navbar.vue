<!-- 顶部header -->
<template>
  <div class="header">
    <div class="header-items">
      <div class="header-item">
        <img src="../../common/images/align-left.png" alt="">
      </div>
      <div class="header-item-title">
        <search-box></search-box>
      </div>
      <div class="header-item">
        <img src="../../common/images/user.png" alt="">
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import SearchBox from 'base/search-box/search-box'

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
  },
  components: {
    SearchBox
  }
}

</script>
<style lang='less' scoped>
@import '~@/common/less/variable.less';

.header {
    position: relative;
    background-color:@color-background-d;
    .header-items {
      height: .7rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding-top: 0.2rem;
      flex-direction: row;
      justify-content: space-between;
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
          width: 0.24rem;
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
