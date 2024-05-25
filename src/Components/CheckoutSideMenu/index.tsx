import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import './styles.css'
import OrderCard from '../OrderCard'
import { totalPrices } from '../../utils'
import { useNavigate } from 'react-router-dom'

const CheckoutSideMenu = () => {
    const {closeCheckoutSideMenu, removeProduct, isCheckoutSideMenuOpen, shoppingCart, addOrder} = useContext(ShoppingCartContext)
    const navigate = useNavigate();

    const handleCheckout = () => {
        const today = new Date();
        const date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

        const orderToAdd = {
            id: Date.now().toString(),
            date: date,
            products: shoppingCart,
            totalProducts: shoppingCart.length,
            totalPrice: totalPrices(shoppingCart)
        }
        addOrder(orderToAdd);
        navigate(`/my-order?id=${orderToAdd.id}`);
    }
    return (
        <aside
        className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>My Order</h2>
            <div>
            <XMarkIcon
                className='h-6 w-6 text-black cursor-pointer'
                onClick={() => closeCheckoutSideMenu()}></XMarkIcon>
            </div>
        </div>
        <div className='px-6 overflow-y-scroll'>
            {
            shoppingCart.map(product => (
                <OrderCard
                    key={product.id}
                    removeProduct={removeProduct}
                    {...product}
                />
            ))
            }
        </div>
        <div className='px-6'>
            <p className='flex justify-between items-center'>
                <span className='font-light'>Total:</span>
                <span className='font-medium text-2xl'>${totalPrices(shoppingCart)}</span>
            </p>
            <button 
                className='bg-black py-3 text-white w-full rounded-lg' 
                onClick={() => handleCheckout()}
            >
                Checkout
            </button>
        </div>
        </aside>
    )
}

export default CheckoutSideMenu