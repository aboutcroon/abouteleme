<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {currentcity} from '../../service/getData'

  export default {
    name: 'city',
    data() {
      return {
        cityid: '',
        cityname: ''
      }
    },
    components: {
      headTop
    },
    mounted () {
      this.cityid = this.$route.params.cityid
      // 根据路由中携带的id，获取当前城市名字
      currentcity(this.cityid).then(res => {
        this.cityname = res.name  // 非数组，只是一个字符串，单次使用
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .change_city {    // 这个要开启定位
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }
</style>
