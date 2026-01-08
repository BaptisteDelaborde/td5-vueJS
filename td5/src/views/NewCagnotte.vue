<script>
export default {
  name: 'NewCagnotte',
}
</script>

<template>
  <div>
    <h1>Créer une cagnotte</h1>

    <form>
      <div>
        <label>Nom de la cagnotte</label><br />
        <input
          type="text"
          placeholder="Nom de la cagnotte"
          v-focus
        />
      </div>

      <button type="submit">Créer</button>
    </form>
  </div>
</template>
