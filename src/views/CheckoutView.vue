<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
            <CheckoutSkeleton v-if="isLoading" />
            <div v-if="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <!-- Billing Details -->
                <div>
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 lg:pb-6">Billing Details</h2>
                    <div 
                        v-if="isMobile && !showForm"
                        class="border border-gray-300 p-4 sm:p-6 rounded-lg shadow w-full text-left flex justify-between gap-4 items-start text-sm sm:text-base"
                    >
                        <div class="flex flex-col" v-if="isMobile && hasBillingDetails">
                            <span class="inline-block mb-0.5">{{ billing.fullname }}</span>
                            <span class="inline-block mb-0.5">{{ billing.mobile_number }}</span>
                            <span class="inline-block mb-0.5">
                                {{ billing.apartment ? billing.apartment+', ' : '' }}
                                {{ billing.address ? billing.address+', ' : '' }} {{ billing.city }}
                            </span>
                        </div>
                        <button 
                            @click="showForm = true"
                            class="text-secondary-500 cursor-pointer flex items-center gap-1 text-sm sm:text-base" 
                            :class="{ 'opacity-50 cursor-not-allowed' : isPlacingOrder, 'opacity-100 cursor-auto' : !isPlacingOrder }"
                            v-if="isMobile && hasBillingDetails"
                            :disabled="isPlacingOrder"
                        >
                            Edit
                            <PhPencilSimple :size="16" />
                        </button>
                        <button 
                            v-if="isMobile && !hasBillingDetails && !showForm"
                            @click="showForm = true"
                            class="text-secondary-500 cursor-pointer flex items-center gap-1 self-center text-sm sm:text-base mx-auto"
                        >
                            Add Billing Details
                            <PhPlus :size="16" />
                        </button>
                    </div>
                    <form class="space-y-4" v-if="!isMobile || showForm">
                        <div>
                            <label class="block text-sm font-medium">Full Name<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.fullname"
                                type="text" 
                                placeholder="e.g., John Doe"
                                :disabled="isPlacingOrder"
                                :class="[
                                    'placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out',
                                    hasError.fullname ? 'border-red-500' : 'border-gray-300 focus-visible:!border-secondary-500',
                                    isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'
                                ]"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Mobile Number<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.mobile_number"
                                type="text" 
                                placeholder="e.g., (123) 456-7890"
                                :disabled="isPlacingOrder"
                                :class="[
                                    'placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out',
                                    hasError.mobile_number ? 'border-red-500' : 'border-gray-300 focus-visible:!border-secondary-500',
                                    isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'
                                ]"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Region<span class="text-red-500">*</span></label>
                            <v-select
                                v-model="billing.region"
                                :options="regions"
                                :reduce="r => r.name"
                                label="name"
                                placeholder="Select Region"
                                :disabled="isPlacingOrder"
                                :class="[hasError.region ? 'v-select-error' : '', isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            />
                        </div>
                        <div v-if="!hideProvince">
                            <label class="block text-sm font-medium">Province<span class="text-red-500">*</span></label>
                            <v-select
                                v-model="billing.province"
                                :options="provinces"
                                :reduce="province => province.name"
                                label="name"
                                placeholder="Select Province"
                                :loading="provinceLoading"
                                :disabled="!billing.region || isPlacingOrder"
                                :class="[hasError.province ? 'v-select-error' : '', isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">City / Municipality<span class="text-red-500">*</span></label>
                            <v-select
                                v-model="billing.municipality"
                                :options="municipalities"
                                :reduce="m => m.name"
                                label="name"
                                placeholder="Select City / Municipality"
                                :loading="municipalityLoading"
                                :disabled="hideProvince ? !billing.region : !billing.province || isPlacingOrder"
                                :class="[hasError.municipality ? 'v-select-error' : '', isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Barangay<span class="text-red-500">*</span></label>
                            <v-select
                                v-model="billing.barangay"
                                :options="barangays"
                                :reduce="b => b.name"
                                label="name"
                                placeholder="Select Barangay"
                                :loading="barangayLoading"
                                :disabled="!billing.municipality || isPlacingOrder"
                                :class="[hasError.barangay ? 'v-select-error' : '', isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto']"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">House No. & Street Name<span class="text-red-500">*</span></label>
                            <input 
                                v-model="billing.streetAddress"
                                type="text" 
                                placeholder="e.g., Unit 5B, 123 Maginhawa Street"
                                :disabled="isPlacingOrder"
                                :class="[
                                    'placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out',
                                    hasError.streetAddress ? 'border-red-500' : 'border-gray-300 focus-visible:!border-secondary-500',
                                    isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'
                                ]"
                            />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium">
                                Additional Instructions (Optional)
                            </label>
                            <textarea 
                                v-model="billing.instructions"
                                rows="2"
                                placeholder="e.g., Gate is green, 3rd floor, leave with guard if not available"
                                class="placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out resize-none"
                                :class="isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'"
                                :disabled="isPlacingOrder"
                            >
                            </textarea>
                        </div>
                        <div class="flex items-center">
                            <label class="relative flex items-center gap-1.5" :class="isPlacingOrder ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'">
                                <input 
                                    type="checkbox" 
                                    v-model="saveBillingInfo"
                                    class="absolute left-0 right-0 top-0 bottom-0 opacity-0 z-10"
                                    :class="isPlacingOrder ? 'cursor-not-allowed' : 'cursor-pointer'"
                                    :disabled="isPlacingOrder"
                                >
                                <span 
                                    class="w-4.5 h-4.5 rounded-sm border-[1px] border-black flex items-center justify-center text-white relative"
                                >
                                   <PhCheckFat 
                                        :size="12" 
                                        weight="fill" 
                                        :class="[
                                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-150',
                                            saveBillingInfo ? 'text-black' : 'text-transparent'
                                        ]"
                                    />
                                </span>
                                <span class="text-sm">Save details for faster checkout next time</span>
                            </label>
                        </div>

                        <div v-if="isMobile" class="flex gap-3">
                            <BaseButton
                                type="button"
                                class="text-sm md:text-base !py-1.5 !px-4 !md:py-2 !md:px-4.5 flex items-center justify-center gap-x-1 bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                                :class="isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'"
                                @click="showForm = false"
                                :disabled="isPlacingOrder"
                            >
                                Cancel
                            </BaseButton>
                            <BaseButton
                                type="submit"
                                class="text-sm md:text-base !py-1.5 !px-4 !md:py-2 !md:px-4.5 flex items-center justify-center"
                                :class="isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'"
                                @click.prevent="showForm = false"
                                :disabled="isPlacingOrder"
                            >
                                Save
                            </BaseButton>
                        </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="space-y-5">
                    <h2 class="inline-block md:flex items-center gap-x-3 text sm sm:text-base md:text-lg pb-2.5 lg:pb-6 mb-0">Order Summary</h2>
                    <div class="border border-gray-300 p-6 rounded-lg space-y-8 lg:space-y-6 shadow">
                        <div
                            v-for="(cartItem, index) in cart.cartSelectedItems" :key="cartItem.id"
                            :class="[
                                'flex items-baseline md:items-center justify-between gap-2 lg:gap-12 flex-col md:flex-row',
                                index !== cart.cartSelectedItems.length - 1 ? 'border-b border-b-gray-300 pb-6' : ''
                            ]"
                        >
                            <div class="flex items-center gap-3 grow-0">
                                <img :src="cartItem?.products?.images[0]?.url" :alt="cartItem?.products?.name" class="w-10 h-10 object-contain"/>
                                <div>
                                    <span class="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">{{ cartItem?.products?.name }}</span>
                                    <span class="text-sm sm:text-base text-gray-500">Php {{ formatAmount(cartItem?.products?.discounted_price) }}</span>
                                </div>
                            </div>
                            <div class="shrink-0 flex flex-col gap-0.5 text-sm sm:text-base text-gray-500">
                                <span class="text-left md:text-right">Quantity: {{ cartItem?.quantity }}</span>
                                <span>Php {{ formatAmount(cartItem?.products?.discounted_price * cartItem?.quantity) }}</span>
                            </div>
                        </div>
                        <div class="border-t border-t-gray-300 pt-6 mt-6 space-y-2.5">
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Subtotal:</span>
                                <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                            </div>
                            <div class="flex justify-between text-sm sm:text-base">
                                <span>Shipping:</span>
                                <span class="text-green-500">Free</span>
                            </div>
                            <div class="flex justify-between font-bold text-base sm:text-lg">
                                <span>Total:</span>
                                <span>Php {{ formatAmount(cart.cartTotal) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Options -->
                    <div class="space-y-2">
                        <h2>Payment Options:</h2>
                        <div class="grid grid-cols-1 gap-3">
                            <!-- Cash on Delivery -->
                            <label
                                class="group block border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                                :class="[
                                    payment === 'cod' ? 'border-secondary-500 ring-2 ring-secondary-100' : 'border-gray-300', 
                                    isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                                ]"
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    v-model="payment"
                                    class="sr-only"
                                    :disabled="isPlacingOrder"
                                />
                                <div class="flex items-center gap-3 text-sm sm:text-base">
                                    <PhMoney :size="20" :weight="'regular'" :class="payment === 'cod' ? 'text-secondary-500' : 'text-gray-500'" />
                                    <span :class="payment === 'cod' ? 'text-secondary-600 font-medium' : 'text-gray-700'">Cash on Delivery</span>
                                </div>
                            </label>

                            <!-- Bank -->
                            <label
                                class="group block border rounded-lg p-2.5 sm:p-3 transition-all hover:shadow relative"
                                :class="[
                                    payment === 'bank' ? 'border-secondary-500 ring-2 ring-secondary-100' : 'border-gray-300', 
                                    isPlacingOrder ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                                ]"
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bank"
                                    v-model="payment"
                                    class="sr-only"
                                    :disabled="isPlacingOrder"
                                />
                                <div class="flex items-center gap-3 text-sm sm:text-base">
                                    <PhBank :size="20" :weight="'regular'" :class="payment === 'bank' ? 'text-secondary-500' : 'text-gray-500'" />
                                    <span :class="payment === 'bank' ? 'text-secondary-600 font-medium' : 'text-gray-700'">Bank</span>
                                </div>
                            </label>
                        </div>
                    </div>
                   <div class="flex items-center gap-3 mt-6 flex-col sm:flex-row">
                        <BaseButton class="w-full" @click="placeOrder" :disabled="isPlacingOrder">{{ isPlacingOrder ? 'Placing' : 'Place' }} Order{{ isPlacingOrder ? '...' : '' }}</BaseButton>
                        <BaseLinkButton 
                            to="/cart" 
                            class="flex items-center gap-x-1.5 text-sm !px-4.5 !py-2.5 md:!px-6 md:!py-3 md:mx-0 text-center !w-full bg-white !text-black border-[1px] border-black/50 hover:!bg-gray-200"
                            :class="{ '!cursor-not-allowed opacity-50 pointer-events-none' : isPlacingOrder, '!cursor-pointer opacity-100 pointer-events-all' : !isPlacingOrder }"
                        >
                            Back to Cart
                            <PhArrowUDownLeft :size="18" />
                        </BaseLinkButton>
                   </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useCurrencyFormat } from '@/composables/currencyFormat'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import CheckoutSkeleton from '@/components/CheckoutSkeleton.vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'

