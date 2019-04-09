<!-- 从底部弹层 -->
<template>
<div class="popup">
  <transition name="popup">
    <div v-if="popShow">
      <div class="popup-mask" @click="hide"></div>
      <div  class="popup-panel">
        <div class="popup-header">
          <slot name="header"></slot>
        </div>
        <div ref="poplist" class="popup-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script  type='text/ecmascript-6'>
export default {
  data () {
    return {
      popShow: false
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
      this.popShow = false
      this.$emit('show', false)
    }
  },
  watch: {
    show (newVal) {
      this.popShow = newVal
    }
  }
}
</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";

.popup {
  max-width: 640px;
  &-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &-panel {
    position: absolute;
    bottom: 0;
    transform-origin: bottom;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    border-radius: 0.2rem 0.2rem 0 0;
  }
  &-header {
  }
  &-content {
  }
}
</style>
