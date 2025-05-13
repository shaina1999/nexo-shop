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
                <BaseButton class="w-full lg:w-max" :disabled="isSubmitting" @click.prevent="submit">{{ isSubmitting ? 'Submitting' : 'Submit' }}</BaseButton>
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
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'
import NProgress from 'nprogress'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import AuthLayout from '@/components/AuthLayout.vue'

const email = ref('')
const emailErrorMsg = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isSubmitting = ref(false)

const submit = async () => {
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
        NProgress.start()
        isSubmitting.value = true

        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
                redirectTo: 'http://localhost:5173/reset-password'
            })

            if (error) {
                Swal.fire({
                    title: 'Something went wrong',
                    html: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                Swal.fire({
                    title: 'Reset Email Sent',
                    html: `We've sent a password reset link to <strong>${email.value}</strong>. Please check your inbox and follow the instructions to reset your password.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (err) {
            Swal.fire({
                title: 'Unexpected Error',
                html: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } finally {
            email.value = ''
            isSubmitting.value = false
            NProgress.done()
        }
    }
}
</script>