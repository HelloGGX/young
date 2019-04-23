<!-- 歌单推荐详情页 -->
<template>

  <div class="recommend-detail page">
    <music-list
      :songs=songs
      :title="title"
      @toMv="toMv"
    ></music-list>

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
    toMv (song) {
      this.$router.push({
        path: `/mv/${song.title}`
      })
    },

    _getRecommendDetail (id) {
      recommendmode.getSongList({ id: id }).then(res => {
        if (res.Code === 'OK') {
          this.songs = res.Body
          this.title = res.listname
        }
        console.log(this.songs)
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
