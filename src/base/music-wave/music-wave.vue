<!--  -->
<template>
  <canvas ref="wave" :width="newWidth" :height="newHeight"></canvas>
</template>

<script  type='text/ecmascript-6'>
let K = 2
let F = 6
let phase = 0
export default {
  props: {
    noise: 0,
    width: 0,
    height: 0
  },
  data () {
    return {
      devicePixelRatio: 1,
      run: false,
      speed: 0.4

    }
  },
  created () {
    this.init()
  },
  computed: {
    newWidth () {
      return this.width / this.devicePixelRatio
    },
    newHeight () {
      return this.height / this.devicePixelRatio
    }
  },

  methods: {
    init () {
      this.widt = this.devicePixelRatio * (this.width || 320)
      this.heig = this.devicePixelRatio * (this.height || 100)
      this.MAX = (this.heig / 2) - 4
    },
    _globalAttenuationFn (x) {
      return Math.pow(K * 4 / (K * 4 + Math.pow(x, 4)), K * 2)
    },
    _drawLine: function (attenuation, color, width) {
      this.ctx = this.$refs.wave.getContext('2d')
      this.ctx.moveTo(0, 0)
      this.ctx.beginPath()
      this.ctx.strokeStyle = color
      this.ctx.lineWidth = this.widt || 1
      var x, y
      for (let i = -K; i <= K; i += 0.01) {
        x = this.widt * ((i + K) / (K * 2))
        y = this.heig / 2 + this.noise * this._globalAttenuationFn(i) * (1 / attenuation) * Math.sin(F * i - phase)
        this.ctx.lineTo(x, y)
      }
      this.ctx.stroke()
    },
    _clear () {
      this.ctx = this.$refs.wave.getContext('2d')
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.fillRect(0, 0, this.widt, this.heig)
      this.ctx.globalCompositeOperation = 'source-over'
    },
    _draw () {
      if (!this.run) return
      this.ctx = this.$refs.wave.getContext('2d')
      phase = (phase + this.speed) % (Math.PI * 64)
      this._clear()
      this._drawLine(-2, 'rgba(255,255,255,0.1)')
      this._drawLine(-6, 'rgba(255,255,255,0.2)')
      this._drawLine(4, 'rgba(255,255,255,0.4)')
      this._drawLine(2, 'rgba(255,255,255,0.6)')
      this._drawLine(1, 'rgba(255,255,255,1)', 1.5)

      requestAnimationFrame(this._draw.bind(this), 1000)
    },
    start () {
      phase = 0
      this.run = true
      this._draw()
    },

    stop () {
      this.run = false
      this._clear()
    },
    setNoise (v) {
      this.noise = Math.min(v, 1) * this.MAX
    },
    setSpeed (v) {
      this.speed = v
    },
    set (noise, speed) {
      this.setNoise(noise)
      this.setSpeed(speed)
    }
  },
  watch: {
    noise (newNoise, oldNoise) {
      this.setNoise(this.noise)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
