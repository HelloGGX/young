<template>
  <div class="recommend" ref="recommend">
    <div ref="scroll" class="recommend-content">
      <div>
        <div v-if="slider.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in slider" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单</h1>
          <ul>
            <li class="item" v-for="item in songList" :key="item.id">
              <div class="icon">
                <img width="60" height="60" alt :src="item.picUrl">
              </div>
              <div class="text">
                <h2 class="name">{{item.songListAuthor}}</h2>
                <!-- <p class="desc">{{item.songListDesc}}</p> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from 'api/recommend'
import Slider from 'base/slider/slider'

export default {
  data () {
    return {
      slider: () => [],
      songList: () => []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      api.getRecommend().then(res => {
        console.log(res)
        this.slider = res.data.slider
        this.songList = res.data.songList
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";

.recommend {
  .recommend-content {
    padding: 0 0.12rem 0;
    .recommend-list {
      ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        justify-content: space-between;
      }
      .list-title {
        font-size: 0.16rem;
        color: @color-theme-txt;
        line-height: 0.45rem;
        &:after {
          content: "\e7eb";
          float: right;
          font-family: "iconfont" !important;
        }
      }
      .item {
        width: 30%;
        display: inline-block;
        margin-bottom: 0.1rem;
        font-size: 0.14rem;

        .icon {
          margin-bottom: 0.1rem;
          img {
            overflow: hidden;
            border-radius: 8px;
          }
        }
        .text {
          .name {
            line-height: 1.28em;
            font-size: 1em;
            word-wrap: break-word;
          }
          .desc {
            font-size: 0.857em;
          }
        }
      }
    }
  }
}
.slider-wrapper {
  margin: 0.1rem auto 0;
}
</style>
