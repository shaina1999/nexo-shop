<template>
    <div class="w-full flex items-center justify-center pt-0 lg:pt-15 relative h-[calc(100vh_-_214px)] lg:h-[781px]">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div class="absolute left-0 top-15 bottom-0 right-[52%] hidden lg:flex">
                <img :src="authRightImage" alt="Ecommerce illustration" class="w-full h-full object-cover login-image">
            </div>
            <div class="h-[706px] hidden lg:flex"></div>
            <div class="w-[320px] md:w-[50%] lg:w-full mx-auto lg:mx-0 flex justify-center flex-col">
                <div class="text-center lg:text-left">
                    <div class="text-4xl font-medium mb-6">Log in</div>
                    <div class="text-base mb-12">Enter your details below</div>
                </div>
                <form @submit.prevent="login">
                    <div class="mb-10">
                        <BaseAuthInput 
                            :type="'text'" 
                            :placeholder="'Email or Phone Number'" 
                            v-model="email"
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
                            Forget Password?
                        </RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import authRightImage from '@/assets/img/login-signup-image.png'

const email = ref('')
const password = ref('')
const emailErrorMsg = ref('')
const passwordErrorMsg = ref('')
const emailRegex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm)
const numberRegex = new RegExp(/^[0-9]+$/)
const isEmail = computed(() => !numberRegex.test(email.value))

const login = () => {
    if (!email.value) {
        emailErrorMsg.value = 'This field is required.';
        return;
    }

    if (isEmail.value) {
        if (!emailRegex.test(email.value)) {
            emailErrorMsg.value = 'Please enter a valid email address.';
            return;
        }
    } else {
        if (!/^[0-9]{11}$/.test(email.value)) {
            emailErrorMsg.value = 'Phone number must be exactly 11 digits.';
            return;
        }
    }

    emailErrorMsg.value = '';

    if (!password.value) {
        passwordErrorMsg.value = 'Password is required.';
        return;
    } else {
        passwordErrorMsg.value = '';
    }
}
</script>

<style scoped></style>