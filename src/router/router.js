const recommend = () => import(/* webpackChunkName: "recommend" */ 'components/recommend/recommend')
const recommendDetail = () => import(/* webpackChunkName: "recommendDetail" */ 'components/recommend/recommend-detail/recommend-detail')
const search = () => import(/* webpackChunkName: "search" */ 'components/search/search')
const mv = () => import(/* webpackChunkName: "mv" */ 'components/mv/mv')
const singer = () => import(/* webpackChunkName: "singer" */ 'components/singer/singer')
const singerDetail = () => import(/* webpackChunkName: "singerDetail" */ 'components/singer/singer-detail/singer-detail')
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
},
{
  path: '/mv/:word',
  name: 'mv',
  component: mv
},
{
  path: '/singer',
  name: 'Singer',
  component: singer,
  children: [{
    path: '/singer/detail',
    name: 'singerDetail',
    component: singerDetail
  }]
}
]
