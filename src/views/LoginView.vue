<template>
    <div class="w-full flex items-center justify-center pt-15 relative h-[781px]">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl grid grid-cols-2 gap-32">
            <div class="absolute left-0 top-15 bottom-0 right-[50%]">
                <img :src="authRightImage" alt="Ecommerce illustration" class="w-full h-full object-cover login-image">
            </div>
            <div class="h-[706px]"></div>
            <div class="w-full flex justify-center flex-col">
                <div>Log in to Exclusive</div>
                <div>Enter your details below</div>
                <form>
                    <input type="text" placeholder="Email or Phone Number">
                    <input type="password" placeholder="Password">
                    <div>
                        <button>Submit</button>
                        <div>Forgot Password?</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import authRightImage from '@/assets/img/login-signup-image.png'
</script>

<style scoped></style>