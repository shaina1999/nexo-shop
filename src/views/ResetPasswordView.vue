<template>
    <div class="w-full flex items-center justify-center pt-0 lg:pt-15 relative h-[calc(100vh_-_214px)] lg:h-[781px]">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 max-w-7xl flex flex-col">
            <div class="w-[320px] sm:w-[400px]">
                <div class="text-center">
                    <div class="text-2xl md:text-4xl font-medium mb-2.5 md:mb-6">Update Password</div>
                    <div class="text-base mb-4 md:mb-12">Please enter your new password below. This will update your account password. Make sure your new password is strong and secure.</div>
                </div>
                <form @submit.prevent="submit">
                    <div class="mb-6 md:mb-10">
                        <BaseAuthInput 
                            :type="'password'" 
                            :placeholder="'New Password'" 
                            v-model="newPassword"
                            @update:model-value="newPasswordErrorMsg = ''"
                        />
                        <span 
                            class="text-red-500 flex" 
                            :class="{ 'mt-1' : newPasswordErrorMsg.length, 'mt-0' : !newPasswordErrorMsg.length }"
                        >
                            {{ newPasswordErrorMsg }}
                        </span>
                    </div>
                    <div class="mb-6 md:mb-10">
                        <BaseAuthInput 
                            :type="'password'" 
                            :placeholder="'Confirm Password'" 
                            v-model="confirmPassword"
                            @update:model-value="confirmPasswordErrorMsg = ''"
                        />
                        <span 
                            class="text-red-500 flex" 
                            :class="{ 'mt-1' : confirmPasswordErrorMsg.length, 'mt-0' : !confirmPasswordErrorMsg.length }"
                        >
                            {{ confirmPasswordErrorMsg }}
                        </span>
                    </div>
                    <div class="w-full flex items-center justify-between flex-col lg:flex-row gap-y-6">
                        <BaseButton class="w-full" @click.prevent="submit">Submit</BaseButton>
                    </div>
                </form>
            </div>  
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'

const newPassword = ref('')
const confirmPassword = ref('')
const newPasswordErrorMsg = ref('')
const confirmPasswordErrorMsg = ref('')
const router = useRouter()

const submit = async () => {
    const hasError = ref(false)
    hasError.value = false

    if (!newPassword.value) {
        newPasswordErrorMsg.value = 'New password is required.'
        hasError.value = true
    } else if (newPassword.value.length < 6) {
        newPasswordErrorMsg.value = 'Password must be at least 6 characters long.'
        hasError.value = true
    } else {
        newPasswordErrorMsg.value = ''
    }

    if (!confirmPassword.value) {
        confirmPasswordErrorMsg.value = 'Confirm password is required.'
        hasError.value = true
    } else if (confirmPassword.value.length < 6) {
        confirmPasswordErrorMsg.value = 'Password must be at least 6 characters long.'
        hasError.value = true
    } else {
        confirmPasswordErrorMsg.value = ''
    }

    if (newPassword.value && confirmPassword.value && newPassword.value.length >= 6 && confirmPassword.value.length >= 6) {
        if (newPassword.value !== confirmPassword.value) {
            newPasswordErrorMsg.value = 'Passwords do not match.'
            confirmPasswordErrorMsg.value = 'Passwords do not match.'
            hasError.value = true
        } else {
            newPasswordErrorMsg.value = ''
            confirmPasswordErrorMsg.value = ''
        }   
    }

    if (!hasError.value) {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: confirmPassword.value
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
                    title: 'Success!',
                    html: 'Your password has been updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isDismissed || result.isConfirmed) {
                        router.push('/')
                    }
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
            newPassword.value = ''
            confirmPassword.value = ''
        }
    }
}

onMounted(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const error = params.get('error')
    const errorCode = params.get('error_code')
    const errorDescription = params.get('error_description')

    if (error && errorCode === 'otp_expired') {
        Swal.fire({
            title: 'OTP Expired',
            html: `${errorDescription}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
                setTimeout(() => {
                    router.push('/')
                }, 100);
            }
        })
    }
})
</script>