export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export interface Order {
    id: string;
    date: string;
    products: Product[];
    totalProducts: number;
    totalPrice: number;
}

export type ShoppingCartContextType = {
    products: Product[];
    filteredProducts: Product[];
    order: Order[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    shoppingCart: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    isProductDetailOpen: boolean;
    openProductDetail: (product: Product) => void;
    closeProductDetail: () => void;
    productToShow: Product | null;
    setProductToShow: (product: Product | null) => void;
    isCheckoutSideMenuOpen: boolean;
    openCheckoutSideMenu: () => void;
    closeCheckoutSideMenu: () => void;
    setSearchByTitle: (title: string) => void;
    setSearchByCategory: (category: string) => void;
    
    addOrder: (order: Order) => void;
}