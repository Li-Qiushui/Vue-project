import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2330610-0-default'

Vue.config.productionTip = false
Vue.prototype.axios = Axios
Vue.use(Element)
new Vue({
	render: h => h(App),
}).$mount('#app')
