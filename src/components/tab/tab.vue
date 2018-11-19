<!-- 底部工具栏 -->
<template>
  <div class="tab">
    <div class="tab-items" >
      <router-link tag="div" class="tab-item" to="/home">
        <span class="tab-link">
          <i class="iconw icon-w15"></i>
        </span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/line">
        <span class="tab-link">
          <i class="iconfont icon-coordinates"></i>
        </span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/add">
        <span class="tab-link">
          <i class="iconfont icon-add"></i>
        </span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/like">
        <span class="tab-link">
          <i class="iconfont icon-like"></i>
        </span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/me">
        <span class="tab-link">
          <i class="iconfont icon-people"></i>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {

    }
  }
}

</script>
<style lang='less' scoped>
 @import '../../common/less/variable.less';
.tab {
    z-index: 10000!important;
    position: fixed;
    bottom: 0;
    width: 3.75rem;
    background-color: rgba(255, 255, 255, .9);
    .tab-items {
      height: .6rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      &::before {
         position: absolute;
        content: "";
        width: 100%;
        left: 0;
        top: 0;
        height: 1px;
        background-color: currentColor;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        -webkit-transform-origin: center top;
        transform-origin: center top;
      }
     .tab-item {
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        display: table;
        height: 100%;
        span {
          color: #d0d0d0;
          display: table-cell;
          vertical-align: middle;
          &.tab-link {
            i {
              font-size: 0.3rem;
            }
            // .icon-homepage:before {
            //   content: "\E71C";
            // }
          }
        }
        &.active {
              .tab-link {
                i {
                  color: @color-day-2;
                  &.icon-w15:before {
                    content: "\e617"!important;
                  }
                  &.icon-coordinates:before {
                    content: "\E6F8"!important;
                  }
                  &.icon-add:before {
                    font-weight: 700;
                  }
                  &.icon-like:before {
                    content: "\E725"!important;
                  }
                  &.icon-people:before {
                    content: "\E73C"!important;
                  }
                }

              }
          }
      }
    }
}
</style>
