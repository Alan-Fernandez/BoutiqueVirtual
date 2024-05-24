import { createContext, ReactNode, useState } from 'react'
import { ShoppingCartContextType, Product } from '../lib/definitions';

const defaultShoppingCartContext: ShoppingCartContextType = {
    products: [],
    setProducts: () => {}, 
    shoppingCart: [],
    addProduct: () => {},
    isProductDetailOpen: false,
    openProductDetail: () => {},
    closeProductDetail: () => {},
    productToShow: null,
    setProductToShow: () => {},
    isCheckoutSideMenuOpen: false,
    openCheckoutSideMenu: () => {},
    closeCheckoutSideMenu: () => {},
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(defaultShoppingCartContext)

interface ShoppingCartProviderProps {
    children: ReactNode;
}

// Creamos el proveedor del carrito de compras
export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    const [shoppingCart, setshoppingCart] = useState<Product[]>([]);

    // función para agregar un producto al carrito
    const addProduct = (product: Product) => {
        setshoppingCart(prevshoppingCart => [...prevshoppingCart, product]);
    }
    
    // Product Detail · Show product
    const [productToShow, setProductToShow] = useState<Product | null>(null)

    // Product Detail · Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)



    return (
        <ShoppingCartContext.Provider value={{
                shoppingCart, 
                products, 
                setProducts, 
                addProduct, 
                isProductDetailOpen, 
                openProductDetail, 
                closeProductDetail, 
                productToShow, 
                setProductToShow,
                isCheckoutSideMenuOpen,
                openCheckoutSideMenu,
                closeCheckoutSideMenu
            }
        }>
            {children}
        </ShoppingCartContext.Provider>
    )
}