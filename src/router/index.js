import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: ()=>import('../pages/login/LoginPage')
    },
    {
      path: '/home',
      component: ()=>import('../pages/home/HomePage'),
      redirect: '/welcome',
      children:[
        {
          path:'/welcome',
          component:()=>import('../pages/welcome/WelcomePage')
        },
        {
          path:'/users',
          component:()=>import('../pages/users/UsersPage')
        },
        {
          path:'/roles',
          component:()=>import('../pages/roles/RolesPage')
        },
        {
          path:'/rights',
          component:()=>import('../pages/rights/RightsPage')
        },
        {
          path:'/goods',
          component:()=>import('../pages/goods/GoodsPage')
        },
        {
          path:'/goods',
          component:()=>import('../pages/goods/GoodsPage')
        },
        {
          path:'/params',
          component:()=>import('../pages/params/ParamsPage')
        },
        {
          path:'/categories',
          component:()=>import('../pages/categories/CategoriesPage')
        },
        {
          path:'/orders',
          component:()=>import('../pages/orders/OrdersPage')
        },
        {
          path:'/reports',
          component:()=>import('../pages/reports/ReportsPage')
        }

      ]
    }
  ],
  mode:'history',

})
// 导航守卫
router.beforeEach((to,from,next)=>{
  if (to.path==='/login') return next()
  const user=window.sessionStorage.getItem('user')
  if (!user) return next('/login')
  next()
})
export default router
