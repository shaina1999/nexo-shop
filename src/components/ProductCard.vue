<template>
    <article>
        <div @click="goToProductPage(product.id)" class="bg-gray-200 p-2.5 sm:p-4 product cursor-pointer">
            <header class="flex items-center justify-between mb-4">
                <div v-if="!product.isNew">
                    <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm">{{ product.discount }}%</div>
                </div>
                <div v-else-if="product.isNew">
                    <div class="bg-green-500 text-white py-1 px-2 rounded-sm text-sm">New</div>
                </div>
                <button
                    class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    @click.prevent.stop="addToWishList">
                    <PhHeart :size="24" />
                </button>
            </header>
            <div class="w-full h-[100px] sm:h-[190px] flex items-center justify-center mr-auto ml-auto">
                <img :src="product.images[0].url" :alt="product.images[0].alt" class="object-contain h-full w-[80%] lg:w-[86%] mx-auto">
            </div>
        </div>
        <footer>
            <button
                class="shadow-xl/5 bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-2 sm:mb-4 flex items-center justify-center gap-x-2"
                @click.prevent.stop="addToCart">
                <span class="text-sm">Add To Cart</span>
                <PhPlus :size="18" />
                <PhCheck :size="18" class="hidden" />
            </button>
            <div>
                <button 
                    class="font-semibold text-sm sm:text-base mb-1 sm:mb-2.5 cursor-pointer hover:text-secondary-500 transition-colors duration-300 ease-in-out text-left" 
                    @click="goToProductPage(product.id)"
                >
                    {{ product.name }}
                </button>
                <div class="flex items-center gap-x-2.5 mb-1 sm:mb-2.5 text-sm sm:text-base">
                    <span class="text-secondary-500">Php {{ product.discount_price }}</span>
                    <del class="text-gray-500 decoration-dashed">Php {{ product.price }}</del>
                </div>
                <div class="flex items-center text-sm sm:text-base gap-2">
                    <div>{{ product.sales_count }} sold</div>
                    <span class="text-gray-300">&VerticalLine;</span>
                    <div class="flex items-center gap-x-1">
                        <PhStar class="text-yellow-500" weight="fill" />
                        <span class="font-medium">{{ product.rating }}</span>
                        <span class="text-gray-500">{{ `(${product.discount_price})` }}</span>
                    </div>
                </div>
            </div>
        </footer>
    </article>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

defineProps({
    product: Object
})

const goToProductPage = (id) => {
    router.push({ path: '/product', query: { id: id} } ); 
}

const addToWishList = () => {
    console.log('add to wish list')
}

const addToCart = () => {
    console.log('add to cart')
}
</script>