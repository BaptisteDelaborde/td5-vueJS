<template>
  <div v-if="cagnotte">
    <div class="header-cagnotte">
      <h1>{{ cagnotte.name }}</h1>
      <div class="actions">
        <router-link to="/" class="btn-retour">Retour</router-link>
        <router-link :to="`/cagnottes/${cagnotte.id}/edit`" class="btn btn-modifier">Modifier</router-link>
        <button @click="deleteCagnotte" class="btn btn-danger">Supprimer</button>
      </div>
    </div>

    <nav class="tabs">
      <router-link :to="`/cagnottes/${cagnotte.id}/infos`" active-class="active">Infos</router-link>
      <router-link :to="`/cagnottes/${cagnotte.id}/donations`" active-class="active">Donations</router-link>
    </nav>

    <div class="tab-content">
      <router-view :cagnotte="cagnotte"></router-view>
    </div>
  </div>
  <div v-else>
    Chargement...
  </div>
</template>

<script>
export default {
  data() {
    return {
      cagnotte: null
    }
  },
  mounted() {
    this.fetchCagnotte();
  },
  methods: {
    fetchCagnotte() {
      const id = this.$route.params.id;
      this.$api.get(`/api/cagnottes/${id}`)
        .then(response => {
          this.cagnotte = response.data;
        })
        .catch(error => {
          alert("Erreur lors du chargement de la cagnotte");
          console.error(error);
        });
    },
    deleteCagnotte() {
      if(confirm("Voulez-vous vraiment supprimer cette cagnotte ?")) {
        // AJOUT DE /api ICI
        this.$api.delete(`/api/cagnottes/${this.cagnotte.id}`)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.error(error);
            alert("Impossible de supprimer la cagnotte");
          });
      }
    }
  }
}
</script>

<style scoped>
.header-cagnotte {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.tabs a {
  text-decoration: none;
  padding: 10px 20px;
  background: #f0f0f0;
  color: #333;
  border-radius: 5px 5px 0 0;
}
.tabs a.active {
  background: #42b883;
  color: white;
  font-weight: bold;
}
.btn-danger {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;

}
.btn-retour {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 10px;
  background-color: #f0f0f0;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.btn-retour:hover {
  background-color: #e0e0e0;
}

.btn-modifier {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 10px;
  background-color: mediumseagreen;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.btn-modifier:hover {
  background-color: lightgreen;
}
</style>
