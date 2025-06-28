<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10" ref="ordersSection">
      <OrdersSkeleton v-if="loading" />
      <div v-else class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
        <h2 class="inline-block md:flex items-center gap-x-3 text-base md:text-lg pb-2.5 lg:pb-4 mb-0 font-medium">Orders</h2>
        <!-- Status Filter (Mobile: Custom Select | Desktop: Sidebar) -->
        <BaseDropdown
          wrapper-class="mb-6 block md:hidden"
          v-model="selectedStatus"
          :options="statuses"
          label="Filter by Status"
        />
    
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar (desktop only) -->
          <aside class="hidden md:block w-full md:w-1/4">
            <div class="bg-white px-3 py-2 rounded-md shadow-md">
              <ul class="space-y-2">
                <li
                  v-for="status in statuses"
                  :key="status"
                  :class="[
                    'cursor-pointer px-3 py-2 rounded-sm transition-all flex justify-between items-center',
                    selectedStatus === status
                      ? 'bg-secondary-500 text-white'
                      : 'hover:text-secondary-500'
                  ]"
                  @click="selectedStatus = status"
                >
                  {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                </li>
              </ul>
            </div>
          </aside>
    
          <!-- Orders List -->
          <div class="flex-1 space-y-4 min-h-[522px]">
            <div
              v-for="order in paginatedOrders"
              :key="order.id"
              class="bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <!-- Accordion Header -->
              <div
                class="rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50"
                @click="toggleAccordion(order.id)"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-black">Order <span class="uppercase">{{ order.readable_id }}</span></div>
                    <div class="text-sm text-gray-500">
                      Placed: {{ formatDate(order.created_at)}}
                    </div>
                  </div>
                  <PhCaretDown class="text-gray-500 block sm:hidden" :size="20" :class="{ 'rotate-180': expandedOrder === order.id, 'transition-transform': true }" />
                </div>
                <div class="flex items-center gap-2.5 text-sm font-medium capitalize">
                  <span class="px-3 py-[2px] rounded-full inline-block text-white" :class="statusColor(order.status)">{{ order.status }}</span>
                  <PhCaretDown class="text-gray-500 hidden sm:block" :size="20" :class="{ 'rotate-180': expandedOrder === order.id, 'transition-transform': true }" />
                </div>
              </div>
    
              <!-- Accordion Body -->
              <div
                v-if="expandedOrder === order.id"
                class="border-t border-gray-300 px-4 py-4 space-y-10 sm:space-y-6"
              >
                <div
                  class="text-sm text-black"
                  v-for="item in order.order_items"
                  :key="item.id"
                >
                  <div class="flex justify-between items-baseline sm:items-center gap-1 sm:gap-10 flex-col sm:flex-row">
                    <div class="flex items-center gap-x-2">
                      <img class="w-10 h-10 object-contain" :src="item.products?.images[0]?.url" :alt="item.products?.name">
                      <div class="flex flex-col">
                        <span class="line-clamp-2 font-semibold mb-0.5 max-w-[250px] sm:max-w-[300px]">{{ item.products?.name }}</span>
                        <span class="font-medium mb-0.5">Php {{ formatAmount(item.discounted_price) }}</span>
                        <span class="text-gray-400">Qty: {{ item.quantity }}</span>
                      </div>
                    </div>
                    <div v-if="order.status === 'completed'" class="flex flex-row sm:flex-col items-center gap-2 mt-1 shrink-0">
                      <button
                        @click="isReviewed ? editReview() : addReview()"
                        class="px-3 py-1 sm:px-4 sm:py-1.5 cursor-pointer bg-secondary-500 hover:bg-secondary-300 text-white text-sm rounded transition-colors duration-300 ease-in-out"
                      >
                        {{ isReviewed ? 'Edit Review' : 'Add Review ' }}
                      </button>
                      <div v-if="true" class="text-green-600 text-xs font-medium bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-2">
                        <PhCheckCircle :size="18" class="text-green-600" />
                        Reviewed
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-10 mt-10 sm:pt-6 sm:mt-6 border-t border-t-gray-300">
                  <!-- Payment Method -->
                  <div class="mb-1 text-sm text-black">
                    <span class="text-black font-semibold">Payment Method: </span>
                    <span class="capitalize" :class="{ 'uppercase' : order.payment_method === 'cod' }">{{ order.payment_method || 'N/A' }}</span>
                  </div>

                  <!-- Billing Details -->
                  <div class="text-sm text-gray-700">
                    <p>
                      {{ [
                          order.billing_details?.fullname,
                          order.billing_details?.mobile_number,
                          order.billing_details?.streetAddress,
                          order.billing_details?.barangay,
                          order.billing_details?.municipality,
                          order.billing_details?.province,
                          order.billing_details?.region
                        ].filter(Boolean).join(', ') 
                      }}
                    </p>
                    <p v-if="order.billing_details?.additional_instructions" class="italic text-gray-500">
                      Note: {{ order.billing_details.additional_instructions }}
                    </p>
                  </div>
                </div>
    
                <!-- Footer -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-0 sm:pt-2">
                  <div class="font-semibold text-base">
                    Total: Php {{ formatAmount(order.total) }}
                  </div>
                  <button
                    v-if="order.status === 'pending'"
                    @click.stop="cancelOrder(order.id)"
                    class="px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 text-sm rounded transition-colors duration-300 ease-in-out"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
    
            <!-- Empty State -->
            <div
              v-if="paginatedOrders.length === 0"
              class="text-center text-gray-500 text-sm sm:text-base pt-12"
            >
              No orders found.
            </div>
    
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 pt-6">
              <button
                :disabled="currentPage === 1"
                @click="currentPage--"
                class="px-3 py-1 text-sm cursor-pointer bg-secondary-500 text-white rounded disabled:opacity-50 hover:bg-secondary-300 transition-colors duration-300 ease-in-out"
              >
                Prev
              </button>
              <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
              <button
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                class="px-3 py-1 text-sm cursor-pointer bg-secondary-500 text-white rounded disabled:opacity-50 hover:bg-secondary-300 transition-colors duration-300 ease-in-out"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add review modal -->
    <BaseModal
        v-model="showAddReviewModal"
        :size="'lg'"
        :closableViaBackdrop="!isSubmitting"
      >
        <template #header>
          <div class="flex items-center justify-between w-full p-5 border-b border-b-gray-300 gap-3">
            <h2 class="text-base sm:text-md font-semibold">{{ isReviewed ? 'Edit Review' : 'Add Review' }}</h2>
            <button @click="showAddReviewModal = false" :disabled="isSubmitting" class="cursor-pointer hover:!bg-transparent">
              <PhX :size="18" weight="bold" />
            </button>
          </div>
        </template>

        <template #body>
          <div class="p-5 space-y-6">
            <!-- Star rating -->
            <div class="flex flex-col items-baseline gap-2">
              <span class="text-sm font-medium">Your Rating:</span>
              <div class="flex gap-1">
                <template v-for="n in 5" :key="n">
                  <button
                    :disabled="isSubmitting"
                    @click="rating = n"
                    @mouseover="isSubmitting ? hoverRating = hoverRating : hoverRating = n"
                    @mouseleave="hoverRating = 0"
                    class="transition cursor-pointer hover:!bg-transparent"
                    :class="{
                      'text-yellow-400': n <= (hoverRating || rating),
                      'text-gray-300': n > (hoverRating || rating),
                      'cursor-not-allowed opacity-50' : isSubmitting,
                      'cursor-not-allowed opacity-100 hover:scale-110' : !isSubmitting
                    }"
                  >
                    <PhStar :size="28" weight="fill" />
                  </button>
                </template>
              </div>
            </div>

            <!-- Review message -->
            <div>
              <label class="block mb-2 text-sm font-medium">Your Review</label>
              <textarea
                :disabled="isSubmitting"
                v-model="reviewMessage"
                rows="4"
                maxlength="100"
                placeholder="Write your thoughts about the product..."
                :class="{ 'cursor-not-allowed !opacity-50' : isSubmitting }"
                class="resize-none text-sm sm:text-base placeholder:text-sm placeholder-gray-400 w-full border rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none transition-colors duration-300 ease-in-out border-gray-300 focus-visible:!border-secondary-500 opacity-100 cursor-auto"
              ></textarea>
              <p class="text-right text-xs text-gray-500 mt-1" :class="reviewMessageClass">
                {{ reviewMessage.length }}/100 characters
              </p>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="p-5 flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3">
            <button 
              :disabled="isSubmitting"
              @click="submitReview" 
              class="w-full sm:w-max text-sm text-white bg-secondary-500 hover:bg-secondary-300 !px-4.5 !py-2.5 cursor-pointer rounded-md transition-colors duration-300 ease-in-out"
            >
              Submit
            </button>
            <button 
              :disabled="isSubmitting"
              @click="showAddReviewModal = false" 
              class="w-full sm:w-max text-sm text-white bg-gray-500 hover:bg-gray-600 !px-4.5 !py-2.5 cursor-pointer rounded-md transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </template>
      </BaseModal>
