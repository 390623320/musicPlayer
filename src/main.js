import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import 'lib-flexible/flexible.js'
import {Row,Col,Icon,Toast,Search} from 'vant'

Vue.use(Row).use(Col).use(Icon).use(Toast).use(Search)



Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
