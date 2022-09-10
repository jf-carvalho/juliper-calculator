<template>
    <div class="w-full p-5 border-b-2 border-b-white flex justify-between">
        <div class="w-3/5 flex gap-10 items-center">
            <div>
                <router-link to="/">Home</router-link>
            </div>
            <div>
                <router-link to="/outflows">Outflows</router-link>
            </div>
        </div>
        <div class="w-2/5 text-right flex justify-end items-center">
            <div v-if="server_status">
                SERVER STATUS:
                <span v-if="loading">
                    checking...
                </span>
                <span v-else>
                    <span class="font-black text-green-500">OK</span>
                </span>
            </div>
            <div v-else>
                SERVER STATUS:
                <span v-if="loading">
                    checking...
                </span>
                <span v-else>
                    <span class="font-black text-red-500">NOT RUNNING</span>
                </span>
            </div>
            <div class="w-40">
                <button class="rounded p-3 bg-gray-700" @click="check_server()">CHECK</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            server_status: false,
            loading: true
        }
    },
    methods: {
        check_server() {
            this.loading = true;

            setTimeout(() => {
                axios
                    .get('http://localhost:3010/api')
                    .then(response => {
                        this.server_status = true;
                        this.loading = false;
                        }
                    )
                    .catch(err => {
                        this.server_status = false;
                        this.loading = false;
                        }
                    )
            }, 2000);
        }
    },
    mounted() {
        this.check_server()
    }
}
</script>