<!-- 底部弹出层内嵌列表组件 -->
<template>
  <scroll ref="songList" class="song-list" :data="songs" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll">
    <ul>
      <li ref="songLine" class="song-list_item" :class="{'current-song':index===findIndex}" v-for="(song, index) in songs" :key="song.mid" @click.stop="selectItem(song,index)">
          <div class="song-list_content">
              <h2 class="song-list_name">{{song.title}}</h2>
              <span class="song-list_desc">{{song.author}}</span>
          </div>
          <div class="song-list_icon" @click.stop="deleteSong(song,index)">
            <i class="iconfont i-clear"></i>
          </div>
      </li>
    </ul>
  </scroll>
</template>

<script  type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      probeType: 3,
      listenScroll: true
    }
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    findIndex () {
      return this.sequenceList.findIndex(item => {
        return item.mid === this.currentSong.mid
      })
    },
    ...mapGetters([
      'currentIndex',
      'currentSong',
      'mode',
      'sequenceList'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.toCurrentLine(this.sequenceList)
    }, 20)
  },
  methods: {
    toCurrentLine (lists) {
      let index = lists.findIndex(item => {
        return item.mid === this.currentSong.mid
      })
      let lineEl = this.$refs.songLine[index]
      this.$refs.songList.scrollToElement(lineEl, 1000)
    },
    scroll (p) {
      if (p.y > 0) {
        this.$emit('scrollTop', p.y)
      }
    },
    deleteSong (item, index) {
      this.$emit('delete', item, index)
    },
    selectItem (item) {
      this.$emit('select', item)
    },
    refresh () {
      this.$refs.songList.refresh()
    }
  },
  watch: {
    currentIndex () {
      this.toCurrentLine(this.sequenceList)
    }
  },
  components: {
    Scroll
  }
}

</script>
<style lang='less' scoped>
@import '~@/common/less/variable.less';
.song-list {
  padding: 0 0.12rem;
  overflow: hidden;
  height: 50vh;
  width: 100%;
}
.song-list_item {
  display: flex;
  align-items: center;
  &.current-song {
     .song-list_name {color: @color-theme}
     .song-list_desc {color: @color-theme}
     &:before {
       font-family: "iconfont" !important;
       content: '\e654';
       font-size: @font-size-medium;
       color: @color-theme;
       padding: 0 0.05rem;
     }
  }
}
.song-list_content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 0.4rem;
  font-weight: 200;
  width: 80%;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.song-list_icon{
  margin-left: auto;
  color: #666;
  .song-list_delete {
    font-size: @font-size-large;
  }
}
.song-list_name {
 line-height: 0.3rem;
 font-size: @font-size-medium;

 color: #000;
 &::after {
   content: '-';
    color: #666;
    padding: 0 0.05rem;
 }
}
.song-list_desc {
  font-size: @font-size-small;
  color: #666;
}
</style>
