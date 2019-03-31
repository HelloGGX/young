<!-- 播放组件 -->
<template>
  <div class="player ">

      <transition name="fade">
        <div class="normal-player page" v-show="fullScreen"></div>
      </transition>
      <transition name="mini">
        <div class="mini-player" v-show="!fullScreen"></div>
      </transition>
      <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
          ></audio>
  </div>
</template>

<script  type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    title () {
      return this.currentSong.title
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode',
      'favoriteList',
      'currentIndex',
      'fullScreen',
      'playing'
    ])
  },
  methods: {
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    }
  },
  watch: {
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    Navbar
  }
}

</script>
<style lang='less' scoped>
.player {
  .normal-player {

  }
}
</style>
