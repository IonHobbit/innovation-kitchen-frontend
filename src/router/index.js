import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import InnovationKitchen from '../views/InnovationKitchen.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Innovation Kitchen',
    component: InnovationKitchen
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  routes
})

export default router
