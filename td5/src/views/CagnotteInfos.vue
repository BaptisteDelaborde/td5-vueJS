<template>
  <div class="cagnotte-infos">
    <h3>Informations générales</h3>
    <p>{{ cagnotte.description }}</p>

    <div class="stats-grid">
      <div class="stat-item">
        <strong>Date limite :</strong> {{ dbDateToFr(cagnotte.end_date) }}
        <br>
        <span :class="daysRemaining < 5 ? 'text-red' : 'text-blue'">
                (Reste {{ daysRemaining }} jours)
            </span>
      </div>

      <div class="stat-item">
        <strong>Objectif :</strong> {{ formatAmount(cagnotte.goal) }}
      </div>

      <div class="stat-item">
        <strong>Montant actuel :</strong> {{ formatAmount(currentAmount) }}
      </div>

      <div class="stat-item">
        <strong>Reste à financer :</strong> {{ formatAmount(remainingAmount) }}
      </div>

      <div class="stat-item">
        <strong>Progression :</strong> {{ progressPercentage }}%
        <progress :value="currentAmount" :max="cagnotte.goal"></progress>
      </div>

      <div class="stat-item">
        <strong>Nombre de dons :</strong> {{ donations.length }}
      </div>

      <div class="stat-item">
        <strong>Don moyen :</strong> {{ formatAmount(averageDonation) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cagnotte'],
  data() {
    return {
      donations: []
    }
  },
  computed: {
    daysRemaining() {
      const end = new Date(this.cagnotte.end_date);
      const now = new Date();
      const diffTime = end - now;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    currentAmount() {
      return this.donations.reduce((acc, don) => acc + don.amount, 0);
    },
    remainingAmount() {
      const reste = this.cagnotte.goal - this.currentAmount;
      return reste > 0 ? reste : 0;
    },
    progressPercentage() {
      if(this.cagnotte.goal === 0) return 0;
      const p = (this.currentAmount / this.cagnotte.goal) * 100;
      return p.toFixed(2);
    },
    averageDonation() {
      if (this.donations.length === 0) return 0;
      return this.currentAmount / this.donations.length;
    }
  },
  mounted() {
    this.fetchDonations();
  },
  watch: {
    'cagnotte.id': function() {
      this.fetchDonations();
    }
  },
  methods: {
    fetchDonations() {
      if(!this.cagnotte || !this.cagnotte.id) return;
      this.$api.get(`/api/cagnottes/${this.cagnotte.id}/donations`)
        .then(response => {
          this.donations = response.data;
        })
        .catch(err => console.error(err));
    }
  }
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.stat-item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.text-red { color: red; font-weight: bold; }
.text-blue { color: blue; }
progress { width: 100%; }
</style>
