<script>
export default {
  name: 'App',
  data() {
    return {
      todayDb: '2026-01-08',
      todayDbHour: '2026-01-08 14:30:00',
      amount: 1540.45,
      longText:
        'Ceci est un texte volontairement très long afin de démontrer le fonctionnement de la méthode cutText fournie par le plugin tools.',
      apiStatus: 'En attente...',
    }
  },
  async mounted() {
    try {
      await this.$api.get('/api/ping')
      this.apiStatus = 'API accessible'
    } catch (e) {
      this.apiStatus = 'Erreur API'
    }
  },
}
</script>

<template>
  <div class="app">
    <h1>TD5 – VueJS Plugins / Mixins / Directives</h1>

    <section>
      <h2>Test API</h2>
      <p>{{ apiStatus }}</p>
    </section>

    <section>
      <h2>Dates</h2>
      <ul>
        <li>Date DB → FR : {{ dbDateToFr(todayDb) }}</li>
        <li>Date + heure DB → FR : {{ dbDateHourToFr(todayDbHour) }}</li>
        <li>Date FR → DB : {{ dateToDB('08/01/2026') }}</li>
      </ul>
    </section>

    <section>
      <h2>Montant</h2>
      <p>{{ formatAmount(amount) }}</p>
    </section>

    <section>
      <h2>Texte coupé</h2>
      <p>{{ cutText(longText) }}</p>
    </section>

    <section>
      <h2>Directive focus</h2>
      <input v-focus placeholder="Le focus est automatique" />
    </section>

    <router-view />
  </div>
</template>
