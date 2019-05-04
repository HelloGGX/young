<!--左侧侧边栏组件-->
<template>
  <div class="slidebar">
    <div ref="mask" v-show="show" class="slidebar_mask" @click="_close"></div>
    <div
      ref="panel"
      class="slidebar_panel"
      @touchstart.prevent="slideTouchStart"
      @touchmove.prevent="slideTouchMove"
      @touchend="slideTouchEnd"
    >
      <div ref="slideCon" class="slidebar_content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { constants } from "crypto";
import { setTimeout } from 'timers';

const OPACITY = 0.6 //蒙版的透明度
const BORDER = 20
export default {
  props: {
    slideshow: {
      type: Boolean,
      default: false
    },
    direction:{
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      offsetWidth: 0,
      show: this.slideshow
    };
  },
  created() {
    this.touch = {
      show: this.slideshow
    };
  },
  mounted(){
    setTimeout(()=>{
      if(this.direction==='left'){
        this.$refs.panel.style['left']= 0
        this.$refs.panel.style['borderRight']=`${BORDER}px solid transparent`
        this.$refs.panel.style["transform"] = `translate3d(${-this.$refs.panel.clientWidth+BORDER}px,0,0)`;
      }else if(this.direction==='right'){
        this.$refs.panel.style['right']= 0
        this.$refs.panel.style['borderLeft']=`${BORDER}px solid transparent`
        this.$refs.panel.style["transform"] = `translate3d(${this.$refs.panel.clientWidth-BORDER}px,0,0)`;
      }
      this.$refs.mask.style["background"] = `rgba(0, 0, 0, 0)`;
    },20)
  },
  methods: {
    slideTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.panel.clientWidth;
      this.show = true;
    },
    slideTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }

      const deltaX = e.touches[0].pageX - this.touch.startX;
    
      if (this.touch.show) {
        if(this.direction === 'left'){
          this.offsetWidth = Math.min(0, deltaX);
        }else if(this.direction === 'right') {
          this.offsetWidth = Math.max(0, deltaX);
        }
      } else {
        if(this.direction === 'left'){
          this.offsetWidth = Math.min(0, -this.touch.left + deltaX);
        }else if(this.direction === 'right'){
          this.offsetWidth = Math.max(0, this.touch.left + deltaX);
        }
      }

      this._offset(this.offsetWidth);
    },
    slideTouchEnd(e) {
      this.touch.initiated = false;

      if (Math.abs(this.offsetWidth) > this.touch.left / 2) {
        this._close()
      } else {
        this._show()
      }
    },
    _offset(offsetWidth) {
      this.$refs.panel.style["transform"] = `translate3d(${offsetWidth}px,0,0)`;
      this.$emit("trigger", this.show);
    },
    _close() {
      if(this.direction === 'left'){
        this.offsetWidth = -this.$refs.panel.clientWidth;
      }else {
        this.offsetWidth = this.$refs.panel.clientWidth;
      }
      
      this.show = false;
      this.touch.show = false;
      this._offset(this.offsetWidth);
    },
    _show() {
      this.offsetWidth = 0;
      this.show = true;
      this.touch.show = true;
      this._offset(this.offsetWidth);
    }
  },
  watch: {
    offsetWidth(newVal) {
      let blur = 1;
      const screenWidth = window.screen.width;
      const percent = Math.min(
        OPACITY,
        OPACITY - Math.abs(Math.abs(newVal) / screenWidth)
      );
      blur = Math.max(0, percent);
      this.$refs.mask.style["background"] = `rgba(0, 0, 0,${blur})`;
    }
  }
};
</script>

<style lang='less' scoped>
@import "~@/common/less/variable.less";

.slidebar {
  max-width: 80%;
  z-index: 2;
  &_mask {
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
  &_panel {
    position: absolute;
    top: 0;
    height: 100vh;
    transform-origin: left;
    transition: all ease 0.1s;
    width: 80%;
    z-index: 2;
  }
  &_content {
    height: 100vh;
    background-color: #fff;
  }
}
</style>