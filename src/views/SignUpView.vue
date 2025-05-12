<template>
    <AuthLayout :title="'Create account'" :subTitle="'Start by creating your account.'">
        <form @submit.prevent="login">
             <div class="mb-6 md:mb-10">
                <BaseAuthInput 
                    :type="'text'" 
                    :placeholder="'Name'" 
                    v-model="name"
                    @update:model-value="nameErrorMsg = ''"
                />
                <span 
                    class="text-red-500 flex" 
                    :class="{ 'mt-1' : nameErrorMsg.length, 'mt-0' : !nameErrorMsg.length }"
                >
                    {{ nameErrorMsg }}
                </span>
            </div>
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
            <div class="w-full flex items-center justify-between flex-col gap-y-3 mb-6 md:mb-10">
                <BaseButton class="w-full" @click.prevent="signUp">Create Account</BaseButton>
                <button 
                    @click.prevent="console.log('sign up with google')"
                    class="w-full cursor-pointer flex items-center justify-center rounded-sm gap-x-4 border-1 border-gray-300 px-10 py-2.5 lg:py-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                    <img :src="googleIcon" alt="Google Logo" class="size-5 md:size-6">
                    <span class="text-black">Sign up with Google</span>
                </button>
            </div>
            <div class="text-center">
                Already have account?
                <RouterLink 
                    to="/login" 
                    class="text-black text-base underline underline-offset-6"
                >
                    Log in
                </RouterLink>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'
import { useRouter, useRoute } from 'vue-router'
import NProgress from 'nprogress'
import googleIcon from '@/assets/img/google.png'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import AuthLayout from '@/components/AuthLayout.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const nameErrorMsg = ref('')
const emailErrorMsg = ref('')
const passwordErrorMsg = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isSubmitting = ref(false)
const router = useRouter()

const signUp = async () => {
    const hasError = ref(false)
    hasError.value = false

    if (!name.value) {
        nameErrorMsg.value = 'Name is required.'
        hasError.value = true
    } else {
        nameErrorMsg.value = ''
    }

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
    } else if (password.value.length < 6) {
        passwordErrorMsg.value = 'Password must be at least 6 characters.'
        hasError = true
    } else {
        passwordErrorMsg.value = ''
    }

    if (!hasError.value) {
        isSubmitting.value = true

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value
            })

            if (error) {
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                isSubmitting.value = false
            } else {
                console.log('Logged in user:', data.user)
                isSubmitting.value = false
                router.push('/'); 
            }
        } catch (err) {
            console.log('Error logging in: ', err)
            isSubmitting.value = false
        } finally {
            NProgress.done()
        }
    }
}
</script>