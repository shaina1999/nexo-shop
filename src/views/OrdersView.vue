<template>
    <section class="max-w-6xl mx-auto py-8 px-4">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar for Status Filter -->
        <aside class="w-full md:w-1/4">
          <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="font-semibold text-lg mb-4">Filter by Status</h2>
            <ul class="space-y-2">
              <li
                v-for="status in statuses"
                :key="status"
                :class="[
                  'cursor-pointer px-3 py-2 rounded-md',
                  selectedStatus === status ? 'bg-primary-100 text-primary-600 font-semibold' : 'hover:bg-gray-100'
                ]"
                @click="selectedStatus = status"
              >
                {{ status.charAt(0).toUpperCase() + status.slice(1) }}
              </li>
            </ul>
          </div>
        </aside>
  
        <!-- Orders List -->
        <div class="flex-1">
          <div class="space-y-4">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div
                class="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                @click="toggleAccordion(order.id)"
              >
                <div>
                  <div class="font-medium text-gray-800">Order #{{ order.id }}</div>
                  <div class="text-sm text-gray-500">Placed: {{ new Date(order.created_at).toLocaleString() }}</div>
                </div>
                <div class="text-sm font-medium text-gray-600 capitalize">
                  Status: 
                  <span :class="statusColor(order.status)">
                    {{ order.status }}
                  </span>
                </div>
              </div>
  
              <div v-if="expandedOrder === order.id" class="border-t border-gray-200 px-5 py-4 space-y-3">
                <div class="text-sm text-gray-700" v-for="item in order.order_items" :key="item.id">
                  <div class="flex items-center justify-between">
                    <span>
                      {{ item.products?.name || 'Unknown Product' }} 
                      <span class="text-gray-400">x{{ item.quantity }}</span>
                    </span>
                    <span class="font-medium">₱{{ item.discounted_price.toFixed(2) }}</span>
                  </div>
                </div>
  
                <div class="flex justify-between items-center pt-4 border-t">
                  <div class="font-semibold">Total: ₱{{ order.total.toFixed(2) }}</div>
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
  
            <div v-if="filteredOrders.length === 0" class="text-center text-gray-500 text-sm pt-12">
              No orders found.
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const orders = ref([])
const expandedOrder = ref(null)
const selectedStatus = ref('all')
  
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
      case 'pending':
        return 'text-yellow-600'
      case 'completed':
        return 'text-green-600'
      case 'cancelled':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
}
  
onMounted(fetchOrders)
</script>  