const payment = ref('cod')
const isMobile = ref(false)
const showForm = ref(false)
const saveBillingInfo = ref(false)
const isLoading = ref(false)
const cart = useCartStore()
const { formatAmount } = useCurrencyFormat()
const billing = ref({ fullname: '', mobile_number: '', region: '', province: '', municipality: '', barangay: '', streetAddress: '', instructions: '' })
const regions = ref([])
const provinces = ref([])
const municipalities = ref([])
const barangays = ref([])
const regionLoading = ref(false)
const provinceLoading = ref(false)
const municipalityLoading = ref(false)
const barangayLoading = ref(false)
const hideProvince = ref(false)
const isPlacingOrder = ref(false)
const hasError = ref({
  fullname: false,
  mobile_number: false,
  region: false,
  province: false,
  municipality: false,
  barangay: false,
  streetAddress: false,
})
const router = useRouter()

const hasBillingDetails = computed(() => {
    return billing.value.fullname && billing.value.mobile_number
})

const checkViewport = () => {
    isMobile.value = window.innerWidth < 1024
}

const fetchRegions = async () => {
    regionLoading.value = true
    try {
      const res = await fetch('https://psgc.gitlab.io/api/regions/')
      if (!res.ok) throw new Error()
      regions.value = await res.json()
    } catch {
      Swal.fire('Error', 'Failed to load regions.', 'error')
    } finally {
        regionLoading.value = false
    }
}

