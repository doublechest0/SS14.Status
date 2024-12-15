<template>
<Terminal :close="close">
    <TerminalHeader :title="title" icon="/SS14.Status/icon.png" />
    <TerminalBody>
        <CommandLine v-model:value="address" placeholder="ss14://example.com" v-bind:enter-function="request_server"><label class="prompt">address:</label></CommandLine>

        <div v-if="serverError == '' & serverInfo != '' & serverStatus !=''">
            <p class="subfield small">{{ `#${serverStatus.round_id} / ${serverStatus.map ?? `No map`} / ${round_start_time} - ${round_level}` }}</p>
            <details>
                <summary class="prompt"><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverStatus))"> status:</summary>
                <div class="subfield">

                    <details>
                        <summary><b>round:</b></summary>
                        <div class="subfield">
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(`#${serverStatus.round_id}`)"> id: #{{serverStatus.round_id}}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(round_level)"> run_level: {{ round_level }}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverStatus.preset)"> preset: {{serverStatus.preset}}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverStatus.map)"> map: {{serverStatus.map}}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg"  @click="copy_to_clipboard(round_start_time)"> round_start_time: {{ round_start_time }} </p>
                        </div>
                    </details>

                    <details>
                        <summary><b>special:</b></summary>
                        <div class="subfield">
                            <p>baby_jail {{this.serverStatus.baby_jail ? `enabled` : `disabled`}}</p>
                            <p>panic_bunker {{this.serverStatus.panic_bunker ? `enabled` : `disabled`}}</p>
                        </div>
                    </details>

                    <details>
                        <summary><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverStatus.tags))"> <b>tags:</b></summary>
                        <span v-for="tag in tags" class="subfield">{{ tag }}</span>
                    </details>
                </div>
            </details>

            <details>
                <summary class="prompt"><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverInfo))"> info:</summary>
                <div class="subfield">
                    <p v-if="!serverInfo.build.acz"><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.connect_address)"> connect_address: {{ serverInfo.connect_address }}</p>
                    <details>
                        <summary><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverInfo.auth))"> <b>auth:</b></summary>
                        <div class="subfield">
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.auth.mode)"> mode: {{ serverInfo.auth.mode }}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.auth.public_key)"> public_key: {{ serverInfo.auth.public_key }}</p>
                        </div>
                    </details>
                    <details>
                        <summary><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverInfo.build))"> <b>build:</b></summary>
                        <div class="subfield">
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.build.engine_version)"> engine_version: {{ serverInfo.build.engine_version }}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.build.fork_id)"> fork_id: {{ serverInfo.build.fork_id }}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.build.version)"> version: {{ serverInfo.build.version }}</p>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.build.hash)"> hash: {{ serverInfo.build.hash }}</p>
                            <a v-bind:href="serverInfo.build.download_url" v-if="!serverInfo.build.acz">download_build</a>
                            <p><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.build.manifest_hash)"> manifest_hash: {{ serverInfo.build.manifest_hash }}</p>
                            <a v-bind:href="serverInfo.build.manifest_url" v-if="!serverInfo.build.acz">show_manifest</a> <a v-bind:href="serverInfo.build.manifest_download_url" v-if="!serverInfo.build.acz">download_manifest</a>
                            <br v-if="!serverInfo.build.acz">
                            <br>
                            <b v-bind:class="serverInfo.build.acz ? `alert` : ``">{{ serverInfo.build.acz ? `Automatic Client Zip detected` : `Automatic Client Zip undetected` }}</b>
                        </div>
                    </details>
                    <details>
                        <summary><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(serverInfo.desc)"> <b>desc:</b></summary>
                        <div class="server-desc">
                            <textarea readonly="true" width="400" height="100" type="submit" v-bind:value="serverInfo.desc"></textarea>
                        </div>

                    </details>
                    <details>
                        <summary><img width="12" height="12" src="/SS14.Status/copy.svg" @click="copy_to_clipboard(JSON.stringify(serverInfo.links))"> <b>links:</b></summary>
                        <div class="subfield" v-for="link in serverInfo.links">
                            <a v-bind:href="link.url">{{link.name}}</a>
                        </div>
                    </details>
                </div>
            </details>
            <a :href="cdn" v-if="cdn != ``">robust-cdn</a> <a :href="serverStats" v-if="serverStats != ``">statistics</a> <b v-bind:class="serverPing <= 60 ? `success` : serverPing > 120 ? `error` : `alert`">{{ ping }}</b>
        </div>
        <span v-else-if="serverError != ''" class="error">{{ serverError }}</span>

    </TerminalBody>
