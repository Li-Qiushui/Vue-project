//创建路由
import Login from '../components/Login'
import Playlist from '../components/Playlist'
import Songslists from '../components/Songslists'
import Play from '../components/Play'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/login',
            component:Login
        },
        {
            path:'/playlist',
            component:Playlist
        },
        {
            path:'/',
            component:Songslists
        },
        {
            path:'/Play',
            component:Play,
        }
    ]
})