const placeOrder = () => {
    const requiredFields = [
        { key: 'fullname', label: 'Full Name' },
        { key: 'mobile_number', label: 'Mobile Number' },
        { key: 'region', label: 'Region' },
        { key: 'municipality', label: 'City / Municipality' },
        { key: 'barangay', label: 'Barangay' },
        { key: 'streetAddress', label: 'Street Address' },
    ]

    if (!hideProvince.value) {
        requiredFields.splice(3, 0, { key: 'province', label: 'Province' })
    }

    const missingFields = []

    requiredFields.forEach(field => {
        const value = billing.value[field.key]
        const isMissing = !value || (typeof value === 'string' && value.trim() === '')
        hasError.value[field.key] = isMissing
        if (isMissing) {
            missingFields.push(`• ${field.label}`)
        }
    })

    if (missingFields.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Required Fields',
            html: `<div class="text-center">${missingFields.join('<br>')}</div>`,
        })
        return
    }

    // All valid
    Swal.fire({
        icon: 'question',
        title: 'Place Order?',
        html: `<div class="text-center text-sm sm:text-base text-gray-700">Please confirm that all details are correct before placing your order.</div>`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Place Order',
        cancelButtonText: 'Review Details',
    }).then((result) => {
        if (result.isConfirmed) {
            isPlacingOrder.value = true
            setTimeout(() => {
                isPlacingOrder.value = false
                router.push('/checkout-success')
            }, 2000);
        }
    });
}

