<!--头部组件-->
<template>
    <header id="head_top">
        <slot name="logo"></slot>
        <!-- 当是signin-up时，就显示这个，根据是否有userInfo来进入不同的路由 -->
        <router-link :to="userInfo ? '/profile' : '/login'" v-if="signinUp" class="head_login">
            <!-- 登录后userInfo的头像 -->
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"/>
            </svg>
            <!-- 登录前，只有字 -->
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
    </header>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {}
    },
    props: ['signinUp', 'headTitle', 'goBack'],
    mounted () {
      // 获取用户信息
      this.getUserInfo()
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['getUserInfo'])
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";

    #head_top {
        background-color: $blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
    }

    .head_goback {
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }

    .head_login {
        right: 0.55rem;
        @include sc(0.65rem, #fff);     // 字体颜色不能继承
        @include ct;

        .login_span {
            color: #fff;
        }

        .user_avatar {
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }

    .title_head {
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;

        .title_text {
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
