<template>
    <nav>
        <div class="logo">NexoShop</div>
        <ul>
            <li>
                <span>Home</span>
                <span>Contact</span>
                <span>About</span>
                <span>Sign Up</span>
            </li>
        </ul>
        <div>
            <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
            <!-- BaseButtonIcon Here -->
            <!-- BaseButtonIcon Here -->
        </div>
    </nav>
</template>

<script setup>
import BaseSearchInput from '@/components/BaseSearchInput.vue'

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>