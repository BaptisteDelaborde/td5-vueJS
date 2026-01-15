<template>
  <div class="donation-item">
    <div class="info">
      <div class="top-row">
        <strong>{{ donation.donator || 'Anonyme' }}</strong>
        <span class="amount">{{ formatAmount(donation.amount) }}</span>
      </div>
      <div class="meta">
        <small>{{ dbDateHourToFr(donation.date) }}</small>
      </div>
      <p class="comment" v-if="donation.comment">
        "{{ cutText(donation.comment, 40) }}"
      </p>
    </div>

    <div class="actions">
      <button @click="$emit('edit', donation)" class="btn-small">✏️</button>
      <button @click="$emit('delete', donation)" class="btn-small btn-delete">🗑️</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    donation: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete']
}
</script>
