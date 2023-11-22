import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Index from '../views/Index'
import Home from '../views/Home'

import ClassStatistic from '../views/class_statistic/ClassStatistic'
import ClassSchedule from '../views/class_schedule/ClassSchedule'

import AllDocument from '../views/document_center/AllDocument.vue'
import OwnDocument from '../views/document_center/OwnDocument.vue'

import LiveClassList from '../views/class_monitor/LiveClassList.vue'
import LiveClassDetail from '../views/class_monitor/LiveClassDetail.vue'

import VideoList from '../views/video_class/VideoList.vue'

import SystemManage from '../views/systemManage/SystemManage.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: Login
    },
    { path: '/index', name: 'Index', component: Index },
    {
        path:'/home',
        name:'Home',
        component:Home,
        children:[
            {
                path:'class-statistic',
                component:ClassStatistic
            },
            {
                path:'class-schedule',
                component:ClassSchedule
            },
            {
                path:'all-document',
                component:AllDocument
            },
            {
                path:'own-document',
                component:OwnDocument
            },
            {
                path:'live-classes',
                component:LiveClassList
            },
            {
                path:'live-classes-detail',
                component:LiveClassDetail
            },
            {
                path:'video-list',
                component:VideoList
            },
            {
                path:'system-manage',
                component:SystemManage
            },
        ]
    }
]

const router = new VueRouter({
    routes
})
// 修改tag标签重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location){
    return originalPush.call(this, location).catch(err => err)
}
export default router