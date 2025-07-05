<template>
    <article>
        <div @click="goToProductPage(product.id)" class="bg-gray-200 p-2.5 sm:p-4 product cursor-pointer">
            <header class="flex items-center justify-between mb-4">
                <!-- <div v-if="!product.is_new">
                    <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm">10%</div>
                </div>
                <div v-else-if="product.is_new">
                    <div class="bg-green-500 text-white py-1 px-2 rounded-sm text-sm">New</div>
                </div> -->
                <div>
                    <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm">-10%</div>
                </div>
                <button
                    class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                >
                    <PhTrash :size="24" />
                </button>
            </header>
            <div class="w-full h-[100px] sm:h-[190px] flex items-center justify-center mr-auto ml-auto">
                <img class="object-contain h-full w-[80%] lg:w-[86%] mx-auto">
            </div>
        </div>
        <footer>
            <button
                class="shadow-xl/5 bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-2 sm:mb-4 flex items-center justify-center gap-x-2 hover:!bg-black"
            >
                <span class="text-sm">Add To Cart</span>
                <!-- <PhShoppingCart :size="18" v-if="!isAddingToCart" />
                <PhCircleNotch :size="18" v-else class="animate-spin" /> -->
                <PhShoppingCart :size="18" />
            </button>
            <div>
                <button 
                    class="line-clamp-2 font-semibold text-sm sm:text-base mb-1 sm:mb-2 cursor-pointer hover:text-secondary-500 transition-colors duration-300 ease-in-out text-left" 
                >
                    Test
                </button>
                <div class="flex items-center gap-x-2.5 mb-1 sm:mb-2 text-sm sm:text-base">
                    <span class="text-secondary-500">Php 1000</span>
                </div>
                <div class="mb-1 sm:mb-2">3 sold</div>
                <div class="flex items-center text-sm sm:text-base gap-2">
                    <div class="flex items-center gap-x-1">
                        <PhStar class="text-yellow-500" weight="fill" />
                        <span class="font-medium">4.4</span>
                        <span class="text-gray-500">(100 reviews)</span>
                    </div>
                </div>
            </div>
        </footer>
    </article>
</template>

<script setup>
import { ref } from 'vue'

const product = ref({
    "id": "0cbe69cd-1be6-4200-8958-33a715a338cc",
    "name": "Mechanical Keyboard",
    "slug": "mechanical-keyboard",
    "description": "RGB hot-swappable mechanical keyboard with blue switches.",
    "price": 3499,
    "discounted_price": 99,
    "discount": 14,
    "is_new": true,
    "stock": 12,
    "images": [
        {
            "alt": "Mechanical Keyboard",
            "url": "https://jquwasnrxbzlhmtwnrit.supabase.co/storage/v1/object/public/product-images//Gaming-Keyboard-PNG-Image.png"
        }
    ],
    "created_at": "2025-05-16T15:42:46.870481",
    "sales_count": 12,
    "category_id": "f01b2a42-3035-4fa9-8844-d7fae3d99ee2",
    "tags": [
        "keyboard",
        "mechanical",
        "rgb",
        "blue switches",
        "gaming"
    ],
    "rating": 0,
    "is_featured": false,
    "featured_description": null,
    "is_available": false,
    "details": null,
    "reviews_count": 0
})

const goToProductPage = (id) => {
    router.push({ path: '/product', query: { id: id} } ); 
}
</script>