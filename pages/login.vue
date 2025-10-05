<template>
    <div class="flex bg-zinc-900 h-screen">

        <!-- sidebar -->
        <div class="bg-black w-[450px] p-12 flex-col justify-center">
            <Logo />
            <h1 class="text-white font-bold text-lg mt-8">Log in to your account</h1>
            <p class="text-zinc-300 text-sm mt-0.5">
                Don't have an account? 
                <nuxt-link to="/register" class="font-bold text-[#ffac00] underline">Sign Up</nuxt-link> for one!
            </p>

            <form @submit.prevent="submit">
                <div class="mt-8">
                    <label for="" class="text-zinc-300 text-sm block mb-0.5">
                        Email Address
                    </label>
                    <input 
                        v-model="email"
                        placeholder="you@example.com" 
                        type="email" 
                        class="block w-full bg-[#27272a] border border-[#3f3f46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
                    />
                </div>
                <div class="mt-6">
                    <label for="" class="text-zinc-300 text-sm block mb-0.5">
                        Password
                    </label>
                    <input 
                        v-model="password"
                        placeholder="***************" 
                        type="password" 
                        class="block w-full bg-[#27272a] border border-[#3f3f46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
                    />
                </div>
                <!-- sign up button -->
                <div>
                    <button class="w-full mt-4 bg-[#ffac00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2">
                        <span>Log in</span> 
                        <ArrowRight />
                    </button>
                </div>
                <!-- sign up button -->
            </form>

        </div>
        <!-- sidebar -->
        
        <!-- note introduction -->
        <div></div>
        <!-- note introduction -->

    </div>
</template>

<script setup>
    import Swal from 'sweetalert2'

    const email = ref('')
    const password = ref('')

    async function submit() {
        try {
            const response = await $fetch('/api/login', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value
                }
            })
            
            const { isConfirmed } = await Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            })

            if(isConfirmed) {
                navigateTo('/')
            }
        }
        catch(error) {
            console.log('ERROR')
            console.log(error.response?._data?.message)
            Swal.fire({
                title: 'Error!',
                text: error.response?._data?.message,
                icon: 'error',
                confirmButtonText: 'Close',
            })
        }
    }
</script>