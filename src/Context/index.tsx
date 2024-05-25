import { createContext, ReactNode, useState } from 'react'
import { ShoppingCartContextType, Product, Order } from '../lib/definitions';

const defaultShoppingCartContext: ShoppingCartContextType = {
    products: [],
    order: [],
    shoppingCart: [],
    setProducts: () => {}, 
    addProduct: () => {},
    removeProduct: () => {},
    isProductDetailOpen: false,
    openProductDetail: () => {},
    closeProductDetail: () => {},
    productToShow: null,
    setProductToShow: () => {},
    isCheckoutSideMenuOpen: false,
    openCheckoutSideMenu: () => {},
    closeCheckoutSideMenu: () => {},
    addOrder: () => {}, 
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(defaultShoppingCartContext)

interface ShoppingCartProviderProps {
    children: ReactNode;
}

// Creamos el proveedor del carrito de compras
export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    
    // función para agregar un producto al carrito
    const [shoppingCart, setshoppingCart] = useState<Product[]>([]);
    const addProduct = (product: Product) => {
        setshoppingCart(prevshoppingCart => [...prevshoppingCart, product]);
    }

    // función para eliminar un producto del carrito
    const removeProduct = (product: Product) => {
        setshoppingCart(prevshoppingCart => prevshoppingCart.filter(p => p.id !== product.id));
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

    //Shopping Cart Order
    const [order, setOrder] = useState<Order[]>([])

    // función para agregar una orden al carrito
    const addOrder = (orderToAdd: Order) => {
        setOrder(prevOrder => [...prevOrder, orderToAdd]);
        setshoppingCart([]);
    }



    return (
        <ShoppingCartContext.Provider value={{
                shoppingCart, 
                products, 
                setProducts, 
                addProduct, 
                removeProduct,
                isProductDetailOpen, 
                openProductDetail, 
                closeProductDetail, 
                productToShow, 
                setProductToShow,
                isCheckoutSideMenuOpen,
                openCheckoutSideMenu,
                closeCheckoutSideMenu,
                order,
                addOrder
            }
        }>
            {children}
        </ShoppingCartContext.Provider>
    )
}