</Terminal>
</template>

<script>
import Terminal from '../components/Terminal.vue'
import TerminalBody from '../components/TerminalBody.vue'
import TerminalHeader from '../components/TerminalHeader.vue'
import CommandLine from '../components/CommandLine.vue'
import axios from 'axios';

export default {
    mounted() {
        this.request_server()
    },
    data() {
        return {
            address: this.$props.server,
            serverStatus: "",
            serverInfo: "",
            serverError: "",
            serverStats: "",
            serverPing: "999",
        }
    },
    props: ["server", "close", "stats"],
    components: {
        Terminal,
        TerminalBody,
        TerminalHeader,
        CommandLine
    },
    computed: {
        round_start_time() {
            return `${Math.round(((Date.now() - Date.parse(this.serverStatus.round_start_time)) / 1000) / 60)} minutes ago`
        },
        round_level() {
            return this.serverStatus.run_level == 0 ? `PreRoundLobby` : this.serverStatus.run_level == 1? `InRound` : `PostRound`
        },
        tags() {
            return this.serverStatus.tags.map(el => `[${el}]`)
        },
        ping() {
            return `${this.serverPing}ms`
        },
        cdn() {
            
            return !this.serverInfo.build.acz ? this.serverInfo.build.download_url.split(`/version`)[0] : ``
        },
        url() {
            // CORS proxy & HTTP to HTTPS proxy
            return `https://thingproxy.freeboard.io/fetch/` + this.address.replace(`ss14s`, `https`).replace(`ss14`, `http`)
        },
        title() {
            return this.serverStatus.name == undefined ? `Space Station 14` : this.serverStatus.name + ` - ` + this.serverStatus.players + ` / ` + this.serverStatus.soft_max_players
        }
    },
    methods: {
        copy_to_clipboard(text) {
            navigator.clipboard.writeText(text);
        },
        async get_ping() {
            const start = Date.now()
            await axios.get(this.url + `/status`)
            const finish = Date.now()

            this.serverPing = (finish - start)
        },
        async search_stats() {
            var aTags = this.stats.getElementsByTagName("a");
            var searchText = this.serverStatus.name;
            var found = ``;

            for (var i = 0; i < aTags.length; i++) {
                if (aTags[i].textContent == searchText) {
                    found = aTags[i];
                    break;
                }
            }

            if (found != ``)
                this.serverStats = `https://ss14.madeline.sh${found.getAttribute("href")}`
        },
        request_server() {
            if (this.address == '')
                return

            if (!this.address.startsWith(`ss14://`) && !this.address.startsWith(`ss14s://`)) {
                this.serverError = `Error: Doesn't start with "ss14://" or "ss14s://"`
                return
            }

            this.serverStatus = ``
            this.serverInfo = ``
            this.serverError = ``

            axios.get(this.url + `/status`).then(res => this.serverStatus = res.data).catch(err => this.serverError = err)
            axios.get(this.url + `/info`).then(res => this.serverInfo = res.data).catch(err => this.serverError = err)
            this.get_ping()
            setTimeout(() => this.search_stats(), 2000)
        }
    }
}
</script>

<style scoped>
.server-desc {
    overflow-x: scroll;
    height: 300px;
    width: 550px;

    textarea {
        text-align: left;
        background: transparent;
        color: #fff;
        border: 0;
        resize: none;
        height: 300px;
        width: 1000px;
    }
}

img {
    cursor: pointer;
}

a:visited {
  color: #006adc;
  background-color: transparent;
  text-decoration: none;
}

.small {
    font-size: 14px;
}

.prompt {
    color: #ffffff;
    margin-right: 10px;
}

.terminal-body {
    background-color: #202425;
    color: #ffffff;
    padding: 15px;
    font-family: "Courier New", Courier, monospace;
}

.prompt {
    color: #ffffff;
    margin-right: 10px;
    cursor:default;
}

.subfield {
    cursor:default;
    color: rgba(255, 255, 255, 0.5);
    margin-right: 10px;
    margin-left: 10px;
}

.success {
    color: #76bd81;
    margin-right: 10px;
}

.alert {
    color: #bdbc76;
    margin-right: 10px;
}

.copy {
    justify-content: center;
}

.error {
    color: #bd7678;
    margin-right: 10px;
}
</style>
