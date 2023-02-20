import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueRouter from 'vue-router'
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios
Vue.prototype.ApiURl="https://service-hbmwkqmh-1306000875.cd.apigw.tencentcs.com/release";

Vue.use(ElementUI);
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
new Vue({
    el: '#app',
    render: h => h(App),
    router:router,
    data: {
        event: new Vue()
    }
});