<!-- 底部弹出层内嵌列表组件 -->
<template>
  <scroll ref="songList" class="song-list" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll">
    <ul>
      <li class="song-list_item" :class="{'current-song':index==currentIndex}" v-for="(song, index) in songs" :key="song.mid" @click="selectItem(song,index)">
          <div class="song-list_content">
              <h2 class="song-list_name">{{song.title}}</h2>
              <span class="song-list_desc">{{song.author}}</span>
          </div>
          <div class="song-list_icon">
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
    ...mapGetters([
      'currentIndex'
    ])
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    },
    refresh () {
      this.$refs.songList.refresh()
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
       font-size: 0.14rem;
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
    font-size: 0.18rem;
  }
}
.song-list_name {
 line-height: 0.3rem;
 font-size: 0.14rem;

 color: #000;
 &::after {
   content: '-';
    color: #666;
    padding: 0 0.05rem;
 }
}
.song-list_desc {
  font-size: 0.12rem;
  color: #666;
}
</style>
