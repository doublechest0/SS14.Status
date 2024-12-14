<template>

<div class="main">

<ServerStatus class="terminal" v-for="(server, index) in servers" :server="server" :close="rem_server"/>

<div class="container">
  <div class="vertical-center">
    <button class="button_plus" @click="add_server()">+</button>
  </div>
</div>

</div>

</template>

<script>
import ServerStatus from './components/ServerStatus.vue'

export default {
    data() {
      return {
        servers: []
      }
    },
    components: {
        ServerStatus
    },
    // computed: {
    //   tags() {
    //     return this.serverStatus.tags.map(el => `[${el}]`)
    //   }
    // },
    mounted() {
      this.servers = this.$cookies.get("servers") ?? []
    },
    methods: {
        add_server() {
          this.servers.push(``)
          this.save()
        },
        rem_server(index) {
          this.servers.splice(index, 1)
          this.save()
        },
        save() {
          this.$cookies.set("servers", this.servers)
        }
      }
}
</script>

<style scoped>

.main {
  padding-top: 100px;
  padding-bottom: 100px;
}

.terminal {
  margin-top: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_plus {
  align-content: center;
  margin-top: 10px;
  width: 35px;
  height: 35px;
  background: #202425;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid #202425;
  color: #006adc;

  /* Mittig */
  top: 50%;
  left: 50%;
}

.button_plus:after {
  content: '';
  transform: translate(-50%, -50%);
  height: 4px;
  width: 50%;
  background: #006adc;
  top: 50%;
  left: 50%;
}

.button_plus:before {
  content: '';
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #006adc;
  height: 50%;
  width: 4px;
}

.button_plus:hover:before,
.button_plus:hover:after {
  background: #006adc;
  transition: 0.2s;
}

.button_plus:hover {
  background-color: #006adc;
  color: #202425;
  transition: 0.2s;
}

</style>
