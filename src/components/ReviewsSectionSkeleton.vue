<template>
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-t border-gray-300 pt-12 mb-6">
        <div>
          <h3 class="text-lg sm:text-xl font-semibold text-muted-800 mb-2 skeleton-loader">Customer Reviews <span class="text-sm text-gray-500 font-normal">100 Reviews</span></h3>
          <div class="flex items-center gap-x-2 skeleton-loader">
            <div class="flex items-center gap-1 text-yellow-400">
              <PhStar
                v-for="n in 5"
                :key="n"
                class="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
            <p class="text-xl sm:text-2xl text-gray-700 font-bold">4.4 out of 5</p>
          </div>
        </div>
        <div class="skeleton-loader mt-2">
            <BaseDropdown
                label="Filter by Rating"
                option-label-key="label"
                option-value-key="value"
            />
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-6">
        <div
          v-for="review in 5"
          :key="review"
          class="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2 sm:gap-1">
            <p class="text-sm sm:text-base font-semibold text-black skeleton-loader">
                Anonymous
            </p>
            <div class="flex items-center gap-1 text-yellow-400 skeleton-loader">
              <PhStar
                v-for="n in 5"
                :key="n"
                class="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
          </div>
          <p class="text-sm sm:text-base text-black leading-relaxed mb-2 skeleton-loader w-max">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <p class="text-sm text-gray-500 mt-2 skeleton-loader w-max">
            Reviewed on June 20, 2025
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
import BaseDropdown from '@/components/BaseDropdown.vue'
</script>