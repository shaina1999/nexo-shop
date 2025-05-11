<template>
    <AuthLayout :title="'Log in'" :subTitle="'Enter your details below'">
        <form @submit.prevent="login">
            <div class="mb-6 md:mb-10">
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
            <div class="mb-6 md:mb-10">
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
            <div class="w-full flex items-center justify-between flex-col lg:flex-row gap-y-6 mb-6 md:mb-10">
                <BaseButton class="w-full lg:w-max">Log In</BaseButton>
                <RouterLink 
                    to="/forgot-password" 
                    class="text-secondary-500 text-base hover:underline transition-colors duration-300 ease-in-out underline-offset-6"
                >
                    Forgot Password?
                </RouterLink>
            </div>
            <div class="text-center lg:text-left">
                Don't have an account?
                <RouterLink 
                    to="/sign-up" 
                    class="text-black text-base underline underline-offset-6"
                >
                    Create one
                </RouterLink>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { supabase } from '@/supabase'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import AuthLayout from '@/components/AuthLayout.vue'

const email = ref('')
const password = ref('')
const emailErrorMsg = ref('')
const passwordErrorMsg = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const login = async () => {
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

    if (!password.value) {
        passwordErrorMsg.value = 'Password is required.'
        hasError.value = true
    } else {
        passwordErrorMsg.value = ''
    }

    if (!hasError.value) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            })

            if (error) {
                console.error('Login error:', error.message)
                emailErrorMsg.value = 'Invalid email or password'
            } else {
                console.log('Logged in user:', data.user)
            }
        } catch (err) {
            console.error('Error logging in:', err)
        }
    }
}
</script>