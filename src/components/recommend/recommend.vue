<template>
  <div class="recommend" ref="recommend">
    <div ref="scroll" class="recommend-content">
      <div>
        <div  class="slider-wrapper" ref="sliderWrapper">

        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li  class="item" >
              <div class="icon">
                <img width="60" height="60" alt="">
              </div>
              <div class="text">
                <h2 class="name" ></h2>
                <p class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import api from 'api/recommend'

export default {
  data () {
    return {
      recommend: () => []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      api.getRecommend().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
