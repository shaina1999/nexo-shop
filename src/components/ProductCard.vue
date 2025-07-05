<template>
  <article>
    <div @click="goToProductPage(product.id)" class="bg-gray-200 p-2.5 sm:p-4 product cursor-pointer">
      <header class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="bg-secondary-500 text-white py-1 px-2 rounded-sm text-xs">-{{ product.discount }}%</div>
          <div v-if="product.is_new">
            <div class="bg-green-500 text-white py-1 px-2 rounded-sm text-xs">New</div>
          </div>
        </div>
        <button
          class="cursor-pointer bg-white flex items-center justify-center text-secondary-500 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
          :class="{ 'skeleton-loader' : isWishlistLoading }"
          @click.prevent.stop="toggleWishlist"
        >
          <PhHeart v-if="!isAddingToWishlist" :weight="isInWishlist ? 'fill' : 'regular'" :size="24" />
          <PhCircleNotch :size="24" v-else class="animate-spin" />
        </button>
      </header>
      <div class="w-full h-[100px] sm:h-[190px] flex items-center justify-center mr-auto ml-auto">
        <img :src="product.images[0].url" :alt="product.images[0].alt" class="object-contain h-[80%] w-[80%] lg:w-[86%] mx-auto">
      </div>
    </div>
    <footer>
      <button
        :disabled="!product.is_available || isAddingToCart"
        class="shadow-xl/5 bg-black text-white w-full p-1.5 transition-all duration-300 ease-in-out cursor-pointer add-to-cart mb-2 sm:mb-4 flex items-center justify-center gap-x-2 hover:!bg-black"
        @click.prevent.stop="addToCart">
        <span class="text-sm">{{ isAddingToCart ? 'Adding...' : (product.is_available ? 'Add To Cart' : 'Unavailable') }}</span>
        <PhShoppingCart :size="18" v-if="!isAddingToCart" />
        <PhCircleNotch :size="18" v-else class="animate-spin" />
      </button>
      <div>
        <button 
          class="line-clamp-2 font-semibold text-sm sm:text-base mb-1 sm:mb-2 cursor-pointer hover:text-secondary-500 transition-colors duration-300 ease-in-out text-left" 
          @click="goToProductPage(product.id)"
        >
            {{ product.name }}
        </button>
        <div class="flex items-center gap-x-2.5 mb-1 sm:mb-2 text-sm sm:text-base">
          <span class="text-secondary-500">Php {{ formatAmount(product.discounted_price) }}</span>
        </div>
        <div class="mb-1 sm:mb-2">{{ product.sales_count }} sold</div>
        <div class="flex items-center text-sm sm:text-base gap-2">
          <div class="flex items-center gap-x-1">
            <PhStar class="text-yellow-500" weight="fill" />
            <span class="font-medium">{{ product.rating.toFixed(1) }}</span>
            <span class="text-gray-500">{{ `(${product.reviews_count} review${product.reviews_count <= 1 ? '' : 's'})` }}</span>
          </div>
        </div>
        </div>
    </footer>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrencyFormat } from '@/composables/currencyFormat'
import { useCartStore } from '@/stores/cartStore'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'

const router = useRouter()
const { formatAmount } = useCurrencyFormat()
const cart = useCartStore()
const isAddingToCart = ref(false)
const isAddingToWishlist = ref(false)
const auth = useAuthStore()
const isInWishlist = ref(false)
const isWishlistLoading = ref(true)

const props = defineProps({
  product: Object
})

const goToProductPage = (id) => {
  router.push({ path: '/product', query: { id: id} } ); 
}

const toggleWishlist = async () => {
  if (isAddingToWishlist.value) return

  if(!auth?.user) {
    Swal.fire({
      toast: true,
      timer: 4000,
      title: 'Please Log In',
      position: 'bottom-end',
      html: "You need to sign in to add this product to wishlist.",
      icon: 'info'
    })
    return
  }
  
  isAddingToWishlist.value = true

  try {
    if (isInWishlist.value) {
      // remove from wishlist
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', auth?.user?.id)
        .eq('product_id', props.product.id)

      if (error) throw error
      isInWishlist.value = false
    } else {
      // add to wishlist
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: auth?.user?.id,
          product_id: props.product.id
        })

      if (error) throw error
      isInWishlist.value = true
    }
  } catch (err) {
    console.error('Wishlist error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err?.message || 'Unable to update wishlist.'
    })
  } finally {
    isAddingToWishlist.value = false
  }
}

const checkWishlistStatus = async () => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', auth?.user?.id)
    .eq('product_id', props.product.id)
    .maybeSingle()

  isInWishlist.value = !!data
  isWishlistLoading.value = false
}

const addToCart = async () => {
  isAddingToCart.value = true
  const cartItem = { product_id: props.product.id, quantity: 1, }
  await cart.addToCart(cartItem)
  isAddingToCart.value = false
}

onMounted(() => {
  if (auth?.user) {
    checkWishlistStatus()
  } else {
    isWishlistLoading.value = false
  }
})
</script>