export default defineNuxtRouteMiddleware(async () => {
    if(process.client) return

    const { $verifyJwtToken } = useNuxtApp()
    const jwt = useCookie('NoteNestJWT')

    if(!jwt.value) {
        return navigateTo('/register')
    }

    try {
        await $verifyJwtToken.verify(jwt.value, process.env.JWT_SECRET)
    }
    catch(error) {
        return navigateTo('/register')
    }
})

// retomar: 2:32:00