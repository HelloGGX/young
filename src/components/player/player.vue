<!-- 播放组件 -->
<template>
  <div class="player">
    <transition name="fade">
      <div class="normal-player page" v-show="fullScreen">
        <navbar :title="currentSong.title" @back="back"></navbar>
        <div class="normal-player_bg">
          <img width="100%" height="100%" :src="currentSong.pic">
        </div>
        <div class="normal-player_middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.pic">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{oldPlayingLyric}}</div>
              <div class="playing-lyric playing-lyric__now">{{playingLyric}}</div>
            </div>
          </div>
          <div class="middle-r" ref="lyricList"></div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon" @click="changeMode">
              <i class="iconfont" :class="iconMode"></i>
            </div>
            <div class="icon">
              <i class="iconfont i-zuobofang"></i>
            </div>
            <div class="icon">
              <div class="operators_playbtn" @click="togglePlaying">
                <i class="iconfont" :class="playIcon" ></i>
              </div>
            </div>
            <div class="icon ">
              <i class="iconfont i-youbofang"></i>
            </div>
            <div class="icon ">
              <i class="iconfont i-shoucang1"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen"></div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script  type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { SongModel } from 'api/song'
import { shuffle } from 'common/js/utils'
import { playMode } from 'common/js/config'
import { mapGetters, mapMutations } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
import Lyric from 'lyric-parser'

const songModel = new SongModel()

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      playingLyric: '',
      oldPlayingLyric: '',
      currentLineNum: 0,
      currentShow: 'cd'
    }
  },
  computed: {
    playIcon () {
      return this.playing ? 'i-zanting' : 'i-bofang'
    },
    iconMode () {
      return this.mode === playMode.sequence ? 'i-yuanxunhuanbofang' : this.mode === playMode.loop ? 'i-danquxunhuan' : 'i-suijibofang'
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    cdCls () {
      return this.playing ? 'play' : 'play pause'
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
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },

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
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    onProgressBarChange (percent) {
      if (!this.currentSong.duration) {
        return
      }
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    getLyric (url) {
      songModel
        .getLyric({ id: this.currentSong.mid })
        .then(lyric => {
          if (this.currentSong.lyric !== lyric) {
          }

          this.currentLyric = new Lyric(lyric, this.handleLyric)
          const totalTime = this.$refs.audio.duration
          this.currentSong.duration = totalTime
          if (this.playing) {
            this.currentLyric.play()
          }
        })
        .catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 1) {
        this.oldPlayingLyric = this.currentLyric.lines[lineNum - 1].txt
      }

      // if (lineNum > 5) {
      //   let lineEl = this.$refs.lyricLine[lineNum - 5]
      //   this.$refs.lyricList.scrollToElement(lineEl, 1000)
      // } else {
      //   this.$refs.lyricList.scrollTo(0, 0, 1000)
      // }
      this.playingLyric = txt
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setFullscreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    format (interval) {
      interval = interval | 0
      const minute = (interval / 60) | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    back () {
      this.setFullscreen(false)
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.mid) {
        return
      }
      if (newSong.mid === oldSong.mid) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
        this.getLyric()
      }, 1000)
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    Navbar,
    ProgressBar
  }
}
</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";
.player {
  .normal-player {
    &_bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        width: 100%;
      }
    }
    &_middle {
      position: absolute;
      width: 100%;
      top: 0.8rem;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
            }
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: @font-size-medium;
            color: @color-theme-txt;
            &__now {
              //font-size: @font-size-medium-x
            }
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
    .bottom {
      position: absolute;
      top: 4.8rem;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: @color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: @color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: @color-text;
          font-size: @font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        height: 0.88rem;
        &_playbtn {
          width: 0.6rem;
          height: 0.6rem;
          background-color: #db219d;
          border-radius: 50%;
          margin: 0 auto;
          i {
            line-height: 0.6rem;
          }
        }
        .icon {
          flex: 1;
          color: #fff;
          text-align: center;
          &.disable {
            color: @color-subtheme;
          }
          i {
            font-size: 0.24rem;
          }
        }
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
