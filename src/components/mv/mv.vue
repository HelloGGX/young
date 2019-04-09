<!-- mv组件 -->
<template>
  <div class="mv page">
      <navbar ref="navbar" :title="navTitle" class="mv_navbar" @back="back"></navbar>
      <div class="mv_lists">
        <ul>
          <li v-for="(index,mv) in mvs" :key="mv.id">

          </li>
        </ul>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { MvModel } from 'api/mv'

const mvModel = new MvModel()

export default {
  data () {
    return {
      mvs: []
    }
  },
  computed: {
    navTitle () {
      return this.$route.params.word
    }
  },
  created () {
    this._getVideo(this.$route.params.word)
  },
  methods: {
    _getVideo (word) {
      mvModel.getMv({ word: encodeURI(word) }).then(res => {
        console.log(res)
        this.mvs = res.mvs
      })
    },
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  components: {
    Navbar
  }
}

</script>
<style lang='less' scoped>
.mv_navbar {
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
}
</style>
