<script>
import Cagnotte from '@/components/Cagnotte.vue'

export default {
  name: 'Cagnottes',

  components: {
    Cagnotte
  },

  data() {
    return {
      cagnottes: [],
      showFinished: false,
      error: null
    }
  },

  async mounted() {
    try {
      const response = await this.$api.get('/api/cagnottes')

      this.cagnottes = await Promise.all(
        response.data.map(async (c) => {
          const donationsRes = await this.$api.get(
            `/api/cagnottes/${c.id}/donations`
          )

          return {
            ...c,
            donations: donationsRes.data
          }
        })
      )
    } catch (e) {
      this.error = 'Impossible de charger les cagnottes'
      console.error(e)
    }
  },

  computed: {
    today() {
      return new Date()
    },

    activeCagnottes() {
      return this.cagnottes
        .filter(c => {
          const notExpired = new Date(c.end_date) >= this.today
          const progress = this.cagnotteProgress(c)
          return notExpired && progress < 100
        })
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
    },

    finishedCagnottes() {
      return this.cagnottes
        .filter(c => {
          const expired = new Date(c.end_date) < this.today
          const progress = this.cagnotteProgress(c)
          return expired || progress >= 100
        })
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
    }
  },

  methods: {
    cagnotteProgress(c) {
      if (!c.donations || c.donations.length === 0) return 0
      if (!c.goal || c.goal <= 0) return 0

      const total = c.donations.reduce(
        (sum, d) => sum + Number(d.amount),
        0
      )

      return Math.round((total / Number(c.goal)) * 100)
    }
  }
}
</script>

<template>
  <div>
    <h1>Liste des cagnottes</h1>

    <button>
      <router-link to="/cagnottes/new">
        Créer une nouvelle cagnotte
      </router-link>
    </button>

    <p v-if="error" style="color:red">
      {{ error }}
    </p>

    <section>
      <h2>Cagnottes en cours</h2>

      <p v-if="activeCagnottes.length === 0">
        Aucune cagnotte active
      </p>

      <router-link
        v-for="c in activeCagnottes"
        :key="c.id"
        :to="`/cagnottes/${c.id}`"
        class="cagnotte-link"
      >
        <Cagnotte :cagnotte="c" />
      </router-link>
    </section>

    <p>
      <a href="#" @click.prevent="showFinished = !showFinished">
        {{ showFinished
          ? 'Masquer les cagnottes terminées'
          : 'Voir les cagnottes terminées'
        }}
      </a>
    </p>

    <section v-if="showFinished">
      <h2>Cagnottes terminées</h2>

      <p v-if="finishedCagnottes.length === 0">
        Aucune cagnotte terminée
      </p>

      <router-link
        v-for="c in finishedCagnottes"
        :key="c.id"
        :to="`/cagnottes/${c.id}`"
        class="cagnotte-link finished"
      >
        <Cagnotte :cagnotte="c" />
      </router-link>
    </section>
  </div>
</template>
