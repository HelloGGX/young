import App from '../App'

const recommend = () => import(/* webpackChunkName: "recommend" */ 'components/recommend/recommend')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [// 二级路由。对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/recommend'
    },
    // 首页城市列表页
    {
      path: '/recommend',
      name: '推荐页',
      component: recommend
    }
  ]
}]
