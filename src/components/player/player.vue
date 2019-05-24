<!-- 播放组件 -->
<template>
  <div class="player">
    <transition name="fade">
      <div
        class="normal-player page"
        v-show="fullScreen"
      >
        <navbar
          :title="currentSong.title"
          @back="back"
        ></navbar>
        <div class="normal-player_bg">
          <img
            width="100%"
            height="100%"
            :src="currentSong.pic"
          >
        </div>
        <div
          class="normal-player_middle"
          @click="toggleMode"
        >
          <transition name="fade">
            <div
              class="middle-l"
              ref="middleL"
              v-show="!lyricMode"
            >
              <div
                class="cd-wrapper"
                ref="cdWrapper"
              >
                <div
                  class="cd"
                  :class="cdCls"
                >
                  <img
                    class="image"
                    :src="currentSong.pic"
                  >
                </div>
              </div>
              <div class="playing-lyric-wrapper">
                <div
                  class="playing-lyric playing-lyric__now"
                  v-if="currentLyric && currentLyric.lines.length>0"
                >{{playingLyric}}</div>
                <div
                  class="playing-lyric playing-lyric__now"
                  v-else
                >轻音乐,暂无歌词</div>
              </div>
            </div>
          </transition>

          <scroll
            class="middle-r"
            v-show="lyricMode"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric && currentLyric.lines.length>0">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum ===index }"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                >{{line.txt}}</p>
              </div>
              <div
                v-else
                class="lyric-wrapper_nolyric"
              >
                <p class="text">轻音乐暂无歌词</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div
            class="operators operators__top"
            v-show="!lyricMode"
          >
            <div class="icon">
              <star
                class="star operators_star"
                :value.sync="starInit"
                :color="starColor"
              >
                <img
                  class="star_img"
                  slot="icon"
                  :src="getStarImg"
                  alt
                >
              </star>
            </div>
            <div
              class="icon"
              @click.stop="toMv(currentSong)"
            >
              <i class="iconfont i-bofang"></i>
            </div>
            <div class="icon">
              <a
                @click="selectDownload(currentSong)"
                :download="currentSong.title"
              >
                <i class="iconfont i-xiazai"></i>
              </a>
            </div>
            <div class="icon">
              <i class="iconfont i-Moreoptionshorizon"></i>
            </div>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="onProgressBarChange"
              ></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators operators__bottom">
            <div
              class="icon"
              @click="changeMode"
            >
              <i
                class="iconfont"
                :class="iconMode"
              ></i>
            </div>
            <div
              class="icon"
              @click="prev"
            >
              <i class="iconfont i-zuobofang"></i>
            </div>
            <div class="icon">
              <div
                class="operators_playbtn"
                @click="togglePlaying"
              >
                <i
                  class="iconfont"
                  :class="playIcon"
                ></i>
              </div>
            </div>
            <div
              class="icon"
              @click="next"
            >
              <i class="iconfont i-youbofang"></i>
            </div>
            <div
              class="icon"
              @click.stop="show"
            >
              <i class="iconfont i-menu-fold"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="mini-player"
        v-show="!fullScreen && miniShow"
        @click="open"
      >
        <div class="icon">
          <img
            :class="cdCls"
            width="40"
            height="40"
            :src="currentSong.pic"
          >
        </div>
        <div class="text">
          <h2
            class="name"
            v-html="currentSong.title"
          ></h2>
          <p
            class="desc"
            v-html="currentSong.author"
          ></p>
        </div>
        <div class="control">
          <progress-circle
            :radius="radius"
            :percent="percent"
          >
            <i
              @click.stop="togglePlaying"
              class="icon-mini"
              :class="miniIcon"
            ></i>
          </progress-circle>
        </div>
        <div
          class="control"
          @click.stop="show"
        >
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="songSrc"
      @canplay="canpaly"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
    <add-song
      :show="showAddSong"
      @showup="showup"
    ></add-song>
  </div>
</template>

