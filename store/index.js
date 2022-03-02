import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		userinfo:uni.getStorageSync('userinfo')
	},
	mutations:{
		getUser(state,data){
			state.userinfo = data
		}

	},

	getters:{
		getUserInfo(state){
			return state.userinfo
		}
	}
})
export default store