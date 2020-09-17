<template>
  <div>home</div>
</template>

<script>
import { cityGuess } from '../../service/getData'

export default {
  data() {
    return {
      guessCity: '', //当前城市
      guessCityid: '', //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {}, //所有城市列表
    }
  },
  mounted() {
    // 获取当前城市
    cityGuess().then((res) => {
      this.guessCity = res.name
      this.guessCityid = res.id
      console.log(res)
      console.log(this.guessCity)
    })
  },
}
</script>

<style>
</style>