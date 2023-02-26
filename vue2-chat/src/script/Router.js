import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'
import IndexHeader from '../components/IndexHeader.vue'
import IndexFooter from '../components/IndexFooter.vue'
import ChatHeader from '../components/ChatHeader.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			components: {
				default: Index,
				header: IndexHeader,
				footer: IndexFooter,
			},
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/Login',
			name: 'Login',
			components: {
				default: Login,
			}
		},
		{
			path: '/Chat',
			name: 'Chat',
			components: {
				default: Chat,
				header: ChatHeader,
			}
		}
	]
})
