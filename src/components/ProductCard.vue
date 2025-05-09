<template>
    <RouterLink :to="`/product/${product.id}`">
        <div class="bg-gray-200 p-4 product cursor-pointer">
            <div class="flex items-center justify-between mb-4">
                <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-sm">{{ product.discount }}</div>
                <button 
                    class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    @click.prevent.stop="addToWishList"
                >
                    <PhHeart :size="24" 
                />
                </button>
            </div>
            <div class="w-[190px] h-[190px] flex items-center justify-center mx-auto">
                <img src="/src/assets/img/product-image.png" alt="Iphone" class="w-full">
            </div>
        </div>
        <button 
            class="bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-4 flex items-center justify-center gap-x-2"
            @click.prevent.stop="addToCart"
        >
            <span class="text-sm">Add To Cart</span>
            <PhPlus :size="18" />
            <PhCheck :size="18" class="hidden" />
        </button>
        <div>
            <div class="font-semibold text-base mb-2.5">{{ product.name }}</div>
            <div class="flex items-center gap-x-2.5 mb-2.5">
                <span class="text-secondary-500">&#8369;{{ product.discountedPrice }}</span>
                <del class="text-gray-500 decoration-dashed">&#8369;{{ product.price }}</del>
            </div>
            <button 
                class="flex items-center gap-x-2 cursor-pointer"
                @click.prevent.stop="viewProductReviews"
            >
                <div class="flex items-center text-orange-500 gap-x-1">
                    <PhStar :size="19" weight="fill" />
                    <PhStar :size="19" weight="fill" />
                    <PhStar :size="19" weight="fill" />
                    <PhStarHalf :size="19" weight="fill" />
                    <PhStar :size="19" />
                </div>
                <span class="text-gray-500">{{ `(${product.reviewsCount})` }}</span>
            </button>
        </div>
    </RouterLink>
</template>

<script setup>
defineProps({
    product: Object
})

const addToWishList = () => {
    console.log('add to wish list')
}

const addToCart = () => {
    console.log('add to cart')
}

const viewProductReviews = () => {
    console.log('view reviews')
}
</script>