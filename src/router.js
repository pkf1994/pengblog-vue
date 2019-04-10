import Vue from 'vue'
import Router from 'vue-router'
import Article from './components/article/Article.vue'

Vue.use(Router)

const Home = () => import('./views/home/Home.vue')
const CommonHeader = () => import('./components/header/CommonHeader.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        redirect: '/home'
    },
    {
      path: '/home',
      components: {
        default: Home,
        header: CommonHeader
      },
      children: [
          {
            path: 'article/:article_id',
            name: 'home_article',
            component: Article,
            props: true
          }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
