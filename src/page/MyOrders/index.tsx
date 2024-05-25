import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import { useContext } from 'react'
import OrdersCard from '../../Components/OrdersCard'

function MyOrders() {
  const {order} = useContext(ShoppingCartContext)
  return (
    <Layout>
      <div 
        className='flex items-center justify-center relative w-80 mb-4'
      >
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {
        order.map((order, index) => (
          <Link 
            key={index} 
            to={`/my-order?id=${order.id}`}
          >
            <OrdersCard
              key={order.id}
              {...order}
            />
          </Link>
        ))
      }
    </Layout>
  )
}

export default MyOrders