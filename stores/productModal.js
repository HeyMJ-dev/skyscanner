export const useProductModal = defineStore('productModal', () => {
    const activeModal = ref(false)
    const product = ref(null)

    const openProductModal = (productId) => {
        //todo: fetch get data

        //static code (remove after)
        product.value = {
            id: "3",
            image: {
                src: "/images/item1.png",
                alt: "alt text"
            },
            title: "Fire Safety Awareness 3",
            description: "This course is aimed at all those in the workplace",
            price: "£1200.99"
        }

        activeModal.value = true;
    }

    const closeProductModal = () => {
        activeModal.value = false;
    }

    return {activeModal, product, openProductModal, closeProductModal}
})