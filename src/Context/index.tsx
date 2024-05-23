import { createContext, ReactNode } from 'react'
import { ShoppingCartContextType } from '../lib/definitions';

const defaultShoppingCartContext: ShoppingCartContextType = {
    
    products: [],
    addProduct: () => {},
    removeProduct: () => {},
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(defaultShoppingCartContext)

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    return (
        <ShoppingCartContext.Provider value={defaultShoppingCartContext}>
            {children}
        </ShoppingCartContext.Provider>
    )
}