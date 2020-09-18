<template>
    <div>
        <!--signin-up是为了显示登录注册标签-->
        <head-top signin-up="home">
            <span slot="logo" class="head_logo">ele.me</span>
        </head-top>
    </div>
</template>

<script>
  import { cityGuess, hotcity, groupcity } from '../../service/getData'
  import headTop from '../../components/header/head'

  export default {
    data () {
      return {
        guessCity: '', //当前城市
        guessCityid: '', //当前城市id
        hotcity: [], //热门城市列表
        groupcity: {} //所有城市列表
      }
    },
    components: {
      headTop
    },
    mounted () {
      // 获取当前城市
      cityGuess().then(res => {
        this.guessCity = res.name
        this.guessCityid = res.id
      })
      // 获取热门城市
      hotcity().then(res => {
        this.hotcity = res
      })
      // 获取所有城市
      groupcity().then(res => {
        this.groupcity = res
      })
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .head_logo {    // 因为slot不宜加class，所以就放在使用组件的时候来写样式
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
</style>
