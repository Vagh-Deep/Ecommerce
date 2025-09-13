import Productfilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails, setProductDetails } from '@/store/shop/products-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from './shopping-Product-Tile'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from '@/components/shopping-view/product-details'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast } from 'sonner'
 


function ShoppingListing() {
  const dispatch = useDispatch();
  const {productsList,productDetails}=useSelector(state=>state.shopProducts)
  const {user} = useSelector(state=>state.auth)
  
  const [filters,setFilters]= useState({})
  const [sort,setSort]= useState(null)
  const [searchParams,setSearchParams]= useSearchParams()
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const {cartItems} = useSelector(state=>state.shopCart)
  const categorySearchParam = searchParams.get('category')

  console.log('listing renderd')
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


  function createSearchParamsHelper(filterParams){
    const queryParams=[]
    for(const [key,value] of Object.entries(filterParams)){
      if(Array.isArray(value)&& value.length>0){
        const paramValue = value.join(',');
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&')
  }
function handleSort(value){
console.log(value)
setSort(value)
}
function handleFilter(getSectionId,getCurrentOption){
  console.log(getSectionId,getCurrentOption)

let cpyFilters ={...filters}
const indexOfCurrentSection= Object.keys(cpyFilters).indexOf(getSectionId);
if(indexOfCurrentSection===-1){
  cpyFilters={...cpyFilters,[getSectionId]:[getCurrentOption]}
}

else{
  const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
  if(indexOfCurrentOption===-1){
    cpyFilters[getSectionId].push(getCurrentOption);

  }
  else{
    cpyFilters[getSectionId].splice(indexOfCurrentOption,1)
  }
}
 
setFilters(cpyFilters)
sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
 

}

useEffect(()=>{
  if(filters && Object.keys(filters).length>0){
    const createQueryString =createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString));

  
  }

},[filters])
useEffect(()=>{
  console.log("listeing mounted")
  setSort("price-lowtohigh")
  setFilters(JSON.parse(sessionStorage.getItem("filters"))||{})
},[categorySearchParam])
 
// useEffect(()=>{

//   const currentFilter = JSON.parse(sessionStorage.getItem("filters"))||{};
//   if(currentFilter && currentFilter.category && currentFilter?.category?.length==1 ){



    
//     if(filters && filters.category && filters.category.length && (currentFilter?.category[0]!=filters?.category[0] || currentFilter.category.length!=filters.category.length)){
//       setFilters(currentFilter);
       
//     }
//   }
// }) 
  useEffect(()=>{
    if(filters!==null && sort!==null)
dispatch(fetchAllFilteredProducts({filterParams:filters,sortParams:sort}))
  },[dispatch,sort,filters])

  useEffect(()=>{
    if(productDetails!==null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])


  // console.log(productsList, 'this is shop products')
  // console.log(productDetails,'current product details')
   
  // console.log(productsList,'product list')
console.log(cartItems,'cartItems')
  

  // console.log(filters,searchParams,'filters')
  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <Productfilter filters={filters} handleFilter={handleFilter}/>
      <div className='bg-background w-full rounded-lg shadow-sm' >
        <div className='p-4 border-b flex items-center justify-between' >
          <h2 className='text-lg font-semibold'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>
              {productsList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDown className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>



              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[200px]'>
                <DropdownMenuRadioGroup  value={sort} onValueChange={handleSort} >
                  {
                    sortOptions.map(sortItem => <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>

              </DropdownMenuContent>
            </DropdownMenu>

          </div>

        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            productsList && productsList.length>0 ?
            productsList.map(proudctItem=>(<ShoppingProductTile product={proudctItem} key={proudctItem._id}  handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart}/>) ):null

          }

        </div> 

      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}  />
    </div>
  )
}

export default ShoppingListing