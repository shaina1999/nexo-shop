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
        <div class="p-2">
            <BaseSearchInput :searchPlaceholder="searchPlaceholder" />
            <BaseButtonIcon>
                <template v-slot:icon>
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </template>
            </BaseButtonIcon>
        </div>
    </nav>
</template>

<script setup>
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import BaseButtonIcon from '@/components/BaseButtonIcon.vue'

const searchPlaceholder = "What are you looking for?"
</script>

<style scoped></style>