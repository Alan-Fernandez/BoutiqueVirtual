import { XMarkIcon } from '@heroicons/react/24/solid'
import './styles.css'
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

const ProductDetail = () => {
    const { products, addProduct, removeProduct } = useContext(ShoppingCartContext);

    const handleDelete = (productId: number) => {
        removeProduct(productId);
    }

    return (
        <aside
        className={`${products.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <div>
            <XMarkIcon
                className='h-6 w-6 text-black cursor-pointer'
                onClick={handleDelete(products.id)}></XMarkIcon>
            </div>
        </div>
        <figure className='px-6'>
            <img
            className='w-full h-full rounded-lg'
            src={products.images[0]}
            alt={products.title} />
        </figure>
        <p className='flex flex-col p-6'>
            <span className='font-medium text-2xl mb-2'>${products.price}</span>
            <span className='font-medium text-md'>${products.title}</span>
            <span className='font-light text-sm'>${products.description}</span>
        </p>
        </aside>
    )
}

export default ProductDetail