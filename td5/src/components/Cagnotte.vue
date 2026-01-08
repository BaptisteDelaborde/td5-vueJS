<script>
export default {
  name: 'Cagnotte',

  props: {
    cagnotte: {
      type: Object,
      required: true
    }
  },

  computed: {
    // Montant collecté (0 si absent)
    currentAmount() {
      return Number(this.cagnotte.current_amount ?? 0)
    },

    // Objectif (sécurisé)
    goal() {
      return Number(this.cagnotte.goal ?? 0)
    },

    // Pourcentage d’avancement
    progress() {
      if (this.goal <= 0) return 0

      return Math.min(
        100,
        Math.round((this.currentAmount / this.goal) * 100)
      )
    },

    // Couleur selon l’urgence
    urgencyClass() {
      const today = new Date()
      const end = new Date(this.cagnotte.end_date)
      const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24))

      if (diffDays > 30) return 'blue'
      if (diffDays >= 5) return 'orange'
      return 'red'
    }
  }
}
</script>

<template>
  <div class="cagnotte" :class="urgencyClass">
    <h3>{{ cagnotte.name }}</h3>

    <p>
      <strong>Date de fin :</strong>
      {{ dbDateToFr(cagnotte.end_date) }}
    </p>

    <p>
      {{ cutText(cagnotte.description, 40) }}
    </p>

    <div class="progress-bar">
      <div
        class="progress"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <p>{{ progress }} % atteint</p>
  </div>
</template>
