<template>
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl pb-16 sm:pb-20 md:pb-25">
        <h2 class="inline-block md:flex items-center gap-x-3 text-base md:text-lg mb-2.5 lg:mb-4 font-medium skeleton-loader w-max">Lorem ipsum</h2>
        <!-- Status Filter (Mobile: Custom Select | Desktop: Sidebar) -->
        <div class="mb-6 block md:hidden">
          <label class="block text-sm font-medium text-black mb-1.5 skeleton-loader w-max">Filter by Status</label>
          <div class="relative">
            <button
              class="cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between skeleton-loader"
              ref="dropdownButtonRef"
            >
              Lorem ipsum dolor sit amet.
              <PhCaretDown :size="16" class="ml-2" />
            </button>
          </div>
        </div>
    
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar (desktop only) -->
          <aside class="hidden md:block w-full md:w-1/4">
            <div class="bg-white px-3 py-3 rounded-md shadow-md">
              <ul class="space-y-2">
                <li v-for="n in 4" :key="n" class="cursor-pointer px-3 py-2 rounded-sm transition-all flex justify-between items-center skeleton-loader">Lorem ipsum dolor.</li>
              </ul>
            </div>
          </aside>
    
          <!-- Orders List -->
          <div class="flex-1 space-y-4 min-h-[522px]">
            <div 
              class="bg-white border border-gray-100 rounded-md shadow-sm"
              v-for="n in 5" :key="n"
            >
              <!-- Accordion Header -->
              <div
                class="rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 cursor-pointer hover:bg-gray-50 pointer-events-none"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-black skeleton-loader mb-1">Order <span class="uppercase">Lorem ipsum dolor sit amet.</span></div>
                    <div class="text-sm text-gray-500 skeleton-loader">
                      Placed: Lorem ipsum dolor sit amet.
                    </div>
                  </div>
                  <PhCaretDown class="text-gray-500 block sm:hidden" />
                </div>
                <div class="flex items-center gap-2.5 text-sm font-medium capitalize">
                  <span class="px-3 py-[2px] rounded-full inline-block text-white skeleton-loader">Lorem ipsum dolor sit amet.</span>
                  <PhCaretDown class="text-gray-500 hidden sm:block skeleton-loader skeleton-loader" :size="20" />
                </div>
              </div>
    
              <!-- Accordion Body -->
              <div 
                class="border-t border-gray-300 px-4 py-4 space-y-6 sm:space-y-3 hidden"
              >
                <div class="text-sm text-black">
                  <div class="flex justify-between items-baseline sm:items-center gap-y-1 sm:gap-y-0 flex-col sm:flex-row">
                    <div class="flex items-center gap-x-2">
                      <div class="w-10 h-10"></div>
                      <div class="flex flex-col">
                        <span class="line-clamp-2">Lorem ipsum dolor sit amet.</span>
                        <span class="text-gray-400">Qty: Lorem ipsum dolor sit amet.</span>
                      </div>
                    </div>
                    <span class="font-medium">Php Lorem ipsum dolor sit amet.</span>
                  </div>
                </div>

                <div class="pt-6 mt-6 border-t border-t-gray-300">
                  <!-- Payment Method -->
                  <div class="mb-1 text-sm text-black">
                    <span class="text-black font-semibold">Payment Method: </span>
                    <span class="capitalize">Lorem ipsum dolor sit amet.</span>
                  </div>

                  <!-- Billing Details -->
                  <div class="text-sm text-gray-700">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci hic voluptatibus facilis nihil.
                    </p>
                  </div>
                </div>
    
                <!-- Footer -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-0 sm:pt-2">
                  <div class="font-semibold text-base">
                    Total: Php Lorem ipsum dolor sit amet.
                  </div>
                  <button class="px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 text-sm rounded transition">
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
    
            <!-- Pagination -->
            <div class="flex justify-center items-center gap-4 pt-6">
              <button
                class="px-3 py-1 text-sm cursor-pointer bg-secondary-500 text-white rounded disabled:opacity-50 hover:bg-secondary-300 transition-colors duration-300 ease-in-out skeleton-loader"
              >
                Prev
              </button>
              <span class="text-sm skeleton-loader py-1">Page No orders found.</span>
              <button
                class="px-3 py-1 text-sm cursor-pointer bg-secondary-500 text-white rounded disabled:opacity-50 hover:bg-secondary-300 transition-colors duration-300 ease-in-out skeleton-loader"
              >
                Next
              </button>
            </div>
          </div>
        </div>
    </div>
</template>