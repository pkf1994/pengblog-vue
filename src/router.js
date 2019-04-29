import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)


const Article = () => import('./components/article/Article.vue')
const Home = () => import('./views/home/Home.vue')
const CommonHeader = () => import('./components/header/CommonHeader.vue')
const HomeHeader = () => import('./components/header/HomeHeader.vue')
const ManagePageHeader = () => import('./components/header/ManagePageHeader.vue')
const ArticleEditPageHeader = () => import('./components/header/ArticleEditPageHeader.vue')
const IPManagePageHeader = () => import('./components/header/IPManagePageHeader.vue')
const ArticlePage = () => import('./views/articlePage/ArticlePage.vue')
const ManagePage = () => import('./views/managePage/ManagePage.vue')
const ArticleEditPage = () => import('./views/articleEditPage/ArticleEditPage.vue')
const LoginPage = () => import('./views/loginPage/LoginPage.vue')
const IPManagePage = () => import('./views/ipManagePage/IPManagePage.vue')
const NotFoundPage = () => import('./views/notFoundPage/NotFoundPage.vue')
const MobileHeader = () => import ('./components/mobileHeader/MobileHeader.vue')



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
                Header: HomeHeader,
                MobileHeader: MobileHeader
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
            path: '/manage',
            name: 'managePage',
            components: {
                ManagePage: ManagePage,
                Header: ManagePageHeader,
                MobileHeader: MobileHeader
            }
        },
        {
            path: '/article/:article_id',
            name: 'article',
            components: {
                ArticlePage: ArticlePage,
                Header: CommonHeader,
                MobileHeader: MobileHeader
            },
            props: {ArticlePage:true}
        },
        {
            path: '/edit',
            name: 'articleEdit',
            components: {
                ArticleEditPage: ArticleEditPage,
                Header: ArticleEditPageHeader,
                MobileHeader: MobileHeader
            }
        },
        {
            path: '/login',
            name: 'loginPage',
            components: {
                LoginPage: LoginPage,
                Header: CommonHeader,
                MobileHeader: MobileHeader
            }
        },
        {
            path: '/ip',
            name: 'ipManagePage',
            components: {
                IPManagePage: IPManagePage,
                Header: IPManagePageHeader,
                MobileHeader: MobileHeader
            }
        },
        {
            path: '*',
            name: 'notFoundPage',
            components: {
                NotFoundPage: NotFoundPage,
                Header: CommonHeader,
                MobileHeader: MobileHeader
            }
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
    //launchPrograssBar()
    appointDocumentTitle(to)

})


export default router

const launchPrograssBar = () => {
    store.state.prograssBar.nanobarGoToMilePost()
}

const appointDocumentTitle = (to) => {
    if(to.path.match(/^\/home$/) != null) {
        document.title = '远方有鱼'
    }else if(to.path.match(/^\/$/) != null) {
        document.title = '远方有鱼'
    }else if(to.path.match(/^\/home\/article/) != null) {
        document.title = store.state.article.article.article_title
    }else if(to.path.match(/^\/40/) != null) {
        document.title = '40X'
    }
}
