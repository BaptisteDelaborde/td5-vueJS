<template>
  <div class="donations-container">

    <div class="form-card">
      <h3>{{ editingId ? 'Modifier la donation' : 'Ajouter une donation' }}</h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <input
            type="text"
            v-model="form.donator"
            placeholder="Nom du donateur"
            ref="donatorInput"
            v-focus
          >
          <input
            type="number"
            v-model.number="form.amount"
            placeholder="Montant (€)"
            required
            step="0.01"
          >
        </div>
        <div class="form-row">
          <input
            type="text"
            v-model="form.comment"
            placeholder="Petit commentaire..."
            class="full-width"
          >
        </div>

        <div class="form-actions">
          <button type="submit" :class="editingId ? 'btn-warning' : 'btn-success'">
            {{ editingId ? 'Mettre à jour' : 'Donner !' }}
          </button>
          <button v-if="editingId" type="button" @click="cancelEdit">Annuler</button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <hr>

    <div class="list-container">
      <h3>Derniers dons</h3>
      <div v-if="donations.length === 0">Aucune donation pour le moment.</div>

      <TransitionGroup name="list" tag="div">
        <Donation
          v-for="donation in sortedDonations"
          :key="donation.id"
          :donation="donation"
          @edit="startEdit"
          @delete="deleteDonation"
        />
      </TransitionGroup>
    </div>

  </div>
</template>

<script>
import Donation from '../components/Donations.vue';

export default {
  components: { Donation },
  props: ['cagnotte'],
  data() {
    return {
      donations: [],
      error: null,
      editingId: null,
      form: {
        donator: '',
        amount: '',
        comment: ''
      }
    }
  },
  computed: {
    sortedDonations() {
      return [...this.donations].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  mounted() {
    this.fetchDonations();
  },
  methods: {
    fetchDonations() {
      if(!this.cagnotte?.id) return;
      this.$api.get(`/api/cagnottes/${this.cagnotte.id}/donations`)
        .then(res => this.donations = res.data)
        .catch(() => this.error = "Impossible de charger les donations.");
    },
    handleSubmit() {
      if (this.editingId) {
        this.updateDonation();
      } else {
        this.createDonation();
      }
    },
    createDonation() {
      this.error = null;
      this.$api.post(`/api/cagnottes/${this.cagnotte.id}/donations`, this.form)
        .then(res => {
          this.donations.unshift(res.data);
          this.resetForm();
          this.$nextTick(() => this.$refs.donatorInput.focus());
        })
        .catch(err => {
          console.error(err);
          this.error = "Erreur lors de la création.";
        });
    },
    startEdit(donation) {
      this.editingId = donation.id;
      this.form.donator = donation.donator;
      this.form.amount = donation.amount;
      this.form.comment = donation.comment;
      this.$nextTick(() => this.$refs.donatorInput.focus());
    },
    updateDonation() {
      this.error = null;
      this.$api.put(`/api/cagnottes/${this.cagnotte.id}/donations/${this.editingId}`, this.form)
        .then(res => {
          const index = this.donations.findIndex(d => d.id === this.editingId);
          if (index !== -1) {
            this.donations[index] = res.data;
          }
          this.resetForm();
        })
        .catch(err => {
          console.error(err);
          this.error = "Erreur lors de la modification.";
        });
    },
    deleteDonation(donation) {
      if(confirm("Supprimer ce don ?")) {
        this.$api.delete(`/api/cagnottes/${this.cagnotte.id}/donations/${donation.id}`)
          .then(() => {
            this.donations = this.donations.filter(d => d.id !== donation.id);
          })
          .catch(() => alert("Erreur suppression"));
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editingId = null;
      this.form = { donator: '', amount: '', comment: '' };
      this.error = null;
    }
  }
}
</script>

