import { useContext} from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'
import Search from '../../Components/Search'


function Home() {
  const {filteredProducts, setSearchByCategory} = useContext(ShoppingCartContext);
  const url = new URL(window.location.href);
  const category = url.pathname.split('/')[1];

    if (category) {
        setSearchByCategory(category);
    } else {
        setSearchByCategory('');
    }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Products</h1>
      </div>
      <Search placeholder='Search product...' />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {
          filteredProducts?.map(product => (
            <Card key={product.id} data={product} />
          ))
        }
      </div>
      <ProductDetail/>
    </Layout>
  )
}

export default Home



// function Home() {
//   const context = useContext(ShoppingCardContext)
//   const currentPath = window.location.pathname
//   let index = capitalizarPrimeraLetra(currentPath.substring(currentPath.lastIndexOf('/')+1))
//   console.log(context.items)
//   const renderView = ()=>{
//     if(context.searchByTitle?.length > 0){
//       if(context.filterItems?.length > 0){
//         if(index){
//           return (
//             context.filterItems?.filter(item => item.category.name === index).map((item)=>(
//               <Card key={item.id} data = {item}/>
//            ))
//           )
//         }else{
//       return (
//           context.filterItems?.map((item)=>(
//             <Card key={item.id} data = {item}/>
//          ))
//         )}}else{
//           return(
//             <div>We don't have anything</div>
//           )
//         }'