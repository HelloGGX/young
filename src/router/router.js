const recommend = () => import(/* webpackChunkName: "recommend" */ 'components/recommend/recommend')

export default [{
  path: '/',
  redirect: '/recommend',
  name: 'App',
  component: recommend
},
{
  path: '/recommend',
  name: 'Recommend',
  component: recommend
  // children: [{
  //   path: ':id',

  // }]
}]
