import Vue from 'vue'
import Vuex from 'vuex'
import routers from '@/vuex/routers'
Vue.use(Vuex);

/* 1、state 在vuex 中存储数据 */
let state = {
    count:1,
    routers
}
/* 2、 mutations 在vuex 中放方法，用于改变state中的数据 */
let mutations = {
    incCount(){
        ++state.count
    }
}
let store = new Vuex.Store({
    state,
    mutations
})
console.log(store)
export default store;