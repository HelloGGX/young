import App from '../App'

const home = () => import(/* webpackChunkName: "home" */ 'views/home')
const line = () => import(/* webpackChunkName: "line" */ 'views/line')
const add = () => import(/* webpackChunkName: "add" */ 'views/add')
const like = () => import(/* webpackChunkName: "like" */ 'views/like')
const me = () => import(/* webpackChunkName: "me" */ 'views/me')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [// 二级路由。对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    // 首页城市列表页
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/line',
      name: '路线',
      component: line
    },
    {
      path: '/add',
      name: '新增',
      component: add
    },
    {
      path: '/like',
      name: '收藏',
      component: like
    },
    {
      path: '/me',
      name: '个人中心',
      component: me
    }
  ]
}]
