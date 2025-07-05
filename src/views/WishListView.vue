<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <header class="flex items-center justify-between gap-4 mb-6">
                <h2 class="text-md sm:text-xl font-semibold">
                    Wishlist <span class="font-normal text-gray-500">{{ `(${count})` }}</span>
                </h2>
            </header>
            <WishListSkeleton v-if="loading" />
            <div v-else-if="!loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
                <div v-if="items.length">
                    <WishListProductCard 
                        v-for="item in items"
                        :key="item.id"
                        :product="item.product"
                        @click="remove(item.id)"
                    />
                </div>
                <div v-else class="col-span-4 flex flex-col items-center justify-center text-center pt-8">
                    <img :src="wishlistIllustration" alt="Cart with heart" class="w-20 h-20 mb-6 md:w-24 md:h-24 object-contain" />
                    <h2 class="text-s sm:text-lg font-semibold text-black mb-1">Your wishlist is empty</h2>
                    <p class="text-sm sm:text-base text-gray-500 mb-6 max-w-md">Looks like you haven't added anything to your wishlist yet.</p>
                    <BaseLinkButton 
                        to="/products"
                        class="!flex items-center gap-x-1.5 text-sm sm:text-base !px-4.5 !py-2.5 md:!px-6 md:!py-3 text-center w-auto bg-white !text-black border border-black/50 hover:!bg-gray-200 transition"
                    >
                        Start shopping
                        <PhBag :size="18" />
                    </BaseLinkButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

import WishListProductCard from '@/components/WishListProductCard.vue'
import WishListSkeleton from '@/components/WishListSkeleton.vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'
import wishlistIllustration from '@/assets/img/wishlist.png'

const items   = ref([])
const loading = ref(false)
const count   = computed(() => items.value.length)

const getWishList = async () => {
  loading.value = true

  const { data, error } = await supabase
    .from('wishlists')
    .select('id, product:products(*)')
    .order('inserted_at', { ascending: false })

  loading.value = false

  if (error) {
    console.error('Failed to fetch wishlist:', error)
    return
  }

  items.value = data ?? []
}

const remove = async (wishlistId) => {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('id', wishlistId)

  if (error) {
    console.error('Failed to remove item:', error)
    return
  }

  await getWishList()
}

onMounted(getWishList)
</script>