export const useHomeStore = defineStore('home', () => {
    const domain = ref(null)

    const setDomain = (val) => {
        domain.value = val;
    }


    return {
        domain,
        setDomain,
    }
})