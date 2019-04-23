<!-- 歌单推荐详情页 -->
<template>

  <div class="singer-detail page">
    <music-list
      :songs=songs
      :title="getTitle"
      @toMv="toMv"
    ></music-list>

  </div>

</template>

<script  type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { SingerModel } from 'api/singer'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
const singerModel = new SingerModel()

export default {
  data () {
    return {
      songs: [],
      title: ''
    }
  },
  created () {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    getTitle () {
      return this.singer.name
    }
  },
  methods: {
    toMv (song) {
      this.$router.push({
        path: `/mv/${song.title}`
      })
    },
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      singerModel.getSingerDetail(this.singer.id).then(res => {
        if (res.code === 0) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },

  components: {
    MusicList
  }
}

</script>
<style lang='less' scoped>
</style>
