<!-- 歌手列表页 -->
<template>
  <div class="singer page">
      <singer-list :data="singers" @select="select"></singer-list>
      <router-view></router-view>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { SingerModel } from 'api/singer'
import SingerList from 'base/singer-list/singer-list'
import Navbar from 'components/navbar/navbar'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

const singerModel = new SingerModel()

export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },

  methods: {
    _getSingerList () {
      singerModel.getSingerList().then((res) => {
        if (res.code === 0) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    select (item) {
      this.$router.push({
        path: `/singer/detail`
      })
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    SingerList,
    Navbar
  }
}

</script>
<style lang='less' scoped>
.singer {
  max-width: 640px;
  width: 100%;
  top: 1.3rem;
  overflow: hidden;
}
</style>
