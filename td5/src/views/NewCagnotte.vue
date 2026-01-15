<script>
export default {
  name: 'NewCagnotte',

  data() {
    return {
      name: '',
      description: '',
      endDate: '',
      goal: '',
      error: null,
      loading: false
    }
  },

  methods: {
    async createCagnotte() {
      this.error = null
      this.loading = true

      try {
        await this.$api.post('/api/cagnottes', {
          name: this.name,
          description: this.description,
          end_date: this.dateToDB(this.endDate), 
          goal: this.formatAmount(this.goal)
        })

        // retour à la liste
        this.$router.push('/')
      } catch (e) {
        this.error = 'Erreur lors de la création de la cagnotte'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Créer une cagnotte</h1>

    <form @submit.prevent="createCagnotte">
      <div>
        <label>Nom</label><br />
        <input
          type="text"
          v-model="name"
          v-focus
          required
        />
      </div>

      <div>
        <label>Description</label><br />
        <textarea
          v-model="description"
          required
        ></textarea>
      </div>

      <div>
        <label>Date limite</label><br />
        <input
          type="text"
          v-model="endDate"
          placeholder="DD/MM/YYYY"
          required
        />
      </div>

      <div>
        <label>Objectif (€)</label><br />
        <input type="number" v-model="goal" min="1" required />
      </div>

      <p v-if="error" style="color:red">
        {{ error }}
      </p>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Création...' : 'Créer' }}
      </button>
    </form>
  </div>
</template>
