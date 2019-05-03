<template>
<div class="singer-list">
  <scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          ref="singerList">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup" :key="group.title">
        <h2 class="list-group_title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group_item" :key="item.id" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
  <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex===index}"  :key="item">{{item}}</li>
      </ul>
    </div>
  <div class="list-fixed" ref="fixed" v-show="fixedTitle">
    <div class="fixed-title">{{fixedTitle}} </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 20

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.singerList.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0

      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}

</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";

.singer-list {
  overflow: hidden;
  height: 100%;
  position: relative;
}
.list-group {
  &_title{
     height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      font-size: @font-size-small;
      color:#fff;
      background: @color-theme;
  }
  &_item{
    display: flex;
    align-items: center;
    padding: 0.2rem 0 0 0.3rem;
    .avatar {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }
    .name {
      margin-left: 0.2rem;
      color: @color-text-l;
      font-size: @font-size-medium;
    }
  }
}
.list-shortcut {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
  width: 0.2rem;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  text-align: center;
  background: rgba(102, 23, 131, 0.26);
  font-family: Helvetica;
  .item {
    width: 0.2rem;
    height: 0.2rem;
    padding: 0.03rem;
    line-height: 1;
    color: @color-text-l;
    font-size: @font-size-small;
    &.current {
      color: @color-subtheme
    }
  }

}
.list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.2rem;
        font-size: @font-size-small;
        color:#fff;
        background: @color-theme;
      }
}
</style>
