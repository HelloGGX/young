<!-- 排行榜详情页 -->
<template>

  <div class="rank-detail page">
    <music-list
      :songs=songs
      :info=info
      :title="getTitle"
    ></music-list>

  </div>

</template>

<script  type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { RankModel } from "api/rank";
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { createRank } from 'common/js/rank'
const rankModel = new RankModel();

export default {
  data () {
    return {
      songs: [],
      title: '',
      info: {}
    }
  },
  created () {
    this._getRankDetail()
  },
  computed: {
    ...mapGetters([
      'rank'
    ]),
    getTitle () {
      return this.rank.topTitle
    }
  },
  methods: {
   _getRankDetail () {
      if (!this.rank.id) {
        this.$router.push('/rank')
        return
      }
      rankModel.getRankDetail(this.rank.id).then(res => {
        if (res.code === 0) {
          this.info = createRank(res.topinfo)
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { data } = item
        if (data.songid && data.albummid) {
          ret.push(createSong(data))
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