<script  type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { SongModel } from 'api/song'
import { shuffle } from 'lodash'
import Scroll from 'base/scroll/scroll'
import { playMode } from 'common/js/config'
import { mapGetters, mapMutations } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import Lyric from 'lyric-parser'
import AddSong from 'components/add-song/add-song'
import Star from 'base/star/Star'
import starLine from 'common/images/star.png'
import starFill from 'common/images/star_fill.png'
import { addClass, removeClass, hasClass } from 'common/js/dom'

const songModel = new SongModel()

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      playingLyric: '',
      radius: 32,
      currentLineNum: 0,
      currentShow: 'cd',
      duration: '',
      lyricMode: false,
      currentLyric: null,
      showLists: false, // 判断正在播放的底部弹层列表的显示和隐藏
      miniShow: true,
      songUrl: '',
      songAllUrl: [],
      starInit: false,
      starColor: 'rgb(240,86,84)'
    }
  },
  computed: {
    getDownLists () {
      let len = this.songAllUrl.length
      let temp = ''
      const obj = { 0: '标清品质', 1: '高清品质', 2: '无损品质', 3: '超级无损品质' }
      for (let i = 0; i < len; i++) {
        temp += `<li class="url-lists_item" data-href="${this.songAllUrl[i].url}">
          <a >${obj[i]}</a>
        </li>`
      }
      return `<div class="url-lists">
          <ul>
           ${temp}
          </ul>
      </div>`
    },
    getStarImg () {
    
      return this.starInit ? starFill : starLine
    },
    showAddSong () {
      return this.playlist.length !== 0 && this.showLists
    },
    playIcon () {
      return this.playing ? 'i-zanting' : 'i-bofang'
    },
    iconMode () {
      return this.mode === playMode.sequence
        ? 'i-yuanxunhuanbofang'
        : this.mode === playMode.loop
          ? 'i-danquxunhuan'
          : 'i-suijibofang'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    percent () {
      return this.currentTime / this.duration
    },
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    songSrc () {
      return this.songUrl !== '' ? this.songUrl : this.currentSong.url
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
  created () {
    this.current = { duration: 0 }
  },
  methods: {
    toMv (song) {
      this.$router.push({
        path: `/mv/${song.title}`
      })
      this.back()
    },
    showup (v) {
      this.showLists = v
    },
    show () {
      this.showLists = true
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    toggleMode () {
      this.lyricMode = !this.lyricMode
    },
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
      let index = list.findIndex(item => {
        return item.mid === this.currentSong.mid
      })
      this.setCurrentIndex(index)
    },
    onProgressBarChange (percent) {
      if (!this.duration) {
        return
      }
      const currentTime = this.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    getLyric () {
      songModel
        .getLyric({ id: this.currentSong.mid })
        .then(lyric => {
          this.currentLyric = new Lyric(lyric, this.handleLyric)
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
    _getSongUrl (id) {
      songModel
        .getSongUrl({ id: id })
        .then(res => {
          this.songUrl = res.url
        })
        .catch(err => {
          console.log(err)
        })
    },
    _getSongAllUrl (id) {
      return songModel.getSongAllUrl({ id: id }).then(res => {
        this.songAllUrl = res
        return new Promise((resolve, reject) => {
          resolve(res)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      // console.log(this.$refs.lyricList)
      if (lineNum > 5) {
        this.$nextTick(() => {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        })
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    canpaly () {
      // 解决audio获取到播放地址后，能获取duration的问题
      const totalTime = this.$refs.audio.duration
      this.duration = totalTime
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
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        // 如果列表只有一首歌
        this.loop()
      } else {
        if (this.mode === playMode.loop) {
          this.loop()
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          // 如果已经到了最后一首歌
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        // 如果列表只有一首歌
        this.loop()
      } else {
        if (this.mode === playMode.loop) {
          this.loop()
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          // 如果第一首歌
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
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
    showDialog () {
      let url = this.songAllUrl[0].url
      this.$createDialog({
        type: 'alert',
        showClose: true,
        content: this.getDownLists,
        maskClosable: true,
        confirmBtn: {
          text: '下载',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: (e) => {
          // downloadFile(url)
        },
        onClick: (e) => {
          if (e.target.className === 'url-lists_item') {
            url = e.target.getAttribute('data-href')
            for (let i = 0; i < e.target.parentNode.children.length; i++) {
              if (hasClass(e.target.parentNode.children[i], 'url-lists_item__active')) {
                removeClass(e.target.parentNode.children[i], 'url-lists_item__active')
              }
            }
            addClass(e.target, 'url-lists_item__active')
          }
        }
      }).show()
    },
    selectDownload (currentSong) {
      if (this.songAllUrl.length > 0) {
        this.showDialog()
        return
      }
      this._getSongAllUrl(currentSong.mid).then(res => {
        this.showDialog()
      })
      // Modal.info({ content: template, title: '下载到歌单' })
    },
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setPlayMode: 'SET_PLAY_MODE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.mid) {
        this.setFullScreen(false)
        this.miniShow = false
        this.showLists = false
        return
      }
      if (newSong.mid === oldSong.mid) {
        return
      }
      if (!('url' in newSong)) {
        this._getSongUrl(newSong.mid)
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.miniShow = true
        this.$refs.audio.play()
        this.getLyric()
      }, 1000)
    },

    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    fullScreen (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.lyricList.refresh()
        }, 20)
      }
    }
  },
  components: {
    Navbar,
    ProgressBar,
    Scroll,
    ProgressCircle,
    AddSong,
    Star
  }
}
</script>
<style lang='less'>
@import "~@/common/less/variable.less";
@import "~@/common/less/mixin.less";
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
      filter: blur(10px);
      img {
        width: 100%;
      }
    }
    &_middle {
      position: fixed;
      width: 100%;
      top: 0.8rem;
      bottom: 0;
      left: 0;
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
          left: 0;
          right: 0;
          margin: auto;
          top: 0;
          width: 3rem;
          height: 3rem;
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
            height: 0.2rem;
            line-height: 0.2rem;
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
        height: 4.4rem;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 0.32rem;
            color: @color-text-l;
            font-size: @font-size-medium;
            &.current {
              color: @color-text;
            }
          }
          &_nolyric {
            margin-top: 50%;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
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
    }
    .operators {
      display: flex;
      align-items: center;
      height: 0.88rem;
      &_star {
        top: -0.48rem;
        left: 0;
        right: 0;
      }
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
        position: relative;
        flex: 1;
        color: #fff;
        text-align: center;
        > img {
          width: 0.24rem;
        }
        > a {
          color: #fff;
        }
        &.disable {
          color: @color-subtheme;
        }
        i {
          font-size: 0.24rem;
        }
      }
      &__top {
        height: 0.4rem;
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 50%;
    bottom: 0;
    z-index: 2;
    transform: translateX(-50%);
    max-width: 640px;
    width: 100%;
    height: 0.6rem;
    background: @color-theme;
    .icon {
      flex: 0.24;
      width: 0.6rem;
      padding: 0 10px 0 10px;
      img {
        // &.play {
        //   animation: rotate 10s linear infinite;
        // }

        // &.pause {
        //   animation-play-state: paused;
        // }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        font-size: @font-size-medium;
        color: @color-text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
    .control {
      flex: 0.2;
      width: 30px;
      padding: 0;
      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 0.3rem;
        color: rgba(255, 255, 255, 0.6);
      }

      .icon-mini {
        font-size: 0.32rem;
        position: absolute;
        left: 0;
        top: 0;
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
.star {
  &_img {
    width: 0.24rem;
  }
}
.url-lists {
  ul {
    li {
      line-height: 0.44rem;
      position: relative;
    }
  }
  &_item {
    line-height: 0.44rem;
    a {
      color: #fff;
      font-size: @font-size-medium-x;
    }
    &__active{
       &:after{
         content: '';
         .bg-image('select');
         position: absolute;
          right: 0;
          width: 24px;
          height: 24px;
          top: 50%;
          overflow: hidden;
          background-repeat: no-repeat;
          background-size: 100%;
          transform: translateY(-50%);
        }
    }
   
  }
}
</style>
