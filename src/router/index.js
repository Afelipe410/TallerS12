import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import ClientesView from '../views/ClientesView.vue'
import MercanciasView from '../views/MercanciasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/acercade',
      name: 'Acerca de',
      component: AboutView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesView
    },
    {
      path: '/mercancias',
      name: 'mercancias',
      component: MercanciasView
    }
  ]
})

export default router