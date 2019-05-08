<template>
<transition name="dialog">
  <div class="modal" v-show="show"  @click.stop="handleClose">
    <div class="modal_main">
      <div class="modal_content">
        <div class="modal_header">
          <button type="button" @click.stop="remove" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal_title">{{title}}</h4>
        </div>
        <div class="modal_body" v-html="content">
            {{content}}
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      content: '',
      title: '',
      show: false
    }
  },

  methods: {
    add (notice) {
      this.content = notice.content
      this.title = notice.title
      this.show = true
    },
    remove () {
      this.show = false
    },
    handleClose (e) {
      if (e.target.className !== 'modal') {
        return
      }
      this.remove()
    }
  }
}
</script>
<style lang='less' scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
  z-index: 3;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  &_main {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: 14px;
    white-space: normal;
  }
  &_content {
    position: relative;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    outline: 0;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  }
  &_header {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    .close {
      margin-top: -2px;
      -webkit-appearance: none;
      padding: 0;
      cursor: pointer;
      background: 0 0;
      border: 0;
      float: right;
      font-size: 21px;
      font-weight: 700;
      line-height: 1;
      color: #000;
      text-shadow: 0 1px 0 #fff;
      filter: alpha(opacity=20);
      opacity: 0.2;
    }
  }
  &_title {
    margin: 0;
    font-size: 0.14rem;
    color: #666;
  }
  &_body {
    position: relative;
    padding: 15px;
  }
}
</style>
