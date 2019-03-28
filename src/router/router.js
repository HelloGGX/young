const recommend = () => import(/* webpackChunkName: "recommend" */ 'components/recommend/recommend')
const recommendDetail = () => import(/* webpackChunkName: "recommendDetail" */ 'components/recommend/recommend-detail/recommend-detail')

export default [{
  path: '/',
  redirect: '/recommend',
  name: 'App',
  component: recommend
},
{
  path: '/recommend',
  name: 'Recommend',
  component: recommend,
  children: [{
    path: ':id',
    name: 'recommendDetail',
    component: recommendDetail
  }]
}]
