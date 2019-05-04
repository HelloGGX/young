<!--排行榜列表-->
<template>
  <div class="rank-list page">
    <scroll :data="topList" ref="singerList">
      <ul>
        <li v-for="item in topList" class="rank-list_item" :key="item.id" @click="select(item)">
          <div class="rank-list_pic">
            <img :src="item.picUrl" alt>
            <span class="rank-list_count">{{normizeCount(item.listenCount)}}</span>
          </div>
          <div class="rank-list_top">
            <div class="rank-list_info">
              <h3 class="rank-list_tit">{{item.topTitle}}</h3>
              <p v-for="(top,index) in item.songList" :key="index">
                {{index+1}}
                <span class="rank-list_name">{{top.songname}}</span>
                -{{top.singername}}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
     <transition name="fade">
       <router-view ></router-view>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import { RankModel } from "api/rank";
import { normizeCount } from "common/js/utils";
import Scroll from "base/scroll/scroll";
import { mapMutations } from 'vuex'
const rankModel = new RankModel();

export default {
  name: "rank-list",
  data() {
    return {
      topList: [],

    };
  },
  created() {
    this._getRankList();
  },
  methods: {
    _getRankList() {
      rankModel.getRankList().then(res => {
        this.topList = res.data.topList;
      });
    },
    normizeCount(count) {
      return normizeCount(count);
    },
    select(item){
      this.$router.push({
        path: `/rank/detail`
      })
      this.setRank(item)
    },
    ...mapMutations({
      setRank: 'SET_RANK'
    })
  },
  components: {
    Scroll
  }
};
</script>

<style lang='less' scoped>
@import "~@/common/less/variable.less";

.rank-list {
  max-width: 640px;
  width: 100%;
  top: 1.3rem;
  overflow: hidden;
  padding: 0.1rem;
  ul {
    padding-left: 0.1rem;
    li {
      position: relative;
      background-color: rgba(206, 70, 255, 0.12);
    }
  }
  &_item {
    display: -webkit-box;
    margin-bottom: 0.1rem;
  }
  &_pic {
    position: relative;
    width: 1rem;
    height: 1rem;
    display: block;
    img {
      display: block;
      width: 1rem;
      height: 1rem;
    }
  }
  &_top {
    position: relative;
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  &_info {
    -webkit-box-flex: 1;
    margin: 0 0.1rem 0 0.15rem;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.12rem;
      color: rgba(250, 250, 250, 0.5);
      line-height: 0.2rem;
    }
  }
  &_tit {
    font-size: 0.14rem;
    color: #ffffff;
    font-weight: 400;
    margin-bottom: 5px;
  }
  &_name {
    color: #fff;
  }
  &_count {
    position: absolute;
    left: 5px;
    bottom: 7px;
    line-height: 12px;
    color: #fff;
    opacity: 0.6;
    font-size: 9px;
    z-index: 1;
  }
}
</style>