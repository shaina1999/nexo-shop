<template>
    <div class="pt-15 flex gap-20 pr-4 md:pr-8 lg:pr-16 xl:pr-34 w-full max-w-7xl">
        <div>
            <img :src="authRightImage" alt="Ecommerce illustration" class="w-full shrink">
        </div>
        <div>
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
</template>

<script setup>
import authRightImage from '@/assets/img/login-signup-image.png'
</script>

<style scoped></style>