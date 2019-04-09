<!-- 搜索组件 -->
<template>
  <div class="search page">
      <navbar ref="navbar" :title="title" class="app_navbar"  @back="back">
          <template v-slot:left>
            <i class="iconfont i-left"></i>
          </template>
          <template v-slot:right>
            <img src="@/common/images/user.png" alt="">
          </template>
      </navbar>
    <search-box :disabled="disabled" class="search_box" @query="query"></search-box>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll class="scroll" :data="songs" ref="shortcut" :probe-type="probeType" :listen-scroll="listenScroll" :pullUpLoad="pullUpLoad" @pullingUp="pullingUp">
          <div>
            <song-list :songs="songs" @select="selectSong"></song-list>
          </div>
      </scroll>
    </div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import SearchBox from 'base/search-box/search-box'
import Navbar from 'components/navbar/navbar'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import { mapActions } from 'vuex'
import { SearchModel } from 'api/search'
import { playlistMixin } from 'common/js/mixin'

const searchModel = new SearchModel()
let totalnum = 0

export default {
  mixins: [playlistMixin],
  data () {
    return {
      title: '搜索',
      disabled: false,
      songs: [],
      pullUpLoad: true,
      q: '',
      noMore: false,
      page: 1
    }
  },
  components: {
    Scroll,
    SearchBox,
    Navbar,
    SongList
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '80px' : ''
      this.$refs.shortcut.$el.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    _getSearch (key) {
      searchModel.getSearch({ id: key }).then(res => {
        if (res.Code === 'OK') {
          totalnum = res.songnum
          this.songs = res.Body
        }
      })
    },
    selectSong (song) {
      this.insertSong(song)
    },
    ...mapActions([
      'insertSong'
    ]),
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    query (v) {
      if (v === '') {
        this.songs = []
        return
      }
      this.q = encodeURI(v)
      this._getSearch(this.q)
    },
    pullingUp () {
      let page = this.page++
      if (this.hasMore()) {
        searchModel.getSearch({ id: this.q, page: page }).then(res => {
          console.log(res)
          if (res.Body) {
            this.setMoreData(res.Body)
          }
        })
      }
    },
    hasMore () {
      if (this.songs.length >= totalnum) {
        this.noMore = true
        return false
      } else {
        this.noMore = false
        return true
      }
    },
    setMoreData (dataArray) {
      const songLists = this.songs.concat(dataArray)
      this.songs = songLists
      console.log(this.songs)
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}

</script>
<style lang='less' scoped>
.search_box {
  width: 90%;
  margin: 0 auto;
}
.shortcut-wrapper {
  position: fixed;
      top: 1.4rem;
     overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>
