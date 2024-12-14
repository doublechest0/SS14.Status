<template>

    <div class="terminal-header">
      <span class="terminal-title">
        <img
          class="terminal-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :src="`${icon}`"
        >
        {{ title }}
      </span>
    </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

.terminal-header {
  background-color: #202425;
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.terminal-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-icon {
  color: #006adc;
}

</style>
