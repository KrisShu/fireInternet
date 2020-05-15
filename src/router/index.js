import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( '../views/login.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

// todo 登录判定
router.beforeEach(function(to, from, next) {
  if(to.matched.some( m => m.meta.auth)){  // 对路由进行验证       
    if(localStorage.getItem('fireInterLogin')==1) { // 已经登陆      
      next()   // 正常跳转到你设置好的页面     
    }
    else{       
      // 未登录则跳转到登陆界面
      next({path:'/login'})
    } 
  }else{ 
    next() 
  } 
});

export default router