</template>
  
<script setup>
import { ref, computed, onMounted, watch, useTemplateRef } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import { useCurrencyFormat } from '@/composables/currencyFormat'

import OrdersSkeleton from '@/components/OrdersSkeleton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BaseModal from '@/components/BaseModal.vue'

const auth = useAuthStore()
const orders = ref([])
const expandedOrder = ref(null)
const selectedStatus = ref('all')
const currentPage = ref(1)
const perPage = 5
const { formatAmount } = useCurrencyFormat()
const ordersSection = ref(null)
const loading = ref(true)
const showAddReviewModal = ref(false)
const rating = ref(5)
const hoverRating = ref(5)
const reviewMessage = ref('')
const isSubmitting = ref(false)
const isReviewed = ref(false)

const statuses = ['all', 'pending', 'completed', 'cancelled']

const statusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500'
    case 'completed': return 'bg-green-500'
    case 'cancelled': return 'bg-gray-500'
    default: return 'bg-secondary-500'
  }
}

const reviewMessageClass = computed(() => {
  if (reviewMessage.value.length >= 100) return 'text-red-500'
  return 'text-gray-500'
})

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') return orders.value
  return orders.value.filter(order => order.status === selectedStatus.value)
})
  
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))
  
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredOrders.value.slice(start, start + perPage)
})
  
