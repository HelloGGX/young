<template>
<div class="modal" :style="{'z-index': zIndex}" :class="rootClass" v-show="isVisible">
    <div class="modal-mask" @touchmove.prevent @click="maskClick">
      <slot name="mask"></slot>
    </div>
    <div class="modal-container" @touchmove.prevent :class="containerClass">
      <div class="modal-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="modal-content" v-else v-html="content">
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import visibilityMixin from 'common/js/mixin/visibility'
import popupMixin from 'common/js/mixin/modal'

const COMPONENT_NAME = 'modal'
const EVENT_MASK_CLICK = 'mask_click'


export default {
  name: COMPONENT_NAME,
  mixins: [visibilityMixin, popupMixin],
  props: {
      type: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
      center: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: ''
      }
    },
computed: {
      rootClass() {
        const cls = {
          'modal_mask': this.mask
        }
        if (this.type) {
          cls[`modal_${this.type}`] = true
        }
        return cls
      },
      containerClass() {
        const center = this.center
        const position = this.position
        if (position) {
          return {
            [`modal-${position}`]: true
          }
        }
        if (center) {
          return {
            'modal-center': true
          }
        }
      }
    },
  methods: {
      maskClick(e) {
        this.$emit(EVENT_MASK_CLICK, e)
        if (this.maskClosable) {
          this.hide()
        }
      }
    }
}
</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";
.modal {
  position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: none;
    &_mask {
      pointer-events: auto;
      .modal-mask {
        display: block;
      }
    }
    &-mask, &-container{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    &-mask {
      display: none;
      overflow: hidden;
      background-color: @color-dialog-background;
      opacity: @modal-mask-opacity;
      pointer-events: auto;
    // fix some android webview opacity render bug
      &::before{
        content: ".";
        display: block;
        width: 1px;
        height: 1px;
        background-color: rgba(0, 0, 0, .1);
        margin-left: -10px;
      } 
    }
    &-container{
       transform: translate(100%, 100%)
    }
    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      transform: translate(-100%, -100%);
      pointer-events: auto;
    }
    &-center,&-right,&-left{
      .modal-content {
        top: -50%;
        left: -50%;
        width: auto;
        max-width: 100%;
        transform: translate(0, 0);
      }
    }
    &-right,&-left{
       .modal-content{
        height: 100%;
        top: -100%;
       }
    }
    &-center{
      .modal-content{
        transform: translate(-50%, -50%)
      }
    }
    &-top{
      .modal-content{
        top: -100%;
        left: -100%;
        transform: translate(0, 0);
      }
    }
    &-right{
      .modal-content{
        top: -100%;
        ight: 100%;
      }
    }
    &-left{
      .modal-content{
        left: -100%
      }
    }
}
</style>