watch(() => billing.value.region, async (regionName) => {
    // Always reset all lower-level fields and their options
    billing.value.province = ''
    billing.value.municipality = ''
    billing.value.barangay = ''
    provinces.value = []
    municipalities.value = []
    barangays.value = []

    if (!regionName) return
    
    const selectedRegion = regions.value.find(r => r.name === regionName)
    if (!selectedRegion) return

    if (selectedRegion.code === '130000000') { // NCR region code
        // NCR doesn't have provinces — fetch cities/municipalities directly
        hideProvince.value = true
        municipalityLoading.value = true
        try {
            const res = await fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion.code}/cities-municipalities/`)
            municipalities.value = await res.json()
        } catch {
            Swal.fire('Error', 'Failed to load municipalities.', 'error')
        } finally {
            municipalityLoading.value = false
        }
    } else { // Get Provinces
        hideProvince.value = false
        provinceLoading.value = true
        try {
            const res = await fetch(`https://psgc.gitlab.io/api/regions/${selectedRegion.code}/provinces/`)
            provinces.value = await res.json()
        } catch {
            Swal.fire('Error', 'Failed to load provinces.', 'error')
        } finally {
            provinceLoading.value = false
        }
    }
})

watch(() => billing.value.province, async (provinceName) => {
  // Always reset all lower-level fields and their options  
  billing.value.municipality = ''
  billing.value.barangay = ''
  municipalities.value = []
  barangays.value = []

  if (!provinceName) return

  const selectedProvince = provinces.value.find(p => p.name === provinceName)
  if (!selectedProvince) return

  municipalityLoading.value = true
  
  try {
    const res = await fetch(`https://psgc.gitlab.io/api/provinces/${selectedProvince.code}/cities-municipalities/`)
    if (!res.ok) throw new Error()
    municipalities.value = await res.json()
  } catch {
    Swal.fire('Error', 'Failed to load municipalities.', 'error')
  } finally {
    municipalityLoading.value = false
  }
})

watch(() => billing.value.municipality, async (municipalityName) => {
  // Always reset all lower-level fields and their options  
  billing.value.barangay = ''
  barangays.value = []
    
  const selectedMunicipality = municipalities.value.find(m => m.name === municipalityName)
  if (!selectedMunicipality) return

  barangayLoading.value = true

  try {
    const res = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${selectedMunicipality.code}/barangays/`)
    if (!res.ok) throw new Error()
    barangays.value = await res.json()
  } catch {
    Swal.fire('Error', 'Failed to load barangays.', 'error')
  } finally {
    barangayLoading.value = false
  }
})

watch(billing, (val) => {
  for (const key in hasError.value) {
    if (val[key]) hasError.value[key] = false
  }
}, { deep: true })

onMounted(() => {
    checkViewport()
    window.addEventListener('resize', checkViewport)
})

onMounted(async () => {
    isLoading.value = true
    await Promise.all([
      cart.fetchSelectedCartItems(),
      fetchRegions()
    ])
    isLoading.value = false
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkViewport)
})
</script>