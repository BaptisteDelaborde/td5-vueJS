import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '../views/Cagnottes.vue'
import NewCagnotte from '../views/NewCagnotte.vue'

 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cagnottes',
      component: Cagnottes,
    },
    {
      path: '/cagnottes/new',
      name: 'newcagnotte',
      component: NewCagnotte,
    }
    
  ],
})

export default router
