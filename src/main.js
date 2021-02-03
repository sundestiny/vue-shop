import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.css'
import ElementUI  from 'element-ui'		//引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'	//全局引入css
Vue.use(ElementUI);	//注册ElementUI
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
