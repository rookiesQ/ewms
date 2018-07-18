import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/* 1、state 在vuex 中存储数据 */
let state = {
    count:1
}
/* 2、 mutations 在vuex 中放方法，用于改变state中的数据 */
let mutations = {
    incCount(){
        ++state.count
    }
}
const store = new Vuex.store({
    state,
    mutations
})

export default store;