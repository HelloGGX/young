const recommend = () => import(/* webpackChunkName: "recommend" */ 'components/recommend/recommend')
const recommendDetail = () => import(/* webpackChunkName: "recommendDetail" */ 'components/recommend/recommend-detail/recommend-detail')
const search = () => import(/* webpackChunkName: "search" */ 'components/search/search')
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
},
{
  path: '/search',
  name: 'Search',
  component: search
}
]
