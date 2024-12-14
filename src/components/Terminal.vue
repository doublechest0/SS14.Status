<template>
<div class="card">
    <div class="terminal">
      <div class="buttons">
            <button class="delete" @click="close($event, index)">
                X
            </button>
        </div>
        <slot />
    </div>
</div>
</template>

<script>
export default {
  props: ["close"]
}
</script>

<style scoped>
.card {
    background-color: rgba(217, 217, 217, 0.18);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 600px;
}

.buttons {
    margin-left: 565px;
    position: absolute;
    justify-content: left;
}

.delete {
    background: #bd7678;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-top: 10px;
}
</style>
