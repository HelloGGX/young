<!-- 顶部header -->
<template>
  <div class="header">
    <div class="header-items">
      <div class="header-item header-item_back" @click="back">
        <slot name="left">
          <i class="iconfont i-left"></i>
        </slot>
      </div>
      <div class="header-item-title">
        <slot name="middle">
          <h3>{{title}}</h3>
        </slot>
      </div>
      <div class="header-item">
        <slot name="right">
          <i class="iconfont i-share"></i>
        </slot>
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
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}

</script>
<style lang='less' scoped>
@import '~@/common/less/variable.less';

.header {
    position: relative;
    background-color:@color-background-d;
    font-size: 0.18rem;
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
        i {
          font-size: 1em;
        }
      }
      .header-item-title {
        position: relative;
        -webkit-box-flex: 4;
        -ms-flex: 4;
        flex: 4;
        text-align: left;
        h3 {
          color: #fff;
          line-height: 0.5rem;
          font-size: 0.16rem;
        }
      }
    }
}
</style>
