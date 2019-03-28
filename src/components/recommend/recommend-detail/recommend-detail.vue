<!-- 歌单推荐详情页 -->
<template>
  <transition name="fade">
    <div class="recommend-detail page">
      <navbar :title="title">
      </navbar>
      <scroll>

      </scroll>
    </div>
  </transition>
</template>

<script  type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import Navbar from 'components/navbar/navbar'
import { RecommendModel } from 'api/recommend'

const recommendmode = new RecommendModel()
export default {
  data () {
    return {
      title: '歌单'
    }
  },
  created () {
    this._getRecommendDetail(this.$route.params.id)
  },
  methods: {
    _getRecommendDetail (id) {
      recommendmode.getSongList({ id: id }).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    Scroll,
    Navbar
  }
}

</script>
<style lang='less' scoped>
.recommend-detail {

}
</style>
