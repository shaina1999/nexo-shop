<template>
    <div class="flex items-center justify-center w-full">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <ul class="flex flex-col gap-y-4 border-r-1 border-r-gray-300 w-max pt-10.5 pr-4">
                <li 
                    v-for="(productCategory, index) in productCategories" :key="productCategory.id"
                >   
                    <div v-if="productCategory.value === 'womens-fashion' || productCategory.value === 'mens-fashion'">
                        <button 
                            class="cursor-pointer flex items-center justify-between gap-x-2 min-w-[180px] hover:text-orange-500 transition-colors duration-200 ease"
                            @click="toggleSubCategories(index)"
                        >
                            <span>{{ productCategory.label }}</span>
                            <PhCaretRight :size="22" class="transition-transform duration-300" :class="{ 'rotate-90' : productCategory.isSubCategoryOpen}" />
                        </button>
                        <!-- Sub Categories -->
                        <ul 
                            class="overflow-hidden flex flex-col gap-y-2 pl-6"
                            :class="{ 
                                'h-max pt-4' : productCategory.isSubCategoryOpen, 
                                'h-0 pt-0' : !productCategory.isSubCategoryOpen 
                            }"
                        >
                            <li v-for="(productSubCategory, index) in productCategory.subCategories" :key="index">
                                <RouterLink  
                                    class="hover:text-orange-500 transition-colors duration-200 ease" 
                                    :to="`/products?q=${productSubCategory.value}`"
                                >
                                {{ productSubCategory.label }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <RouterLink 
                            class="hover:text-orange-500 transition-colors duration-200 ease" 
                            :to="`/products?q=${productCategory.value}`"
                        >
                            {{ productCategory.label }}
                        </RouterLink>
                    </div>
                </li>
            </ul>
            <div class="p-10">test</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const productCategories = ref([
  { id: 1, value: 'womens-fashion', label: "Women's Fashion", subCategories: [{ value: 'dresses', label: "Dresses" }, { value: 'tops-blouses', label: "Tops & Blouses" }], isSubCategoryOpen: false },
  { id: 2, value: 'mens-fashion', label: "Men's Fashion", subCategories: [{ value: 'mens-footwear', label: "Footwear" }, { value: 'accessories', label: "Accessories" }], isSubCategoryOpen: false },
  { id: 3, value: 'electronics', label: "Electronics" },
  { id: 4, value: 'home-lifestyle', label: "Home & Lifestyle" },
  { id: 5, value: 'medicines', label: "Medicines" },
  { id: 6, value: 'sports-outdoor', label: "Sports & Outdoor" },
  { id: 7, value: 'babies-toys', label: "Baby's & Toys" },
  { id: 8, value: 'groceries-pets', label: "Groceries & Pets" },
  { id: 9, value: 'health-beauty', label: "Health & Beauty" },
])

const toggleSubCategories = (index) => {
    productCategories.value[index].isSubCategoryOpen = !productCategories.value[index].isSubCategoryOpen
}
</script>

<style scoped></style>