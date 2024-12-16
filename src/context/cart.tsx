"use client"

import React, { createContext, useEffect, useState } from "react";
import { Product } from "types/product";

export type CartItem = {
    product: Product;
};

type CartContextType = {
    cartItems: CartItem[];
    handleAddToCart: (product: Product) => void;
    handleRemoveFromCart: (productId: number) => void;
    count: () => number;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (product: Product) => {
        
        const existingCartItem = cartItems.find(item => item.product?.id === product?.id);

        if (existingCartItem) {
            console.log("Produto já está no carrinho")
            return
        } else {
            const newCartItem: CartItem = {
                product
            };
            const updatedCartItems = [...cartItems, newCartItem];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            console.log("Produto adicionado ao carrinho")
            console.log(product)
        }
    };

    const handleRemoveFromCart = (productId: number) => {
        console.log("removeee")
        const updatedCartItems = cartItems.filter(item => item.product?.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        console.log("Carrinho limpo");
    };

    const count = () => {
        return cartItems.length;
    };

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const cartContextValue: CartContextType = {
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        count,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider> 
    )
};