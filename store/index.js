import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		userinfo:[]
	},
	mutations:{
		getUser(state,data){
			state.userinfo = data
		}
	}
})
export default store