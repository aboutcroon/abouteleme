<template>
    <div>
        <!--signin-up是为了显示登录注册标签-->
        <head-top signin-up="home" class="city_head">
            <span slot="logo" class="head_logo" @click="reload">abouteleme</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>若定位不准确，请在城市列表中选取</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guessCity">
                <span>{{guessCity}}</span>
                <i class="iconfont iconPutaway"></i>
            </router-link>
        </nav>
        <section class="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">   <!--clear清除浮动-->
                <router-link tag="li" v-for="item in hotcity" :key="item.id" :to="'/city/' + item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
                    <h4 class="city_title">
                        {{key}}
                        <span v-if="index === 0">（按字母排序）</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id"
                                     class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
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
    },
    computed: {
      // 将获取到的字母按A-Z排序
      sortgroupcity () {
        let sortObj = {}
        for (let i = 65; i <= 90; i++) {
          if (this.groupcity[String.fromCharCode(i)]) {
            sortObj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
          }
        }
        return sortObj
      }
    },

    methods: {
      // 点击图标刷新页面
      reload() {
        window.location.reload()
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .head_logo { // 因为slot不宜加class，所以就放在使用组件的时候来写样式
        left: 0.4rem;
        font-weight: 400;
        line-height: 0.7rem; // 使得与右边的链接同样高
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }

    .city_nav {
        padding-top: 2.35rem;
        border-top: 1px solid $bc;
        background-color: #fff; // 整体背景是灰的，nav模块是白的
        margin-bottom: 0.4rem; // 底下留点空隙
        .city_tip {
            @include fj; // flex布局
            line-height: 1.45rem;
            padding: 0 0.45rem;

            span:nth-of-type(1) { // 第一个span
                @include sc(0.55rem, #666)
            }

            span:nth-of-type(2) { // 第二个span
                @include sc(0.475rem, #9f9f9f);
                font-weight: 900;
            }
        }

        .guessCity {
            @include fj; // 默认为space between
            align-items: center;
            height: 1.8rem;
            padding: 0 0.45rem;
            border-top: 1px solid $bc; // 使得上方显示一根粗线
            border-bottom: 2px solid $bc; // 使得下方显示一根更粗的线
            @include font(0.75rem, 1.8rem);

            span:nth-of-type(1) {
                color: $blue;
            }
        }
    }

    .hot_city_container {
        background-color: #fff;
        margin-bottom: 0.4rem;
    }

    .city_title {
        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
        span{
            @include sc(0.475rem, #999);
        }
    }

    // 因为这两个也要用作其他标签的子节点的样式，所以放在外面
    .citylistul {
        li {
            // float布局，最后需要再加一个class来清除浮动
            float: left;
            text-align: center;
            color: $blue;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(25%, 1.75rem); // 有了这一句才有了这个栅栏布局
            @include font(0.6rem, 1.75rem);
        }

        li:nth-of-type(4n) {
            border-right: none; // 最右边的不需要border
        }
    }

    .letter_classify_li {
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 1px solid $bc;

        .groupcity_name_container {
            li {
                color: #666;
            }
        }
    }
</style>
