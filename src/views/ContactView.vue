<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <!-- Card -->
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1 space-y-6">
                    <div class="flex gap-4">
                        <div class="h-10 w-10 shrink-0 text-primary bg-secondary-500 flex items-center justify-center rounded-full text-white">
                            <PhPhone :size="22" />
                        </div>
                        <div>
                            <h3 class="text-md sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Call to Us</h3>
                            <p class="text-gray-500 text-sm">We are available 24/7, 7 days a week.</p>
                            <p class="text-gray-800 mt-1 sm:mt-2 font-medium">Phone: +639544005171</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="h-10 w-10 shrink-0 text-primary bg-secondary-500 flex items-center justify-center rounded-full text-white">
                            <PhEnvelopeSimple :size="22" />
                        </div>
                        <div>
                            <h3 class="text-md sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Write to Us</h3>
                            <p class="text-gray-500 text-sm">Fill out our form and we’ll contact you within 24 hours.</p>
                            <p class="text-gray-800 font-medium mt-1 sm:mt-2">Email: support@exclusive.com</p>
                        </div>
                    </div>
                </div>

                <form class="flex-1 space-y-4" @submit.prevent="submit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            v-model="form.name"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            :class="[loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            :disabled="loading"
                            class="md:col-span-2 text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                        <input
                            v-model="form.email"
                            id="email"
                            type="text"
                            placeholder="Your Email"
                            :class="[loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            :disabled="loading"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                        <input
                            v-model="form.phone"
                            id="phone"
                            type="text"
                            placeholder="Your Phone"
                            :class="[loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            :disabled="loading"
                            class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <!-- Message -->
                    <textarea 
                        v-model="form.message"
                        name="message" 
                        rows="6" 
                        placeholder="Your Message"
                        :class="[loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                        :disabled="loading"
                        class="text-sm sm:text-base placeholder:text-sm placeholder-gray-400 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-ou"
                    >
                    </textarea>

                    <!-- Submit -->
                    <BaseButton
                        :disabled="loading"
                        class="w-full sm:w-max"
                    >
                        Send Massage
                    </BaseButton>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'

import BaseButton from '@/components/BaseButton.vue'

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submit = async() => {
    if (!form.value.name || !form.value.email || !form.value.message) {
        Swal.fire({ icon: 'warning', title: 'Missing fields', text: 'Name, email and message are required.' })
        return
    }

    try {
        loading.value = true

        const { error } = await supabase
        .from('contact_messages')
        .insert({
            name:    form.value.name,
            email:   form.value.email,
            phone:   form.value.phone || null,
            message: form.value.message
        })

        if (error) throw error

        Swal.fire({ icon: 'success', title: 'Thank you!', text: 'Your message has been sent.' })
        form.value = { name: '', email: '', phone: '', message: '' }  // reset form
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Something went wrong', text: err.message })
    } finally {
        loading.value = false
    }
}
</script>