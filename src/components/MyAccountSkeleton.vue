<template>
    <form
        class="w-full"
    >
        <!-- Heading -->
        <div>
            <h2 class="text-md sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6 w-max skeleton-loader">Welcome! <span class="text-secondary-500">Lorem, ipsum dolor.</span></h2>
        </div>

        <!-- Grid of inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
                <label class="block text-sm font-medium skeleton-loader w-[162px]">First Name</label>
                <input
                    type="text"
                    class="skeleton-loader text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                />
            </div>

            <div>
                <label class="block text-sm font-medium skeleton-loader w-[162px]">Last Name</label>
                <input
                    type="text"
                    class="skeleton-loader text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                />
            </div>

            <div class="md:col-span-2 space-y-2 sm:space-y-4">
                <h3 class="text-sm font-semibold text-gray-700 skeleton-loader w-[170px]">Password</h3>

                <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium skeleton-loader w-[162px]">New Password</label>
                        <input
                            type="password"
                            class="skeleton-loader text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <div class="col-span-1">
                        <label class="block text-sm font-medium skeleton-loader w-[162px]">Confirm New Password</label>
                        <input
                            type="password"
                            class="skeleton-loader text-sm sm:text-base placeholder:text-sm placeholder-gray-400 mt-1 w-full border border-gray-300 rounded-md px-2 py-1.5 sm:p-2 focus-visible:!outline-none focus-visible:!border-secondary-500 transition-colors duration-300 ease-in-out"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            class="w-full sm:w-[196px] skeleton-loader h-[44px] sm:h-[48px]"
        >
            Save Changes
        </div>
    </form>
</template>