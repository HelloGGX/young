<template>
  <div class="home">

  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  name: 'home',
  data () {
    return {
      weather: {}
    }
  },
  created () {
    this._getRecommendData()
  },
  methods: {
    _getRecommendData () {
      getRecommend({
        province: '北京市',
        city: '北京市',
        county: '海淀区',
        weather_type: 'observe|rise'
      }).then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    }
  }
}
</script>
