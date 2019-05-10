<!--  -->
<template>
  <scroll :data="mvs" class="mv_lists page">
        <ul>
          <li v-for="mv in mvs" :key="mv.mv_id" @click="getMvUrl(mv.v_id)">
            <div class="mv_img">
              <div class="mv_mask">
                  <img :src="playIcon" alt="">
              </div>
              <img v-lazy="mv.mv_pic_url"  alt="">
              <div class="mv_title">
                <p>{{mv.mv_name}}</p>
              </div>
              <div class="mv_info">
                <span class="mv_playcount"><i class="iconfont i-bofang"></i>{{norimizePlayCount(mv.play_count)}}</span>
                <span class="mv_duration"><i></i>{{normizeDuration(mv.duration)}}</span>
              </div>
            </div>

          </li>
        </ul>
  </scroll>

</template>

<script  type='text/ecmascript-6'>
import { normizeCount, format } from 'common/js/utils'
import playIcon from 'common/images/play@2x.png'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    mvs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      playIcon: playIcon,
      mvInfo: {}
    }
  },
  methods: {
    normizeDuration (v) {
      return format(v)
    },
    norimizePlayCount (v) {
      return normizeCount(v)
    },
    getMvUrl (id) {
      this.$emit('getMvUrl', id)
    }

  },
  components: {
    Scroll
  }
}

</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";

.mv_lists {
  top:1rem;
  ul li{
    padding: 0.1rem 0.2rem;
    .mv_img {
      position: relative;
      .mv_mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.3);
        >img {
          width: 0.4rem;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }

      }
      >img {
        overflow: hidden;
        border-radius: 0.1rem;
      }
      .mv_title {
        top: 0;
        position: absolute;
        left: 0;
        right: 0;
        width: 80%;
        padding: 0 0.1rem;
        line-height: 0.4rem;
        font-size: @font-size-medium;
        p {
overflow: hidden;text-overflow: ellipsis; white-space: nowrap;
        }
      }
      .mv_info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0 0.1rem;
        line-height: 0.2rem;
        display: flex;
        justify-content: space-between;
        font-size: @font-size-medium;
        i {
            font-size: @font-size-small;
            margin-right: 0.05rem;
        }
        .mv_playcount {

        }
        .mv_duration {}
      }
    }
    .mv_singer {
      .singer_img {}
      .singer_info {}
    }
  }
}
</style>
