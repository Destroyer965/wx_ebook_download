import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './static/fonts/iconfont-weapp-icon.css'
import './static/fonts/iconfont.css'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store 
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
