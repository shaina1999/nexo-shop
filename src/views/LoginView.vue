<template>
    <div class="w-full flex items-center justify-center pt-15 relative h-[781px]">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl grid grid-cols-2 gap-32">
            <div class="absolute left-0 top-15 bottom-0 right-[52%] hidden lg:flex">
                <img :src="authRightImage" alt="Ecommerce illustration" class="w-full h-full object-cover login-image">
            </div>
            <div class="h-[706px] hidden lg:flex"></div>
            <div class="w-full flex justify-center flex-col">
                <div class="text-4xl font-medium mb-6">Log in</div>
                <div class="text-base mb-12">Enter your details below</div>
                <form>
                    <BaseAuthInput 
                        :type="'text'" 
                        :placeholder="'Email or Phone Number'" 
                    />
                    <BaseAuthInput 
                        :type="'password'" 
                        :placeholder="'Password'" 
                    />
                    <div class="w-full flex items-center justify-between">
                        <BaseButton>Log In</BaseButton>
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
import BaseButton from '@/components/BaseButton.vue'
import BaseAuthInput from '@/components/BaseAuthInput.vue'
import authRightImage from '@/assets/img/login-signup-image.png'
</script>

<style scoped></style>