<!-- 正在播放的歌单列表 -->
<template>
  <div class="add-song">
    <transition name="popup">
      <popup :show="show"  @show="showup">
        <template v-slot:header>
          <div class="add-song_header">
            <div class="add-song_mode" @click="changeMode">
              <i class="iconfont" :class="iconMode"></i>
              <span v-html="modeTxt"></span>
              <span v-html="listLen"></span>
            </div>
            <div class="add-song_clear">
              <i class="iconfont i-delete"></i>
            </div>
          </div>
        </template>
        <template v-slot:content>
          <pop-list :songs="playlist" @select="selectItem"></pop-list>
        </template>
      </popup>
    </transition>
  </div>
</template>

<script  type='text/ecmascript-6'>
import Popup from 'base/popup/popup'
import popList from 'base/pop-list/pop-list'
import { mapGetters, mapMutations } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'lodash'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'playlist',
      'mode',
      'currentSong',
      'sequenceList'
    ]),
    listLen () {
      return `(${this.playlist.length})`
    },
    modeTxt () {
      return this.mode === playMode.sequence
        ? '循环播放'
        : this.mode === playMode.loop
          ? '单曲循环'
          : '随机播放'
    },
    iconMode () {
      return this.mode === playMode.sequence
        ? 'i-yuanxunhuanbofang'
        : this.mode === playMode.loop
          ? 'i-danquxunhuan'
          : 'i-suijibofang'
    }
  },
  components: {
    Popup,
    popList
  },

  methods: {
    changeMode () {
      const mode = (this.mode + 1) % 3

      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex(item => {
        return item.mid === this.currentSong.mid
      })
      this.setCurrentIndex(index)
    },
    showup (v) {
      this.$emit('showup', v)
    },
    selectItem (item, index) {
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  }
}

</script>
<style lang='less' scoped>
.add-song {
  &_header {
    height: 0.44rem;
    padding: 0 0.08rem;
    border-bottom: 0.4px solid #e8e8e8;
  }
  &_mode {
    color: #000;
    line-height: 0.44rem;
    float: left;
    i{
      color: #666;
      margin: 0 0.1rem;
    }
  }
  &_clear{
    float: right;
    color: #000;
    line-height: 0.44rem;
    width: 0.44rem;
    text-align: center;
  }
}
</style>
