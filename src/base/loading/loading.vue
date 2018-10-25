<template>

    <transition :name="transition">
      <div class="y-loading loading_toast" v-show="show">
        <div class="mask_transparent"></div>
        <div class="toast"
        :style="{
          position: position
        }">
          <i class="loading icon_toast"></i>
          <p class="toast__content">{{title}}</p>
        </div>
      </div>
    </transition>

</template>
<script type="text/ecmascript-6">
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '正在载入'
    },
    transition: {
      type: String,
      default: 'mask'
    },
    position: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="less">
  @import '../../common/less/transition.less';
  @import '../../common/less/variable.less';
.toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: hsla(0,0%,7%,.7);
    text-align: center;
    border-radius: 5px;
    color: #fff;
}
.toast {
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin-left: 0!important;
}
.loading {
   width: 3em;
    height: 3em;
    margin: 1em;
    display: inline-block;
    vertical-align: middle;
    background: transparent url('./loading.gif') no-repeat;
    background-size: 100%;
  .toast {
    z-index: 5001;
  }
}
.icon_toast.weui-loading {
  margin: 30px 0 0;
  width: 38px;
  height: 38px;
  vertical-align: baseline;
  display: inline-block;
}
.loading_toast .toast__content {
    margin-top: 0;
    margin: 0 0 15px;
    font-size: @font-size-medium;
}
.loading-no-text .toast {
  min-height: 98px;
}
</style>
