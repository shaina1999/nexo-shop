<template>
  <section class="flex items-center justify-center w-full pt-5 md:pt-10 product-details">
    <ProductDetailsSkeleton v-if="isLoading" />
    <div v-else class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
      <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-5 md:pb-10 font-semibold">{{ productObj?.name }}</h2>
      <div class="flex items-start gap-6 lg:gap-8 flex-col lg:flex-row">
        <!-- Product Images -->
        <div class="flex w-full lg:w-auto basis-[55%] gap-2 flex-col-reverse">
          <div class="basis-[100px] w-auto">
            <Splide 
              v-if="productObj?.images.length > 0 && productObj?.images.length > 4"
              @splide:click="onSplideClick"
              :options="{
                  type: 'slide',
                  perPage: 4,
                  gap: '12px',
                  arrows: true,
                  speed: 1000,
                  perMove: 1,
                  pagination: false,
                  breakpoints: {
                    640: {
                      perPage: 3,
                    }
                  }
              }"
          >
            <SplideSlide 
              v-for="(productImage, index) in productObj?.images" 
              :key="index" 
              :img="productImage.url" 
              :alttext="productImage.alt"
              :slideid="'slide'+index"
              class="cursor-pointer"
            >
              <div 
                class="bg-gray-200 flex items-center justify-center p-2 h-[90px] border-2 border-transparent transition-colors duration-200 ease-in-out" 
                :class="{ 'border-secondary-500!': selectedSlideId === 'slide'+index }"
              >
                <img 
                  :src="productImage.url" 
                  :alt="productImage.alt" 
                  class="w-[90px] h-full object-contain rounded" 
                />
              </div>
            </SplideSlide>
          </Splide>
          <div v-else-if="productObj?.images.length > 0 && productObj?.images.length < 5" class="grid grid-cols-4 gap-3">
            <div 
              v-for="(productImage, index) in productObj?.images" 
              :key="index"
              class="bg-gray-200 flex items-center justify-center p-2 h-[90px] cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out" 
              @click="onSlideClick($event)"
              :slideid="'slide'+index"
              :img="productImage.url" 
              :class="{ 'border-secondary-500!': selectedSlideId === 'slide'+index }"
            >
              <img 
                :src="productImage.url" 
                :alt="productImage.alt" 
                :slideid="'slide'+index"
                :img="productImage.url" 
                class="w-[90px] h-full object-contain rounded" 
              />
            </div>
          </div>
          </div>
          <!-- Main Image -->
          <div class="p-3 flex items-center justify-center bg-gray-200 h-[200px] md:h-[350px] lg:h-[450px] cursor-pointer outline-none">
            <img 
              :src="selectedImage || productObj?.images[0]?.url" 
              :alt="productObj?.images[0]?.alt" 
              class="w-[90%] lg:w-[80%] h-[90%] lg:h-[80%] object-contain" 
              @click="openImageViewer()"
            />
            <vue-easy-lightbox 
              :visible="visible"
              :imgs="selectedImage || productObj?.images[0]?.url"
              @hide="visible = false"
              :pinchDisabled="true"
            />
          </div>
        </div>
        <!-- Product Details -->
        <article class="space-y-6 basis-[42%] w-full">
          <header>
            <h1 class="text-lg sm:text-2xl font-bold mb-2">{{ productObj?.name }}</h1>
            <div class="flex items-center mb-2">
              <div class="flex items-center text-yellow-400 gap-1 mr-1">
                <PhStar class="text-yellow-500" weight="fill" />
                <p class="text-gray-500 text-sm sm:text-base">{{ productObj?.rating }}</p>
              </div>
              <p class="text-gray-500 text-sm sm:text-base">(150 Reviews)</p>
              <span class="text-gray-300 mx-2.5">&VerticalLine;</span>
              <span 
                class="text-sm sm:text-base font-medium py-0.5 px-2.5 rounded-sm"
                :class="{ 'text-green-600 bg-green-100' : productObj?.is_available, 'text-red-600 bg-red-300' : !productObj?.is_available }"
              >
                {{ productObj?.is_available ? `In Stock (${productObj?.stock})` : 'Out of Stock' }}
              </span>
            </div>
            <p class="text-lg sm:text-2xl font-semibold flex items-center gap-2">
              Php {{ formatAmount(productObj?.discounted_price) }} 
              <del class="text-gray-500 text-xs sm:text-sm font-normal!">Php {{ formatAmount(productObj?.price) }}</del> 
              <span class="text-xs sm:text-sm font-semibold bg-secondary-100 text-secondary-500 rounded-sm px-1">-{{ productObj?.discount }}%</span>
            </p>
          </header>
          <p class="text-gray-600 lead-[1.7]" :class="{ 'mb-2' : productObj?.details }">{{ productObj?.description }}</p>
          <div v-if="productObj?.details" class="space-y-1">
            <div v-for="(value, key) in productObj.details" :key="key" class="text-sm sm:text-base">
              <strong class="uppercase font-bold">{{ key }}:</strong> <span class="text-gray-600">{{ value }}</span>
            </div>
          </div>
          <!-- Quantity and Action Buttons -->
          <section class="flex flex-col gap-8">
            <div class="flex flex-col">
              <h2 class="text-sm sm:text-base font-medium mb-1">Quantity:</h2>
              <QuantityInput
                :min="1"
                :max="maxQuantity"
                v-model="quantity"
                :disabled="!productObj?.is_available || isAddingToCart"
                :disable-button="!productObj?.is_available || isAddingToCart"
                :wrapper-class="'flex items-center rounded overflow-hidden w-full sm:w-max h-[35px] sm:h-[44px]'"
                :input-class="'w-full sm:w-[80px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-sm sm:text-base font-semibold h-full disabled:opacity-[0.5]'"
                :minus-button-class="'text-lg w-[60px] sm:w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent'"
                :plus-button-class="'text-lg w-[60px] sm:w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm'"
              />
            </div>

            <div class="flex items-center gap-3 flex-col sm:flex-row">
              <BaseButton 
                :disabled="!productObj?.is_available || isAddingToCart" 
                class="w-full text-sm md:text-base py-3! px-2.5! md:!py-3.5 md:!px-4 flex items-center justify-center font-medium gap-x-1.5"
                @click="addToCart"
              >
                <span>{{ isAddingToCart ? 'Adding...' : (productObj?.is_available ? 'Add To Cart' : 'Unavailable') }}</span>
                <PhShoppingCart class="text-xl" v-if="!isAddingToCart" />
                <PhCircleNotch class="text-xl animate-spin" v-else />
              </BaseButton>
              <BaseButton 
                class="w-full text-sm md:text-base py-3! px-2.5! md:!py-3.5 md:!px-4 flex items-center justify-center font-medium gap-x-1.5 bg-white text-secondary-500! border-[1px] border-secondary-500 hover:!bg-secondary-100"
              >
                <span>Add to wishlist</span>
                <PhHeart class="text-xl" />
              </BaseButton>
            </div>
          </section>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { watch, computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/supabase'
import { useCurrencyFormat } from '@/composables/currencyFormat'
import Swal from 'sweetalert2'
import { useCartStore } from '@/stores/cartStore'

import BaseButton from '@/components/BaseButton.vue'
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton.vue'
import QuantityInput from '@/components/QuantityInput.vue'

const route = useRoute()
const router = useRouter()
const productObj = ref(null)
const isLoading = ref(false)
const { formatAmount } = useCurrencyFormat()
const quantity = ref(1)
const maxQuantity = ref(0)
const selectedImage = ref(null)
const selectedSlideId = ref('slide0')
const isAddingToCart = ref(false)
const cart = useCartStore()
const visible = ref(false)

const openImageViewer = (i) => {
  visible.value = true
}

const increaseQuantity = () => {
  if (quantity.value < maxQuantity.value) {
    quantity.value++
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
};

const handleQuantityInput = (e) => {
  const input = e.target.value.replace(/\D/g, '')
  let parsed = parseInt(input)

  if (isNaN(parsed) || parsed < 1) {
    parsed = 1
  } else if (parsed > maxQuantity.value) {
    parsed = maxQuantity.value
  }

  quantity.value = parsed
};

const onSplideClick = (Splide, e) => {
  selectedImage.value = e.slide.attributes.img.value
  selectedSlideId.value = e.slide.attributes.slideid.value
};

const onSlideClick = (e) => {
  selectedImage.value = e.target.attributes.img.value
  selectedSlideId.value = e.target.attributes.slideid.value
};

const addToCart = async () => {
    isAddingToCart.value = true
    const cartItem = { product_id: productObj.value?.id, quantity: quantity.value, }
    await cart.addToCart(cartItem)
    isAddingToCart.value = false
};

const fetchProduct = async (id) => {
  isLoading.value = true;
  try {
    const { data: product, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    productObj.value = product;
    maxQuantity.value = productObj.value.stock
  } catch (error) {
    console.error('Error fetching product:', error);
    productObj.value = null;
    Swal.fire({
      title: 'Oops...',
      html: 'It seems the product you\'re looking for doesn\'t exist or is currently unavailable',
      icon: 'warning',
      confirmButtonText: 'Go to Homepage',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isDismissed || result.isConfirmed) {
        router.push('/');
      }
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchProduct(route.query.id);
})
</script>

<style scoped>
.product-details .splide__arrow--next {
  right: 0.5em !important;
}

.product-details .splide__arrow--prev {
  left: 0.5em !important;
}
</style>