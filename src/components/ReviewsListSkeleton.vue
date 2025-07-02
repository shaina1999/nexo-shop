<template>
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
</template>