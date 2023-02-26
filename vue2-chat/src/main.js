import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './script/Router.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/element-ui.css'
import GlobalFun from './script/Global.js'
import Bus from './script/Global.js'

Axios.defaults.baseURL = 'https://mock.apifox.cn/m1/2330610-0-default'
Vue.config.productionTip = false;
Vue.prototype.axios = Axios;
Vue.prototype.global = GlobalFun;

Vue.use(Element)

new Vue({
	render: h => h(App),
	router: router
}).$mount('#app')