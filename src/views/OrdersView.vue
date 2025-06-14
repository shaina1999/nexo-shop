<template>
    <section class="flex items-center justify-center w-full pt-5 md:pt-10">
      <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
        <h2 class="inline-block md:flex items-center gap-x-3 text-base md:text-lg pb-2.5 lg:pb-4 mb-0 font-medium">Orders</h2>
        <!-- Status Filter (Mobile: Custom Select | Desktop: Sidebar) -->
        <div class="mb-6 block md:hidden">
          <label class="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <div class="relative">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between"
            >
              {{ selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) }}
              <PhCaretDown :size="16" class="ml-2" />
            </button>
            <ul
              v-if="isDropdownOpen"
              class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md"
            >
              <li
                v-for="status in statuses"
                :key="status"
                @click="selectedStatus = status; isDropdownOpen = false"
                class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {{ status.charAt(0).toUpperCase() + status.slice(1) }}
              </li>
            </ul>
          </div>
        </div>
    
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
          <div class="flex-1 space-y-4">
            <div
              v-for="order in paginatedOrders"
              :key="order.id"
              class="bg-white border border-gray-200 rounded-md shadow-sm"
            >
              <!-- Accordion Header -->
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50"
                @click="toggleAccordion(order.id)"
              >
                <div>
                  <div class="font-medium text-gray-800">Order #NS-1928</div>
                  <div class="text-sm text-gray-500">
                    Placed: {{ formatDate(order.created_at)}}
                  </div>
                </div>
                <div class="text-white flex items-center gap-2 text-sm font-medium capitalize">
                  <span class="px-3 py-[2px] rounded-full inline-block" :class="statusColor(order.status)">{{ order.status }}</span>
                  <PhCaretDown :size="16" :class="{ 'rotate-180': expandedOrder === order.id, 'transition-transform': true }" />
                </div>
              </div>
    
              <!-- Accordion Body -->
              <div
                v-if="expandedOrder === order.id"
                class="border-t border-gray-200 px-4 py-4 space-y-3"
              >
                <div
                  class="text-sm text-gray-700"
                  v-for="item in order.order_items"
                  :key="item.id"
                >
                  <div class="flex justify-between items-center">
                    <span>
                      {{ item.products?.name || 'Unknown Product' }}
                      <span class="text-gray-400">x{{ item.quantity }}</span>
                    </span>
                    <span class="font-medium">₱{{ item.discounted_price.toFixed(2) }}</span>
                  </div>
                </div>
    
                <!-- Footer -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t">
                  <div class="font-semibold text-base">
                    Total: ₱{{ order.total.toFixed(2) }}
                  </div>
                  <button
                    v-if="order.status === 'pending'"
                    @click.stop="cancelOrder(order.id)"
                    class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm rounded transition"
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
            <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 pt-6">
              <button
                :disabled="currentPage === 1"
                @click="currentPage--"
                class="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
              <button
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                class="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
  
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

const auth = useAuthStore()
const orders = ref([])
const expandedOrder = ref(null)
const selectedStatus = ref('all')
const isDropdownOpen = ref(false)
const currentPage = ref(1)
const perPage = 5

const statuses = ['all', 'pending', 'completed', 'cancelled']
  
const fetchOrders = async () => {
  if (!auth?.user?.id) return

  const { data, error } = await supabase
    .from('orders')
    .select(`id, created_at, status, total, order_items(id, quantity, discounted_price, products(id, name))`)
    .eq('user_id', auth.user.id)
    .order('created_at', { ascending: false })

  if (!error) {
    orders.value = data
  } else {
    console.error('Failed to fetch orders:', error)
  }
}
  
const toggleAccordion = (orderId) => {
  expandedOrder.value = expandedOrder.value === orderId ? null : orderId
}
  
const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') return orders.value
  return orders.value.filter(order => order.status === selectedStatus.value)
})
  
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))
  
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredOrders.value.slice(start, start + perPage)
})

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
      confirmButtonColor: '#ef4444',
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
  
const statusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500'
    case 'completed': return 'bg-green-500'
    case 'cancelled': return 'bg-gray-500'
    default: return 'bg-secondary-500'
  }
}
  
watch(selectedStatus, () => {
    currentPage.value = 1
})

onMounted(fetchOrders)
</script>