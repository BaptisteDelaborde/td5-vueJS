import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '../views/Cagnottes.vue'
import NewCagnotte from '../views/NewCagnotte.vue'
import CagnotteDetails from '../views/CagnotteDetails.vue'
import CagnotteInfos from '../views/CagnotteInfos.vue'
import EditCagnotte from '../views/EditCagnotte.vue'
import Donations from '../views/Donations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Cagnottes
    },
    {
      path: '/cagnottes/new',
      name: 'new-cagnotte',
      component: NewCagnotte
    },
    {
      path: '/cagnottes/:id/edit',
      name: 'edit-cagnotte',
      component: EditCagnotte
    },
    {
      path: '/cagnottes/:id',
      component: CagnotteDetails,
      children: [
        {
          path: '',
          redirect: to => `/cagnottes/${to.params.id}/infos`
        },
        {
          path: 'infos',
          name: 'cagnotte-infos',
          component: CagnotteInfos
        },
        {
          path: 'donations',
          name: 'cagnotte-donations',
          component: Donations
        }
      ]
    }
  ]
})

export default router
