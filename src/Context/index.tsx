import { createContext, ReactNode, useEffect, useState } from 'react'
import { ShoppingCartContextType, Product, Order } from '../lib/definitions';
import { loadProducts } from '../utils';

// Creación del contexto con un tipo definido
export const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    // Estado para los productos y la búsqueda por título
    const [products, setProducts] = useState<Product[]>([]);
    const [searchByTitle, setSearchByTitle] = useState<string>('');
    const [searchByCategory, setSearchByCategory] = useState<string>('');
    console.log(`searchByCategory`, searchByCategory)

    // Carga inicial de los productos
    useEffect(() => {
        loadProducts().then(products => {
            setProducts(products)
        })
    }, []);

    // Filtrado de productos basado en la búsqueda por título
    const filteredProducts = products.filter(product =>
        (searchByTitle ? product.title.toLowerCase().includes(searchByTitle.toLowerCase()) : true) &&
        (searchByCategory ? product.category.name.toLowerCase().includes(searchByCategory.toLowerCase()) : true)
    );

    // Estado y funciones para el carrito de compras
    const shoppingCartState = useState<Product[]>([]);
    const addProduct = (product: Product) => {
        shoppingCartState[1](prev => [...prev, product]);
    }
    const removeProduct = (product: Product) => {
        shoppingCartState[1](prev => prev.filter(p => p.id !== product.id));
    }

    // Estado y funciones para el detalle del producto
    const productDetailState = useState<Product | null>(null);
    const openProductDetail = (product: Product) => productDetailState[1](product);
    const closeProductDetail = () => productDetailState[1](null);

    // Estado y funciones para el menú lateral de checkout
    const checkoutSideMenuState = useState(false);
    const openCheckoutSideMenu = () => checkoutSideMenuState[1](true);
    const closeCheckoutSideMenu = () => checkoutSideMenuState[1](false);

    // Estado y funciones para la orden
    const orderState = useState<Order[]>([]);
    const addOrder = (orderToAdd: Order) => {
        orderState[1](prevOrder => [...prevOrder, orderToAdd]);
        shoppingCartState[1]([]);
    }

    // Proveedor del contexto con todos los estados y funciones
    return (
        <ShoppingCartContext.Provider value={{
            filteredProducts,
            products: filteredProducts,
            setProducts,
            setSearchByTitle,
            setSearchByCategory,
            shoppingCart: shoppingCartState[0],
            addProduct,
            removeProduct,
            productToShow: productDetailState[0],
            setProductToShow: productDetailState[1],
            isProductDetailOpen: productDetailState[0] !== null,
            openProductDetail,
            closeProductDetail,
            isCheckoutSideMenuOpen: checkoutSideMenuState[0],
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order: orderState[0],
            addOrder,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}