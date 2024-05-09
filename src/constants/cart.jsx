export const checkProductInCart = (cart, product) => {
    return cart.items.some((item) => item.product.id === product.id)
}

export const handleClickCartModal = (toggle) => {
    toggle();
}