const fetchOrders = async () => {
  if (!auth?.user?.id) return

  loading.value = true

  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        created_at,
        status,
        total,
        readable_id,
        payment_method,
        billing_details:billing_id (
          fullname,
          mobile_number,
          region,
          province,
          municipality,
          barangay,
          street_address,
          additional_instructions
        ),
        order_items (
          id,
          quantity,
          discounted_price,
          products (
            id,
            name,
            images
          )
        )
      `)
      .eq('user_id', auth.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    orders.value = data
  } catch (err) {
    console.error('Failed to fetch orders:', err)

    Swal.fire({
      icon: 'error',
      title: 'Failed to Load Orders',
      text: 'Something went wrong while fetching your orders. Please try again later.',
    })
  } finally {
    loading.value = false
  }
}
  
const toggleAccordion = (orderId) => {
  expandedOrder.value = expandedOrder.value === orderId ? null : orderId
}

const formatDate = (date, format = 'MMMM DD, YYYY hh:mm A') => {
  return dayjs(date).format(format)
}

const cancelOrder = async (orderId) => {
  const confirm = await Swal.fire({
    title: 'Cancel this order?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel it',
    cancelButtonText: 'No',
  })

  if (!confirm.isConfirmed) return

  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)

  if (error) {
    Swal.fire('Failed', 'Could not cancel order. Try again.', 'error')
  } else {
    Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success')
    fetchOrders()
  }
}

const addReview = async () => {
  showAddReviewModal.value = true
}

const editReview = () => {
  console.log('edit')
  showAddReviewModal.value = true
}

const submitReview = async () => {
  const confirm = await Swal.fire({
    title: 'Submit Review?',
    text: 'Are you sure you want to submit your rating and feedback?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, submit it',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  })

  if (!confirm.isConfirmed) return

  isSubmitting.value = true
  console.log('Submitting review:', {
    rating: rating.value,
    message: reviewMessage.value,
  })

  setTimeout(() => {
    showAddReviewModal.value = false
    rating.value = 5
    reviewMessage.value = ''
    isSubmitting.value = false

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your review has been submitted successfully.',
    })
  }, 5000);
}

const scrollToOrdersTop = () => {
  if (ordersSection.value) {
    ordersSection.value.scrollIntoView({ block: 'start' })
  }
}

watch(selectedStatus, () => {
  currentPage.value = 1
  scrollToOrdersTop()
})

watch(currentPage, () => {
  scrollToOrdersTop()
})

onMounted(fetchOrders)
</script>