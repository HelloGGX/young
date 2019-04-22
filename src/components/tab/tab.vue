<!-- 底部工具栏 -->
<template>
  <div class="tab">
    <div class="tab-items">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">热门推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  }
}
</script>
<style lang='less' scoped>

.tab {
  font-size: 0.16rem;

  .tab-items {
    position: relative;
    height: 3.125em;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center; //交叉轴（竖轴）方向上的对齐方式

    .tab-item {
      position: relative;
      height: 100%;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        width: 0;
      }
      span {
        color: #d0d0d0;
        &.tab-link {
          font-size: 0.875em;
        }
      }
      &.active {
        .tab-link {
          color: #e37ae6;
        }
        &::after {
          position: absolute;
          content: "";
          width: 80%;
          left: 50%;
          bottom: 0;
          height: 0.25em;
          transform: translateX(-50%);
          background-color: #e37ae6;
          border-radius: 0.18em;
          transition: width .3s ease-in-out;
        }
      }
    }
  }
}
</style>
