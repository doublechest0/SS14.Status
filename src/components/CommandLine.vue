
<!-- v-model="address" -->
<template>
    <div class="command-line">
        <slot />
        <div class="input-wrapper">
            <input
            type="text"
            class="input-field"
            :value="value"
            @input="$emit('update:value', $event.target.value)"
            @keyup.enter="enterFunction"
            :placeholder="placeholder"
            />
        </div>
    </div>
</template>

<script>
export default {
    emits: [`update:value`],
    props: {
        value: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        enterFunction: {
            type: Function,
            required: false
        }
    },
}
</script>

<style scoped>

.command-line {
  display: flex;
  align-items: center;
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
}

.input-field {
  background-color: transparent;
  border: none;
  color: #006adc;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding-right: 10px;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-wrapper::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 15px;
  background-color: #ffffff;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

</style>
