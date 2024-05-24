export const useBasketStore = defineStore('basket', () => {
    let items = ref([])

    const basketDetails = ref(false)

    const showBasketDetails = () => {
        basketDetails.value = true;
    }

    const hideBasketDetails = () => {
        basketDetails.value = false;
    }

    const toggleBasketDetails = () => {
        basketDetails.value = !basketDetails.value;
    }

    const addItemToBasket = (newItem, count) => {
        if (count < 1) {
            return
        }

        const newItemId = newItem.id;
        let itemExist = false;
        items.value.forEach(item => {
            if (newItemId === item.details.id) {
                item.count += count;
                itemExist = true;
            }
        })

        if (!itemExist) {
            items.value.push({
                details: newItem,
                count: count,
            })
        }

        // setTimeout(()=>{
        //     basketDetails.value = true;
        // }, 100)
    }

    const removeItemFromBasket = (itemId) => {
        items.value = items.value.filter(item => item.details.id !== itemId);
    }

    const getSumCount = () => {
        let sumCount = 0;
        items.value.forEach(item => {
            sumCount += item.count;
        })
        return sumCount;
    }

    function incrementItem(itemId) {
        items.value.forEach(item => {
            if (item.details.id === itemId) {
                item.count = item.count + 1;
            }
        })
    }

    function decrementItem(itemId) {
        items.value.forEach(item => {
            if (item.details.id === itemId) {
                if (item.count > 1) {
                    item.count = item.count - 1;
                }
            }
        })
    }

    return {
        items,
        basketDetails,
        showBasketDetails,
        hideBasketDetails,
        toggleBasketDetails,
        addItemToBasket,
        removeItemFromBasket,
        getSumCount,
        incrementItem,
        decrementItem
    }
})