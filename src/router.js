import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Article = () => import('./components/article/Article.vue')
const Home = () => import('./views/home/Home.vue')
const CommonHeader = () => import('./components/header/CommonHeader.vue')
const ArticlePage = () => import('./views/articlePage/ArticlePage.vue')

let router =  new Router({
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
                Home: Home,
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
            path: '/article/:article_id',
            name: 'article',
            components: {
                ArticlePage: ArticlePage,
                header: CommonHeader
            },
            props: {ArticlePage:true}
        }
    ],
    scrollBehavior (to, from, savedPosition) {

        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})



router.afterEach((to, from) => {
    if(to.path.match(/^\/home$/) != null) {
        document.title = '远方有鱼'
    }else if(to.path.match(/^\/$/) != null) {
        document.title = '远方有鱼'
    }else if(to.path.match(/^\/routine\/article_edit/) != null) {
        document.title = '彭凯帆的博客-编辑'
    }
})


export default router
