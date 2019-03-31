<!-- 歌曲列表组件 -->
<template>
  <div class="song-list">
    <ul>
      <li class="song-list_item" v-for="(song, index) in songs" :key="song.mid" @click="selectItem(song,index)">
          <img class="song-list_img" v-lazy="song.pic" alt="">
          <div class="song-list_content">
              <h2 class="song-list_name">{{song.title}}</h2>
              <p class="song-list_desc">{{song.author}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script  type='text/ecmascript-6'>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}

</script>
<style lang='less' scoped>
@import '~@/common/less/variable.less';
.song-list {
  padding: 0 0.12rem;
}
.song-list_item {
  display: flex;
  align-items: center;
}
.song-list_img {
  width: 0.6rem;
  height: 0.6rem;
  margin-bottom: 0.2rem;
}
.song-list_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 0.2rem;
  line-height: 0.2rem;
  font-weight: 200;
}
.song-list_name {
 line-height: 0.3rem;
 font-size: 0.14rem;
}
.song-list_desc {
  font-size: 0.12rem;

  color: @color-text-ll
}
</style>
