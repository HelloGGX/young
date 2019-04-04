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
    <search-box :disabled="disabled" class="search_box"></search-box>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll ref="list" :data="songs">
          <div>
            <song-list :songs="songs" @select="selectItem"></song-list>
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
export default {
  data () {
    return {
      title: '搜索',
      disabled: false,
      songs: []
    }
  },

  components: {
    Scroll,
    SearchBox,
    Navbar,
    SongList
  },

  methods: {
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
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
      top: 178px;
      bottom: 0;
      width: 100%;
}
</style>
