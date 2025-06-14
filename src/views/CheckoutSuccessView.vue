<template>
    <section class="flex items-center justify-center min-h-[70vh] px-6 py-16">
      <div class="max-w-xl w-full text-center space-y-4 md:space-y-6">
        <PhCheckCircle class="mx-auto text-green-500" :size="72" weight="duotone" />
  
        <h1 class="text-xl md:text-3xl font-semibold text-gray-900">Thank you for your order!</h1>
        <p class="text-gray-600 text-sm/6 md:text-base/6">
          Your order has been successfully placed <br>
          You can track your order status in <strong>My Orders</strong> under your account dropdown.<br>
          Thank you for shopping with us!
        </p>
  
        <div class="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <BaseButton
            to="/"
            class="!w-full sm:w-auto !px-5 !py-2.5 border border-secondary-500"
          >
            Continue Shopping
          </BaseButton>
          <BaseLinkButton
            to="/account/orders"
            class="!w-full sm:w-auto !px-5 !py-2.5 border border-black/50 bg-white !text-black hover:!bg-gray-200"
          >
            View My Orders
          </BaseLinkButton>
        </div>
      </div>
    </section>
</template>
  
<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseLinkButton from '@/components/BaseLinkButton.vue'
</script>  