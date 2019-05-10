<!-- 歌单推荐详情页 -->
<template>
  <div class="music-list page">
    <navbar ref="navbar" :title="title" class="music-list_navbar" @back="back"></navbar>
    <div class="filter" ref="filter"></div>
    <div class="music-list_bg" :style="bgStyle" ref="bgImage">
      <div class="music-list_cover">
        <img src="@/common/images/music-list_bg@2x.png" alt="">
      </div>

      <div class="music-list_inner">
        <img class="music-list_img" :src="info.picUrl" alt="">
        <div class="music-list_info">
          <h3>{{info.author}}</h3>
          <p>{{info.desc}}</p>
        </div>
      </div>
    </div>
    <div class="music-list_do" ref="do">
      <ul>
        <li>
          <img src="@/common/images/BigStar@2x.png" alt="">
          <p>232</p>
        </li>
        <li>
          <img src="@/common/images/Speechbubblefreeicon@2x.png" alt="">
          <p>232</p>
        </li>
        <li>
          <img src="@/common/images/Cloudcomputing@2x.png" alt="">
          <p>232</p>
        </li>
        <li>
          <img src="@/common/images/Group@2x.png" alt="">
          <p>232</p>
        </li>
      </ul>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" ref="list" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div>
        <song-list :songs="songs" @select="selectItem" @toMv="toMv"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script  type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import Navbar from 'components/navbar/navbar'
import SongList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 70
const transform = prefixStyle('transform')

export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.info.picUrl})`
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.imageHeight = this.$refs.bgImage.clientHeight + this.$refs.do.clientHeight + 10
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style['transform'] = `translate3d(0,${this.imageHeight}px,0)`
      this.$refs.layer.style['top'] = `${this.imageHeight}px`
      this.$refs.filter.style['height'] = `${this.imageHeight}px`
    })
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    toMv (song) {
      this.$router.push({
        path: `/mv/${song.title}`
      })
      this.$emit('toMv', song)
    },
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    scrollY (newVal) {
      let translateY = Math.max(this.minTransalteY, newVal) // layer移动的最大高度不能超过minTransalteY
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent / 5
      } else {
        blur = Math.min(0.8, percent * 2)
      }
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style['background'] = `rgba(7, 17, 27,${blur})`
      this.$refs.filter.style['height'] = `${this.imageHeight + translateY}px`
      // this.$refs.list.$el.style['transform'] = `translate3d(0,${this.imageHeight + 10 + translateY}px,0)`
      if (newVal < this.minTransalteY) {
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.bgImage.style.overflow = 'hidden'
        this.$refs.navbar.$el.style['backgroundColor'] = `rgba(31, 16, 55,1)`
        // this.$refs.list.$el.style['overflow'] = 'hidden'
      } else {
        let paddingY = Math.min(20, translateY) / 10
        this.$refs.bgImage.style.paddingTop = `${46 + paddingY}%`
        this.$refs.bgImage.style.height = 0
        this.$refs.bgImage.style.overflow = 'initial'
        this.$refs.navbar.$el.style['backgroundColor'] = `rgba(31, 16, 55,0)`
        // this.$refs.list.$el.style['overflow'] = 'initial'
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    Scroll,
    Navbar,
    SongList
  }
}
</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";
.music-list_navbar {
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;

}
.music-list {
  &_cover {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    img {
      height: 108%;
      width: 100%;
    }
  }
  .filter {
     position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
  }
  &_bg {
    position: relative;
    height: 0;
    padding-top: 46%;
    transform-origin: top;
    background-size: cover;
  }
  &_do {
    padding: 0.2rem 0.1rem 0;
    margin-top: 0.1rem;
    ul {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid @color-text-d;
      li {
        margin-bottom: 0.1rem;
        img {
          width: 0.26rem;
          height: 0.24rem;
        }
        p {
          text-align: center;
          line-height: 0.28rem;
        }
      }
    }
  }
  &_inner {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.2rem;
  }
  &_img {
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 6%;
  }
  &_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 0.2rem;
    line-height: 0.2rem;
    font-weight: 200;
    h3 {
      font-size: @font-size-medium ;
      line-height: 0.3rem;
    }
    p {
      font-size: @font-size-small;
    }
  }
  .list {
     position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      max-width: 640px;
  }
}
.bg-layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  background: @color-background-d;
}
</style>
