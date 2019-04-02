<!-- 歌单推荐详情页 -->
<template>

    <div class="recommend-detail">
        <music-list :songs=songs :title="title"></music-list>
    </div>

</template>

<script  type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { RecommendModel } from 'api/recommend'

const recommendmode = new RecommendModel()
export default {
  data () {
    return {
      songs: [],
      title: '歌单'
    }
  },
  methods: {
    _getRecommendDetail (id) {
      recommendmode.getSongList({ id: id }).then(res => {
        if (res.Code === 'OK') {
          this.songs = res.Body
        }
      })
    }
  },

  created () {
    this._getRecommendDetail(this.$route.params.id)
  },
  components: {
    MusicList
  }
}

</script>
<style lang='less' scoped>

</style>
