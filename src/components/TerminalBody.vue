<template>

<div class="terminal-body">
    <slot />
</div>

</template>

<script>

</script>

<style scoped>

.terminal-body {
  background-color: #202425;
  color: #ffffff;
  padding: 15px;
  font-family: "Courier New", Courier, monospace;
}

.prompt {
  color: #ffffff;
  margin-right: 10px;
}

.subfield {
  color: rgba(255, 255, 255, 0.5);
  margin-right: 10px;
  margin-left: 10px;
}

.error {
  color: #bd7678;
  margin-right: 10px;
}

</style>
