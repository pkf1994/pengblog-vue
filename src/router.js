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
    }
  ]
})
