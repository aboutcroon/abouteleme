import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      // 首页城市列表页
      {
        path: '/home',
        component: home
      },
      // 当前城市选择页
      {
        path: '/city/:cityid',
        component: city
      }
    ]
  }
]
