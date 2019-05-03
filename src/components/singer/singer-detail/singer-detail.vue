<!-- 歌单推荐详情页 -->
<template>

  <div class="singer-detail page">
    <music-list
      :songs=songs
      :info=info
      :title="getTitle"
    ></music-list>

  </div>

</template>

<script  type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { SingerModel } from 'api/singer'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { createSinger } from 'common/js/singer'
const singerModel = new SingerModel()

export default {
  data () {
    return {
      songs: [],
      title: '',
      info: {}
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
    
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      singerModel.getSingerDetail(this.singer.id).then(res => {
        if (res.code === 0) {
          const data = res.data

          this.info = createSinger({
            singer_mid: data.singer_mid,
            total: data.total,
            singer_name: data.singer_name
          })
          this.songs = this._normalizeSongs(data.list)
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
