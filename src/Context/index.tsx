import { createContext, ReactNode, useState } from 'react'
import { ShoppingCartContextType, Product } from '../lib/definitions';

const defaultShoppingCartContext: ShoppingCartContextType = {
    products: [],
    addProduct: () => {},
    removeProduct: () => {},
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(defaultShoppingCartContext)

interface ShoppingCartProviderProps {
    children: ReactNode;
}

// Creamos el proveedor del carrito de compras
export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    // función para agregar un producto al carrito
    const addProduct = (product: Product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    }
    // función para eliminar un producto del carrito
    const removeProduct = (productId: number) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }

    return (
        <ShoppingCartContext.Provider value={{ products, addProduct, removeProduct }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}