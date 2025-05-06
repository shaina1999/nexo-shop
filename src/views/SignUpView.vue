<template>
    <AuthLayout :title="'Create an account'" :subTitle="'Enter your details to get started with your new account.'">
        <form @submit.prevent="login">
            <div class="mb-10">
                <BaseAuthInput 
                    :type="'text'" 
                    :placeholder="'Email or Phone Number'" 
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
            <div class="mb-10">
                <BaseAuthInput 
                    :type="'password'" 
                    :placeholder="'Password'" 
                    v-model="password"
                    @update:model-value="passwordErrorMsg = ''"
                />
                <span 
                    class="text-red-500 flex" 
                    :class="{ 'mt-1' : passwordErrorMsg.length, 'mt-0' : !passwordErrorMsg.length }"
                >
                    {{ passwordErrorMsg }}
                </span>
            </div>
            <div class="w-full flex items-center justify-between flex-col lg:flex-row gap-y-6">
                <BaseButton class="w-full lg:w-max">Log In</BaseButton>
                <RouterLink 
                    to="/forgot-password" 
                    class="text-secondary-500 text-base hover:underline transition-colors duration-300 ease-in-out underline-offset-6"
                >
                    Forgot Password?
                </RouterLink>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import AuthLayout from '@/components/AuthLayout.vue'

const email = ref('')
const password = ref('')
const emailErrorMsg = ref('')
const passwordErrorMsg = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const numberRegex = /^[0-9]+$/
const isEmail = computed(() => !numberRegex.test(email.value))

const login = () => {
    const hasError = ref(false)
    hasError.value = false

    if (!email.value) {
        emailErrorMsg.value = 'Email or Phone Number is required.'
        hasError.value = true
    } else if (isEmail.value && !emailRegex.test(email.value)) {
        emailErrorMsg.value = 'Please enter a valid email address.'
        hasError.value = true
    } else if (!isEmail.value && !/^[0-9]{11}$/.test(email.value)) {
        emailErrorMsg.value = 'Phone number must be exactly 11 digits.'
        hasError.value = true
    } else {
        emailErrorMsg.value = ''
    }

    if (!password.value) {
        passwordErrorMsg.value = 'Password is required.'
        hasError.value = true
    } else {
        passwordErrorMsg.value = ''
    }

    if (!hasError.value) {
        console.log('logging in....', hasError.value)
    }
}
</script>