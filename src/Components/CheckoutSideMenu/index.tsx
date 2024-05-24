import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import './styles.css'
import OrderCard from '../OrderCard'

const CheckoutSideMenu = () => {
    const {closeCheckoutSideMenu, isCheckoutSideMenuOpen, shoppingCart} = useContext(ShoppingCartContext)

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
                    {...product}
                />
            ))
            }
        </div>
        </aside>
    )
}

export default CheckoutSideMenu