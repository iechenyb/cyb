// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HellWorld from './components/HelloWorld'
import UsePage from './components/UsePage'
import Home from './components/Home'
import AAA from './components/aaa'
import axios from "axios"
import VueResource from 'vue-resource'


//axios.defaults.baseURL = 'http://localhost';//本地服务默认地址
//axios.defaults.baseURL = 'http://192.168.16.211';//本地服务
// axios.defaults.baseURL = 'http://192.168.108.224:8083';//直接访问服务
axios.defaults.baseURL = "http://192.168.16.211:8094/apis";//nginx代理 无需登录
//axios.defaults.baseURL = "http://192.168.16.211:8094";//nginx代理zuul，需要登录，一直报登录超时！！！！！
Vue.prototype.$axios = axios;
Vue.prototype.getUrl = function(uri){ return axios.defaults.baseURL+uri;}
Vue.prototype.$axios.defaults.baseURL=axios.defaults.baseURL;
Vue.config.productionTip = false;
Vue.use(VueResource);//读取静态文件
/*import pageination from 'vue_pageination';
Vue.use(pageination);*/
/* eslint-disable no-new */
const NotFound = { template: '<p>Page not found</p>' }
// const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }
const routes = {
  '/': Home,// HomeApp
  '/aaa':AAA,
  '/about': About, // 引入静态模板
  '/hello': HellWorld ,// 引入自定义模板
  '/page':UsePage
}
new Vue({
  el: '#app', // 读取App中id=app的元素进行渲染
  data: {
    currentRoute: window.location.pathname
  },components: { App },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
