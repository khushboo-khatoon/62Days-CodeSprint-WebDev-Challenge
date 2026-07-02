import { create } from "zustand";

export const useCart = create((set) => ({
    cart: [],

    addToCart: (product) => set((state) => ({
        cart: [...state.cart, {...product, qty: 1}]
    })),

    removeToCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id!==id)
    }))

}))

