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
        .filter(c => new Date(c.end_date) >= this.today)
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
    },

    finishedCagnottes() {
      return this.cagnottes
        .filter(c => new Date(c.end_date) < this.today)
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
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
