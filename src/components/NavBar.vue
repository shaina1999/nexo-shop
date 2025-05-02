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
        <div class="py-2 px-3 bg-gray-200 flex gap-4 item-center max-w-[243px]">
            <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
            <BaseButtonIcon>
                <template v-slot:icon>
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </template>
            </BaseButtonIcon>
        </div>
        <BaseButtonIcon>
            <template v-slot:icon>
                <font-awesome-icon :icon="['far', 'heart']" />
            </template>
        </BaseButtonIcon>
        <BaseButtonIcon>
            <template v-slot:icon>
                <font-awesome-icon :icon="['far', 'cart-shopping']" />  
            </template>
        </BaseButtonIcon>
    </nav>
</template>

<script setup>
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>