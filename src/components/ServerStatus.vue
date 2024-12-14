<template>
<Terminal :close="close">
    <TerminalHeader :title="title" icon="/SS14.Status/icon.png" />
    <TerminalBody>
        <CommandLine v-model:value="address" placeholder="ss14://example.com" v-bind:enter-function="request_server"><label class="prompt">address:</label></CommandLine>

        <div v-if="serverError == '' & serverInfo != '' & serverStatus !=''">
            <details>
                <summary class="prompt">status:</summary>
                <div class="subfield">

                    <details>
                        <summary><b>round:</b></summary>
                        <div class="subfield">
                            <p>id: #{{serverStatus.round_id}}</p>
                            <p>run_level: {{serverStatus.run_level == 0 ? `PreRoundLobby` : serverStatus.run_level == 1? `InRound` : `PostRound`}}</p>
                            <p>preset: {{serverStatus.preset}}</p>
                            <p>map: {{serverStatus.map}}</p>
                            <p>round_start_time: {{Math.round(((Date.now() - Date.parse(this.serverStatus.round_start_time)) / 1000) / 60)}} minutes ago</p>
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
                        <summary><b>tags:</b></summary>
                        <span v-for="tag in tags" class="subfield">{{ tag }}</span>
                    </details>
                </div>
            </details>

            <details>
                <summary class="prompt">info:</summary>
                <div class="subfield">
                    <a v-bind:href="serverInfo.connect_address">connect_address</a>
                    <details>
                        <summary><b>auth:</b></summary>
                        <div class="subfield">
                            <p>mode: {{ serverInfo.auth.mode }}</p>
                            <p>public_key: <i @mouseup="copy_to_clipboard(serverInfo.auth.public_key)">copy</i></p>
                        </div>
                    </details>
                    <details>
                        <summary><b>build:</b></summary>
                        <div class="subfield">
                            <p>engine_version: {{ serverInfo.build.engine_version }}</p>
                            <p>fork_id: {{ serverInfo.build.fork_id }}</p>
                            <p>version: {{ serverInfo.build.version }}</p>
                            <a v-bind:href="serverInfo.build.download_url	">download_url</a>
                            <p>hash: <i @mouseup="copy_to_clipboard(serverInfo.build.hash)">copy</i></p>
                            <p>{{ serverInfo.build.acz ? `Automatic Client Zip detected` : `Automatic Client Zip undetected` }}</p>
                            <a v-bind:href="serverInfo.build.manifest_url">manifest</a> | <a v-bind:href="serverInfo.build.manifest_hash">manifest_hash</a> | <a v-bind:href="serverInfo.build.manifest_download_url">download</a>
                        </div>
                    </details>
                    <details>
                        <summary><b>desc:</b></summary>
                        <div class="server-desc">
                            <textarea readonly="true" width="400" height="100" type="submit" v-bind:value="serverInfo.desc"></textarea>
                        </div>

                    </details>
                    <details>
                        <summary><b>links:</b></summary>
                        <div class="subfield" v-for="link in serverInfo.links">
                            <a v-bind:href="link.url">{{link.name}}</a>
                        </div>
                    </details>
                </div>
            </details>
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
            serverError: ""
        }
    },
    props: ["server", "close"],
    components: {
        Terminal,
        TerminalBody,
        TerminalHeader,
        CommandLine
    },
    computed: {
        tags() {
            return this.serverStatus.tags.map(el => `[${el}]`)
        },
        title() {
            return this.serverStatus.name == undefined ? `Space Station 14` : this.serverStatus.name + ` - ` + this.serverStatus.players + ` / ` + this.serverStatus.soft_max_players
        }
    },
    methods: {
        copy_to_clipboard(text) {
            navigator.clipboard.writeText(text);
        },
        request_server() {
            if (this.address == '')
                return

            if(!this.address.startsWith(`ss14://`) && !this.address.startsWith(`ss14s://`))
            {
                this.serverError = `Error: Doesn't start with "ss14://" or "ss14s://"`
                return
            }
                

            this.serverStatus = ``
            this.serverInfo = ``
            this.serverError = ``

            axios.get(this.address.replace(`ss14s`, `https`).replace(`ss14`, `http`) + `/status`).then(res => this.serverStatus = res.data).catch(err => this.serverError = err)
            axios.get(this.address.replace(`ss14s`, `https`).replace(`ss14`, `http`) + `/info`).then(res => this.serverInfo = res.data).catch(err => this.serverError = err)
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
