<template>
    <div>Search</div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

watch(route, () => {
  console.log(route.query)
})

onMounted(() => {
  console.log(route.query)
})
</script>

<style scoped></style>