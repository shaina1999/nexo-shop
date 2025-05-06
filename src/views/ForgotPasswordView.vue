<template>
    <AuthLayout :title="'Forgot Password'" :subTitle="'Enter the email address you use to sign in, and we will send you a link to reset your password.'">
        <form @submit.prevent="login">
            <div class="mb-10">
                <BaseAuthInput 
                    :type="'text'" 
                    :placeholder="'Email Address'" 
                    v-model="email"
                    @update:model-value="emailErrorMsg = ''"
                />
                <span 
                    class="text-red-500 flex" 
                    :class="{ 'mt-1' : emailErrorMsg.length, 'mt-0' : !emailErrorMsg.length }"
                >
                    {{ emailErrorMsg }}
                </span>
            </div>
            <div class="w-full flex items-center justify-between flex-col lg:flex-row gap-y-6">
                <BaseButton class="w-full lg:w-max">Submit</BaseButton>
                <RouterLink 
                    to="/login" 
                    class="text-secondary-500 text-base hover:underline transition-colors duration-300 ease-in-out underline-offset-6"
                >
                    Back to login
                </RouterLink>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import AuthLayout from '@/components/AuthLayout.vue'

const email = ref('')
const emailErrorMsg = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const login = () => {
    const hasError = ref(false)
    hasError.value = false

    if (!email.value) {
        emailErrorMsg.value = 'Email Address is required.'
        hasError.value = true
    } else if (!emailRegex.test(email.value)) {
        emailErrorMsg.value = 'Please enter a valid email address.'
        hasError.value = true
    } else {
        emailErrorMsg.value = ''
    }

    if (!hasError.value) {
        console.log('submitting...')
    }
}
</script>