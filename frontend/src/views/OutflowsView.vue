<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <Navbar></Navbar>

    <main class="h-screen border-box p-5">
        <div class="grid grid-cols-2">
            <div class="row">
                <div class="grid grid-cols-4 gap-3 items-end">
                    <div class="col-span-3">
                        <label for="outflow_name">Create outflow</label>
                        <input tabindex="1" v-model="name" class="py-2 my-3 px-3 rounded w-full text-gray-900"
                            placeholder="Example: january" type="text" />
                    </div>
                    <div class="my-2">
                        <button class="rounded p-3 bg-gray-700" @click="save()">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-16 w-full pb-24">

            <div class="overflow-x-auto relative">
                <table class="w-full text-left">
                    <thead class="uppercase">
                        <tr>
                            <th scope="col" class="py-3">
                                Outflow name
                            </th>
                            <th scope="col" class="py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b" v-for="outflow in outflows">
                            <th scope="row" class="py-4 whitespace-nowrap text-lg">
                                {{ outflow.name }}
                            </th>
                            <td class="py-4 flex gap-3 jsutify-center">
                                <button @click="edit(outflow)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                                <button @click="deleteOutflow(outflow)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </main>

    <TransitionRoot as="template" :show="showModal">
        <Dialog as="div" class="relative z-10" @close="showModal = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                            Edit outflow
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <input tabindex="1" v-model="outflowBeingEditted.name"
                                                class="py-2 px-3 rounded w-full text-gray-900 focus:outline-none border-gray-300 border-2"
                                                type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    @click="update()">Save</button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    @click="showModal = false" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
    data() {
        return {
            outflows: [],
            name: null,
            showModal: false,
            outflowBeingEditted: null,
            outflowBeingDeleted: null,
        }
    },
    methods: {
        loadOutflows() {
            axios
                .get('http://localhost:3010/api/outflows')
                .then(response => {
                    this.outflows = response.data;
                })
        },
        save() {
            axios
                .post('http://localhost:3010/api/outflows', {
                    name: this.name
                })
                .then(response => {
                    this.loadOutflows();
                    this.name = null

                    Swal.fire({
                        title: 'Done!',
                        text: 'Outflow successfully created',
                        icon: 'success',
                        confirmButtonText: 'Yay!'
                    })
                })
                .catch(err => {
                    let html = '';

                    if (err.response.data.errors && err.response.data.errors.length > 0) {
                        err.response.data.errors.forEach(error => {
                            html += '<div>' + error.msg + '</div>'
                        });
                    }

                    Swal.fire({
                        title: 'Error!',
                        html: html,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
        },
        edit(outflow) {
            this.outflowBeingEditted = outflow;
            this.showModal = true;
        },
        update() {
            axios
                .patch('http://localhost:3010/api/outflows/' + this.outflowBeingEditted._id, {
                    name: this.outflowBeingEditted.name
                })
                .then(response => {
                    this.loadOutflows();

                    this.showModal = false;

                    Swal.fire({
                        title: 'Done!',
                        text: 'Outflow successfully updated',
                        icon: 'success',
                        confirmButtonText: 'Yay!'
                    })


                })
                .catch(err => {
                    let html = '';

                    if (err.response.data.errors && err.response.data.errors.length > 0) {
                        err.response.data.errors.forEach(error => {
                            html += '<div>' + error.msg + '</div>'
                        });
                    }

                    Swal.fire({
                        title: 'Error!',
                        html: html,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
        },
        deleteOutflow(outflow) {
            this.outflowBeingDeleted = outflow;

            Swal.fire({
                title: 'Do you realy want to delete this item?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete('http://localhost:3010/api/outflows/' + this.outflowBeingDeleted._id)
                        .then(response => {
                            this.loadOutflows();

                            Swal.fire({
                                title: 'Done!',
                                text: 'Outflow successfully deleted',
                                icon: 'success',
                                confirmButtonText: 'Yay!'
                            })


                        })
                        .catch(err => {
                            let html = '';

                            if (err.response.data.errors && err.response.data.errors.length > 0) {
                                err.response.data.errors.forEach(error => {
                                    html += '<div>' + error.msg + '</div>'
                                });
                            }

                            Swal.fire({
                                title: 'Error!',
                                html: html,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                        })
                }
            })
        }
    },
    mounted() {
        this.loadOutflows();
    }
}
</script>