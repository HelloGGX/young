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
    <search-box :disabled="disabled" class="search_box" v-model="q" @query="query"></search-box>
    <div class="history search_history" v-show="showList">
      <div class="history_title">搜索历史</div>
        <ul>
          <li v-for="item in getHistory" :key="item" @click="selectHistory(item)"><span class="history_item">{{item}}</span></li>
        </ul>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!showList">
      <scroll class="scroll" :data="results" ref="shortcut" :probe-type="probeType" :listen-scroll="listenScroll" :pullUpLoad="pullUpLoad" @pullingUp="pullingUp">
          <div>
            <song-list :songs="results" @select="selectSong" @toMv="toMv" :showImg="showImg"></song-list>
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
import cookies from 'js-cookie'

const searchModel = new SearchModel()
let TOTALNUM = 0

export default {
  mixins: [playlistMixin],
  data () {
    return {
      title: '搜索',
      showImg: false,
      disabled: false,
      results: [],
      pullUpLoad: true,
      q: '',
      noMore: false,
      page: 1,
      history: []
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
    if (cookies.get('history')) {
      this.history = JSON.parse(cookies.get('history'))['history']
    }
  },
  computed: {
    getHistory () {
      return this.history
    },
    showList () {
      return this.results.length === 0
    }
  },
  methods: {

    toMv (song) {
      this.$router.push({
        path: `/mv/${song.title}`
      })
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '80px' : ''
      this.$refs.shortcut.$el.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    _getSearch (key) {
      searchModel.getSearch({ id: key }).then(res => {
        if (res.Code === 'OK') {
          TOTALNUM = res.songnum
          this.results = res.Body
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
        this.results = []
        return
      } else {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
      this.search(v)
    },
    search (v) {
      this.addHistory(v)
      this.q = v
      this._getSearch(encodeURI(v))
    },
    selectHistory (v) {
      this.q = v
    },
    addHistory (v) {
      const result = v.trim()
      const obj = Object.create(null)
      let index = this.history.indexOf(result)
      if (index < 0) { // 如果历史记录里面没有
        this.history.unshift(result)
        if (this.history.length > 8) {
          this.history.pop()
        }
      } else { // 如果历史记录里面有
        this.history.splice(index, 1)
        this.history.unshift(result)
      }
      obj['history'] = this.history
      cookies.set('history', obj)
    },
    pullingUp () {
      let page = this.page++
      if (this.hasMore()) {
        searchModel.getSearch({ id: encodeURI(this.q), page: page }).then(res => {
          if (res.Body) {
            this.setMoreData(res.Body)
          }
        })
      }
    },
    hasMore () {
      if (this.results.length >= TOTALNUM) {
        this.noMore = true
        return false
      } else {
        this.noMore = false
        return true
      }
    },
    setMoreData (dataArray) {
      const songLists = this.results.concat(dataArray)
      this.results = songLists
    }
  }
}

</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";
.search {
  &_history{
    margin-top: 0.1rem;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  &_box {
    width: 90%;
    margin: 0 auto;
  }
}
.shortcut-wrapper {
  position: fixed;
      top: 1.4rem;
     overflow: hidden;
    width: 100%;
    height: 100%;
}
.history {

  &_title{
    padding: 0.1rem 0.05rem;
    font-size: @font-size-medium;
  }
  ul {
    li {
      display: inline-block;
      padding: 0 0.05rem;
      span{}
    }
  }
  &_item{
    padding: 0.02rem;
    font-size: @font-size-small;
    // border:1px solid #f2f2f2;
    // border-radius: 4px;
    line-height: 1.83em;
    color: rgba(255, 255,255, 0.6)
  }

}
</style>
