import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router-dom'
import { Product } from '../../lib/definitions'
import { totalPrices } from '../../utils'

function MyOrder() {
  const {order} = useContext(ShoppingCartContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // Busca la orden correspondiente al ID
  const orderById = order.find(o => o.id === id);



  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className='flex flex-col w-80'>
        {
          orderById?.products.map((product: Product) => (
            <OrderCard
              key={product.id}
              {...product}
            />
          ))
        }
        <span className='font-medium text-2xl'>${orderById ? totalPrices(orderById.products) : 0}</span>
      </div>
    </Layout>
  )
}

export default MyOrder