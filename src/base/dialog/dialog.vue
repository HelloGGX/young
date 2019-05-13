<!--dialog组件-->
<template>
  <transition name="dialog-fade">
    <modal
    class="dialog"
      type="dialog"
      :z-index="zIndex"
      :mask="true"
      :center="true"
      v-show="isVisible"
      @mask_click="maskClick"
    >
      <div class="dialog-main">
        <span class="dialog-close" v-show="showClose" @click="close">
          <i class="cubeic-close"></i>
        </span>
        <div :class="containerClass">
          <p class="dialog-icon" v-if="icon">
            <i :class="icon"></i>
          </p>
          <h2 v-if="title || $slots.title" class="dialog-title">
            <slot name="title">
              <p class="dialog-title-def">{{title}}</p>
            </slot>
          </h2>
          <div class="dialog-content">
            <slot name="content">
              <div class="dialog-content-def" v-html="content" v-if="content" @click="contentClick"></div>
            </slot>
          </div>
          <div class="dialog-btns" :class="{'border-right-1px': isConfirm}">
            <slot name="btns">
              <a
                :href="_cancelBtn.href"
                class="dialog-btn border-top-1px"
                :class="{'dialog-btn_highlight': _cancelBtn.active, 'dialog-btn_disabled': _cancelBtn.disabled}"
                v-if="isConfirm"
                @click="cancel"
              >{{_cancelBtn.text}}</a>
              <a
                :href="_confirmBtn.href"
                class="dialog-btn border-top-1px"
                :class="{'dialog-btn_highlight': _confirmBtn.active, 'dialog-btn_disabled': _confirmBtn.disabled}"
                @click="confirm"
              >{{_confirmBtn.text}}</a>
            </slot>
          </div>
        </div>
      </div>
    </modal>
  </transition>
</template>

<script type='text/ecmascript-6'>
import Modal from '../modal/modal'
import popupMixin from 'common/js/mixin/modal'
import visibilityMixin from 'common/js/mixin/visibility'

const COMPONENT_NAME = 'Dialog'
const EVENT_CONFIRM = 'confirm'
const EVENT_CANCEL = 'cancel'
const EVENT_CLOSE = 'close'
const EVENT_CLICK = 'click'

const defHref = 'javascript:;'
const defConfirmBtn = {
  textType: 'ok',
  active: true,
  disabled: false,
  href: defHref
}
const defCancelBtn = {
  textType: 'cancel',
  active: false,
  disabled: false,
  href: defHref
}
const parseBtn = function (btn, defBtn) {
  if (typeof btn === 'string') {
    btn = {
      text: btn
    }
  }
  const text = defBtn && defBtn.textType
  return Object.assign({}, defBtn, { text }, btn)
}
export default {
  name: COMPONENT_NAME,
  mixins: [visibilityMixin, popupMixin],
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    confirmBtn: {
      type: [Object, String],
      default () {
        return {
          ...defConfirmBtn
        }
      }
    },
    cancelBtn: {
      type: [Object, String],
      default () {
        return {
          ...defCancelBtn
        }
      }
    }
  },
  data () {
    return {
      defHref
    }
  },
  computed: {
    _confirmBtn () {
      return parseBtn.call(this, this.confirmBtn, defConfirmBtn)
    },
    _cancelBtn () {
      return parseBtn.call(this, this.cancelBtn, defCancelBtn)
    },
    isConfirm () {
      return this.type === 'confirm'
    },
    containerClass () {
      return `dialog-${this.type}`
    }
  },
  methods: {
    maskClick (e) {
      this.maskClosable && this.cancel(e)
    },
    confirm (e) {
      if (this._confirmBtn.disabled) {
        return
      }
      this.hide()
      this.$emit(EVENT_CONFIRM, e)
    },
    cancel (e) {
      if (this._cancelBtn.disabled) {
        return
      }
      this.hide()
      this.$emit(EVENT_CANCEL, e)
    },
    close (e) {
      this.hide()
      this.$emit(EVENT_CLOSE, e)
    },
    contentClick (e) {
      this.$emit(EVENT_CLICK, e)
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang='less'>
@import "~@/common/less/variable.less";
.dialog{
    &-main {
        width: 270px;
        padding: 0;
        text-align: center;
        overflow: hidden;
        border-radius: 2px;
        background-color:#383838;
    }
     &-confirm, &-alert{
        position: relative;
        overflow: hidden;
     }
     &-icon {
        margin-top: 20px;
        margin-bottom: 16px;
        line-height: 1;
        color: #4a4c5b;
        font-size: @font-size-large;
        i {
            display: inline-block;
            width: 30px;
            height: 30px;
            padding: 10px;
            box-sizing: content-box;
            border-radius: 50%;
            background-color: #f3f4f5;
        }
        &+.dialog-title {
            .dialog-title-def {
                margin-top: 0
            }
        }
        &+.dialog-content {
            margin-top: -4px;
        }
     }
     &-title{
        color: #333333;
        font-size: @font-size-large;
        line-height: 1;
        &+.dialog-content {
            margin-top: 12px
        }
     }
     &-title-def {
        margin: 30px 16px 0;
        overflow: hidden;
        white-space: nowrap;
     }
     &-content {
         margin: 16px 0;
        text-align: left;
        color: #666666;
        font-size: @font-size-medium;
        line-height: 22px;
     }
     &-content-def {
        padding: 0 16px;
        >p {
           display: table;
           margin: auto ;
        }
     }
     &-confirm, &-prompt {
        .dialog-btns {
            .dialog-btn {
                width: 50%;
                float: left;
                &.border-right-1px{
                    &::after{
                        right: 50%;
                        border-color: #ebebeb;
                    }
                }
            }
        }
     }
     &-close{
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
        color: #999999;
        font-size: @font-size-large;
     }
     &-btns {
        overflow: hidden;
        width: 100%;
        font-size: 0;
     }
     &-btn {
        display: inline-block;
        width: 100%;
        padding: 17px 10px;
        margin: 0;
        font-size: @font-size-large;
        line-height: 1;
        text-align: center;
        text-decoration: none;
        color: #999999;
        background-color: #383838;
        background-clip: padding-box;
        box-sizing: border-box;
        &:active {
            background-color: rgba(0, 0, 0, .04);
        }
     }
     &-btn_highlight {
          color: #ffffff;
          &:active {
             background-color: #333333
          }
     }
     &-btn_disabled {
         color: @color-text-d;
         &:active {
             background-color: #333333
         }

     }
}

.dialog-fade-enter-active {
  animation: dialog-fadein 0.4s;
  .dialog-main {
    animation: dialog-zoom 0.4s;
  }
}

@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

</style>
