<template>
  <div>
    <h2>Modifier la cagnotte</h2>
    <form @submit.prevent="updateCagnotte" v-if="cagnotte">
      <div>
        <label>Nom :</label>
        <input v-model="cagnotte.name" type="text" required v-focus>
      </div>
      <div>
        <label>Description :</label>
        <textarea v-model="cagnotte.description" required></textarea>
      </div>
      <div>
        <label>Objectif (€) :</label>
        <input v-model.number="cagnotte.goal" type="number" step="0.01" required>
      </div>
      <div>
        <label>Date de fin :</label>
        <input v-model="cagnotte.end_date" type="date" required>
      </div>

      <button type="submit">Enregistrer les modifications</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cagnotte: null,
      error: null
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.$api.get(`/api/cagnottes/${id}`)
      .then(res => {
        this.cagnotte = res.data;
      })
      .catch(err => {
        this.error = "Impossible de charger la cagnotte";
      });
  },
  methods: {
    updateCagnotte() {
      this.error = null;
      this.$api.put(`/api/cagnottes/${this.cagnotte.id}`, {
        name: this.cagnotte.name,
        description: this.cagnotte.description,
        goal: Number(this.cagnotte.goal),
        end_date: this.cagnotte.end_date
      })
        .then(() => {
          this.$router.push(`/cagnottes/${this.cagnotte.id}`);
        })
        .catch(err => {
          this.error = "Erreur lors de la modification.";
          console.error(err);
        });
    }
  }
}
</script>
