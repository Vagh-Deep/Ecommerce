import { Input } from '@/components/ui/input'
import { getSearchResults, setSearchResults } from '@/store/shop/search-slice'
import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import ShoppingProductTile from './shopping-Product-Tile'
import { Skeleton } from '@/components/ui/skeleton'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast } from 'sonner'
import ProductDetailsDialog from '@/components/shopping-view/product-details'
import { fetchProductDetails } from '@/store/shop/products-slice'
function ProductsSearch() {
    const [keyword,setKeyword] = useState('')
    const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
      const {productDetails}=useSelector(state=>state.shopProducts)
    const [searchParams,setSearchParams] = useSearchParams()
    const {searchResults, isLoading} = useSelector(state=>state.shopSearch)
     const {cartItems} = useSelector(state=>state.shopCart)
          const {user} = useSelector(state=>state.auth)
   const dispatch = useDispatch()

    function handleOnValueChange(event){
        setKeyword(event.target.value);
    }

      function handleAddtoCart(getCurrentProductId,getTotalStock){

    let getCartItems= cartItems.items || [];
    console.log(getCartItems,'getCartItems',getTotalStock)
    if(getCartItems.length){
      const indexOfCurrentItem= getCartItems.findIndex(item=>item.productId===getCurrentProductId);
      if(indexOfCurrentItem>-1)
      {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity
        if(getQuantity+1>getTotalStock){
          toast(`only ${getQuantity} quantity can be added for this product`,{
            style:{
              backgroundColor:'red'
            }
          })
          return;
        }
      }
    }

    console.log(getCurrentProductId,"addign product ot cart") 
    dispatch(addToCart({userId:user?.id,productId:getCurrentProductId,quantity:1})).then(data=>{
      console.log(data)
      if(data?.payload?.success)
     { dispatch(fetchCartItems(user?.id)) 
      toast('Product added to Cart ')
     }
    }).catch(error=>{
      console.log(error)
        toast('Unable to add product to cart', {style:{
    background: "#d84333ff",
    color: "#ffffffff",
        }} )

    })

  }

function handleGetProductDetails(getCurrentProductId){
console.log(getCurrentProductId, "current product id");
dispatch(fetchProductDetails(getCurrentProductId));

} 
    useEffect(()=>{
     if(keyword && keyword.trim()!=='' && keyword.trim().length>=3){
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
              dispatch(getSearchResults(keyword));
        // setTimeout(()=>{
        //        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        //       dispatch(getSearchResults(keyword));
        // },1000)
        
     }
     else{
        setSearchParams(new URLSearchParams(``))
        dispatch(setSearchResults());
//         setTimeout(()=>{
//   setSearchParams(new URLSearchParams(``))
//         dispatch(setSearchResults());
//         },1000)
        
     }
    },[keyword])

    
      useEffect(()=>{
        if(productDetails!==null){
          setOpenDetailsDialog(true)
        }
      },[productDetails])
 

    console.log(searchResults);
  return <div className='container mx-auto md:px-3 px-3 py-6 '>

<div className='flex justify-center mb-8 ' >
    <div className='w-full flex items-center'>
        <Input placeholder='Search Products...' className={'py-6 '} value={keyword}  onChange={handleOnValueChange} name='keyword'/>
      

    </div>

</div>

{
    isLoading?     <div className='flex   gap-10'><Skeleton  className='rounded:sm w-70 h-50'/>
     
    <Skeleton  className='rounded-sm w-70 h-50'/>
    <Skeleton  className='rounded-sm w-70 h-50'/></div>  :<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>


    {  
        searchResults && searchResults.length>0?
        searchResults.map(item=><ShoppingProductTile product={item}  handleAddtoCart={handleAddtoCart} handleGetProductDetails={handleGetProductDetails}/>):keyword.trim().length>2?<h1 className='text-3xl font-extrabold text-center ' >No result found</h1>:null
    }
</div> 
}
   <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}  />
  </div>
}

export default ProductsSearch