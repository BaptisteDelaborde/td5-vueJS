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

<style scoped>
.donation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.top-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.amount {
  font-weight: bold;
  color: #42b883;
}

.meta {
  color: #888;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.comment {
  font-style: italic;
  color: #555;
  margin: 0;
}

.actions {
  display: flex;
  gap: 5px;
}

.btn-small {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
}
.btn-delete:hover {
  background: #ffcccc;
  border-color: #ff9999;
}
</style>
