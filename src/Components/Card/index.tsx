import { useContext } from 'react';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Product } from '../../lib/definitions';
import { ShoppingCartContext } from '../../Context'


const Card = ({data}: {data: Product}) => {
    const { addProduct, shoppingCart, removeProduct, openProductDetail, setProductToShow, openCheckoutSideMenu, closeProductDetail } = useContext(ShoppingCartContext)
    
    let imageUrl = '';
    try {
        imageUrl = data.images[0];
    } catch (error) {
        console.error('Error parsing image URL:', error);
    }

    const showProduct = ( productDetail: Product) => {
        openProductDetail()
        setProductToShow(productDetail)
    }

    const handleAddProduct = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, productData: Product) => {
        event.stopPropagation();
        addProduct(productData);
        openCheckoutSideMenu()
        closeProductDetail()
    }
    const handleRemoveProduct = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, productData: Product) => {
        event.stopPropagation();
        removeProduct(productData);
        closeProductDetail()
    }



    const renderIcon =(data: Product)=>{
        const isInCart = shoppingCart.filter(product => product.id === data.id).length > 0;
        if(isInCart){
            return(
                <div
                    className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
                    onClick={(event) => handleRemoveProduct(event, data)}
                    >
                    <CheckIcon className='h-6 w-6 text-white'/>
                </div>
            )
        } else{
            return(
                <div
                    className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
                    onClick={(event) => handleAddProduct(event, data)}
                >
                    <PlusIcon className='h-6 w-6 text-black'/>
                </div>
            )
        }
    }
    

    return (
    <div 
        className='bg-white cursor-pointer w-56 h-60 rounded-lg'
        onClick={() => showProduct(data)}
    >
        <figure className='relative mb-2 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.category.name}</span>
            <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={data.title} />
            {renderIcon(data)}
        </figure>
        <p className='flex justify-between'>
            <span className='text-sm font-light'>{data.title}</span>
            <span className='text-lg font-medium'>${data.price}</span>
        </p>
        </div>
    )
}

export default Card;