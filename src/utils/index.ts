import { Product } from "../lib/definitions"

/**
 * Calcula el precio total de una lista de productos.
 *
 * @param {Array} products - Un array de productos, cada uno con una propiedad de precio.
 * @returns {Number} El precio total de todos los productos en el array.
 */
export const totalPrices = (products: Product[]) => {
    return products.reduce((acc, product) => acc + product.price, 0)
}



    // función para cargar los productos desde la API
    export const loadProducts =  async () => {
        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }