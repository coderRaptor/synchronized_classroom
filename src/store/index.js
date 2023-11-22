import Vue from 'vue'
import Vuex from 'vuex'

import lessonInfo from './lessonInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        lessonInfo
    }
})