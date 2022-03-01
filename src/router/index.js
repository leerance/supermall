import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const test = () => import('views/test/test')
//1、安装
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/detail/:iid',
    component: Detail
  }, {
    path: '/test',
    component: test
  }
]
//2、创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})
//3、导出
export default router