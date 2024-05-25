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