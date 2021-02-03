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
      component: ()=>import('../pages/home/HomePage')
    }
  ],
  mode:'history',

})
router.beforeEach((to,from,next)=>{
  if (to.path==='/login') return next()
  const user=window.sessionStorage.getItem('user')
  if (!user) return next('/login')
  next()
})
export default router
