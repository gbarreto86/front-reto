import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AddCourse from './components/AddCourse.vue';
import Courses from './components/Courses.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const routes = [
  {
        name: 'add',
        path: '/add',
        component: AddCourse
  },
  {
    name: 'index',
    path: '/',
    component: Courses
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
