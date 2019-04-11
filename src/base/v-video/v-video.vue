<!-- 视频播放组件 -->
<template>
   <div class="video" >
     <transition name="fade">
       <div class="video-player page " v-show="mvFullScreen">
         <navbar :title="title" @back="back"></navbar>
         <video-player  class="video-player-box"

                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"

                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"

                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
    </video-player>
       </div>
     </transition>
   </div>
</template>

<script  type='text/ecmascript-6'>
import 'video.js/dist/video-js.css'
import { mapGetters, mapMutations } from 'vuex'
import { videoPlayer } from 'vue-video-player'
import Navbar from 'components/navbar/navbar'
export default {
  props: {
    mvInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      playerOptions: {
        // videojs options
        height: '360',
        // width: document.getElement.clientWidth,
        preload: 'auto',
        muted: true, // muted表示应将媒体的音量设置为不静音
        fluid: true, // 按比例缩放以自适应容器
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        poster: '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true // 全屏按钮
        }
      },
      title: '',
      playState: false

    }
  },

  components: {
    videoPlayer,
    Navbar
  },

  computed: {

    player () {
      return this.$refs.videoPlayer.player
    },
    ...mapGetters([
      'mvFullScreen'
    ])
  },

  mounted () {
    setTimeout(() => {
      // change src
      // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })
      // change array
      this.player.muted(false)
    }, 20)
  },

  methods: {
    // listen event
    back () {
      this.setMvFullScreen(false)
    },
    onPlayerPlay (player) {
      // 全屏播放
      // if (!player.isFullscreen()) {
      //   player.requestFullscreen()
      //   player.isFullscreen(true)
      // } else {
      //   player.exitFullscreen()
      //   player.isFullscreen(false)
      // }
    },
    onPlayerPause (player) {
      this.playState = false
      console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      console.log('player Loadeddata!', player)

      this.player.muted(false)
    },
    onPlayerWaiting (player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      this.playState = true
      console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      console.log('player Canplay!', player)
      player.play()
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      // seek to 10s
      console.log('example player 1 readied', player)

      // player.on(videoDom, 'click', () => {
      //   console.log('点击了')
      // })
      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    },
    ...mapMutations({
      setMvFullScreen: 'SET_MV_FULL_SCREEN'
    })
  },
  watch: {
    mvInfo (newInfo) {
      this.playerOptions.sources = [{
        type: 'video/mp4',
        src: this.mvInfo.mvurl['480p']
      }]
      this.title = this.mvInfo.mvinfo.name
      this.playerOptions.poster = this.mvInfo.mvinfo.pic
    },
    mvFullScreen (state) {
      if (!state) {
        this.player.pause()
      }
    }
  }
}

</script>
<style lang='less'>
.video-js {
  .vjs-big-play-button {
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
}
}

</style>
