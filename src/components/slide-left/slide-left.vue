<!-左侧侧边栏-->
<template>
  <div class="slide-left">
    <slidebar ref="slidebar" :slideshow="slideshow" :direction="direction">
      <template v-slot:content>
        <div class="slide-left_header">
          <div class="slide-left_img">
            <img src="../../assets/head.jpeg" alt>
          </div>
          <p>Gavin 高翔</p>
        </div>
        <div class="slide-left_content">
          <ul>
            <li>
              <i class="slide-left_icon iconfont i-bofang"></i>
              <span class="slide-left_txt">最近播放</span>
            </li>
            <li>
              <i class="slide-left_icon iconfont i-shoucang1"></i>
              <span class="slide-left_txt">我的收藏</span>
            </li>
            <li>
              <i class="slide-left_icon iconfont i-xiazai"></i>
              <span class="slide-left_txt">下载管理</span>
            </li>
          </ul>
        </div>
      </template>
    </slidebar>
  </div>
</template>

<script type='text/ecmascript-6'>
import Slidebar from "base/slidebar/slidebar";
export default {
  name: "slide-left",
  data() {
    return {
      slideshow: false,
      direction: "left"
    };
  },
  methods: {
    show() {
      this.$refs.slidebar._show();
    }
  },
  components: {
    Slidebar
  }
};
</script>

<style lang='less' scoped>
@import "~@/common/less/variable.less";
.slide-left {
  &_header {
    padding: 0.6rem 0.2rem 0;
    background-color: #f2f2f2;
    p {
      font-size: @font-size-medium-x;
      color: #666666;
      line-height: 0.4rem;
    }
  }
  &_img {
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    border-radius: 50%;
    img {
    }
  }
  &_content {
    padding: 0.14rem 0.2rem;
    ul {
      li {
        height: 0.4rem;
        line-height: 0.4rem;
      }
    }
  }
  &_icon {
    color: #666666;
  }
  &_txt {
    margin-left: 0.05rem;
    font-size: @font-size-medium;
    color: #666666;
  }
}
</style>
