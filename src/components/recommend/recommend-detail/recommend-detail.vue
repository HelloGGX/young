<!-- 歌单推荐详情页 -->
<template>

  <div class="recommend-detail page">
    <music-list
      :info = getInfo
      :songs=songs
      :title="title"
      @toMv="toMv"
    ></music-list>

  </div>

</template>

<script  type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { RecommendModel } from 'api/recommend'
import { mapGetters } from 'vuex'
const recommendmode = new RecommendModel()
export default {
  data () {
    return {
      songs: [],
      title: '歌单'
    }
  },
  computed: {
    ...mapGetters([
      'musicList'
    ]),
    getInfo () {
      return {
        picUrl: this.musicList.picUrl,
        author: this.musicList.songListAuthor,
        desc: this.musicList.songListDesc
      }
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
