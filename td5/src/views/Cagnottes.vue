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
      this.cagnottes = response.data
    } catch (e) {
      this.error = 'Impossible de charger les cagnottes'
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

    <!-- BOUTON CREATION -->
    <button>
      <router-link to="/cagnottes/new">
            Créer une nouvelle cagnotte
      </router-link>
    </button>

    <p v-if="error" style="color:red">
      {{ error }}
    </p>

    <!-- CAGNOTTES ACTIVES -->
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

    <!-- LIEN POUR AFFICHER LES TERMINEES -->
    <p>
      <a href="#" @click.prevent="showFinished = !showFinished">
        {{ showFinished
          ? 'Masquer les cagnottes terminées'
          : 'Voir les cagnottes terminées'
        }}
      </a>
    </p>

    <!-- CAGNOTTES TERMINEES -->
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
