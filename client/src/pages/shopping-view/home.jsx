import React, { useEffect, useState } from 'react'
import SampleImageOne from '../../assets/SampleImageOne.jpg'
import SampleImageTwo from '../../assets/SampleImageTwo.jpg'
import SampleImageThree from '../../assets/SampleImageThree.jpg'
import { Button } from '@/components/ui/button';
import { BabyIcon, ChartNoAxesColumnIncreasingIcon, ChevronsLeftIcon ,ChevronsRightIcon, CloudLightningIcon, FanIcon, FlowerIcon, FootprintsIcon, GemIcon, PandaIcon, ShirtIcon, SunIcon, UmbrellaIcon, WatchIcon} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/admin/products-slice';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from './shopping-Product-Tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { toast } from 'sonner';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { getFeatureImages } from '@/store/common';
function ShoppingHome() {
  const slides=[ SampleImageTwo,SampleImageThree,SampleImageOne];
  const [currentSlide, setCurrentSlide]= useState(0);
  const dispatch=useDispatch()
  const {productsList,productDetails}= useSelector(state=>state.shopProducts)
  const {user} = useSelector(state=>state.auth)
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const navigate = useNavigate()
 const { featureImageList } = useSelector(state => state.commonFeatureSlice)
  const Length = featureImageList?.length>0?featureImageList.length:1
  const categoriesWithIcon= [
    { id: "men", label: "Men" ,icon:ShirtIcon},
    { id: "women", label: "Women" ,icon: FlowerIcon}, 
    { id: "kids", label: "Kids",icon:BabyIcon },
    { id: "accessories", label: "Accessories" ,icon:WatchIcon},
    { id: "footwear", label: "Footwear",icon:FootprintsIcon },
  ]
  const brandswithIcon= [
    { id: "nike", label: "Nike",icon:ShirtIcon },
    { id: "adidas", label: "Adidas" ,icon:ChartNoAxesColumnIncreasingIcon},
    { id: "puma", label: "Puma",icon:PandaIcon },
    { id: "levi", label: "Levi's",icon:FanIcon },
    { id: "zara", label: "Zara",icon:GemIcon  },
    { id: "h&m", label: "H&M" ,icon:SunIcon},
  ]

  function handleNavigateToListingPage(getCurrentItem,section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]:[getCurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate('/shop/listing')

  }

  
function handleGetProductDetails(getCurrentProductId){
console.log(getCurrentProductId, "current product id");
dispatch(fetchProductDetails(getCurrentProductId));

}


function handleAddtoCart(getCurrentProductId){
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
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide=>(Length>1?prevSlide+1:1)%Length)
    },6000);
    return ()=>(clearInterval(timer));
  },[featureImageList])



useEffect(()=>{
  dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:'price-lowtohigh'}))
  
},[])
useEffect(()=>{
  dispatch(getFeatureImages())
  
},[])

// console.log(productsList)

console.log(Length,'length')
useEffect(()=>{
    if(productDetails!==null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])

  return (
    <div className='flex flex-col min-h-screen  '>
      <div className='relative w-full h-[600px] overflow-hidden' >
        {featureImageList && featureImageList.length>0?
         featureImageList.map((slide,index)=>
        <img 
        src={slide.image}
        key={index}
        className={`${index===currentSlide?'opacity-100':'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        /> 
        ) :
        <img 
        src={SampleImageOne}
        key={'0'}
        className={` opacity-100 absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        /> 
        }
<Button variant='outline' size='icon' className='absolute top-1/2 left-4 tansform -translate-y-1/2'  onClick={()=>{
  setCurrentSlide(preSlide=>(Length>1?preSlide-1 +Length:1)%Length)
    console.log( currentSlide,"button pressed")
}}>
  <ChevronsLeftIcon className='w-4 h-4 '    />

</Button>
<Button variant='outline' size='icon' className='absolute top-1/2 right-4 tansform -translate-y-1/2'    onClick={()=>{
  setCurrentSlide(preSlide=>(Length>1?preSlide+1:1)%Length)
   console.log( currentSlide,"button pressed")
}} >
  <ChevronsRightIcon className='w-4 h-4 '    />

</Button>
 <div className='bg-transparent   w-120 h-20 relative top-50 left-20 text-4xl font-extrabold text-primary-foreground  [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]  '>
  "Exclusive picks waiting for your wardrobe".
  
  

 </div>
      </div>
<section className='py-12 bg-gray-50'>
  <div className='container mx-auto px-4'>
    <h2 className='text-3xl font-bold text-center mb-8'>
      Shop by Category
    </h2>

  </div>
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 px-3'>
    
    {
      categoriesWithIcon.map(categoryItem=><Card key={categoryItem.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
       <CardContent className='flex flex-col items-center justify-center p-6'   onClick={()=>handleNavigateToListingPage(categoryItem,'category')}>
        <categoryItem.icon   className='w-12 h-12 mb-4 text-primary' stroke-width='1.5'/>
        <span className='text-xl text-muted-foreground font-semibold'>
          {categoryItem.label}

        </span>

       </CardContent>

      </Card>)
    }

  </div>

</section>

<section className='py-12 bg-gray-50'>
  <div className='container mx-auto px-4'>
    <h2 className='text-3xl font-bold text-center mb-8'>
      Shop by Brand
    </h2>

  </div>
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-4 px-3'>
    {
      brandswithIcon.map(brandItem=><Card key={brandItem.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
       <CardContent className='flex flex-col items-center justify-center p-6'   onClick={()=>handleNavigateToListingPage(brandItem,'brand')}>
        <brandItem.icon   className='w-12 h-12 mb-4 text-primary' stroke-width='1.5'/>
        <span className='text-xl text-muted-foreground font-semibold'>
          {brandItem.label}

        </span>

       </CardContent>

      </Card>)
    }

  </div>

</section>
<section className='py-12'>
   
  <div className='container mx-auto px-4'>
    <h2 className='text-3xl font-bold text-center mb-8'>
      Feature Products
    </h2>

  </div>

  <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-3'>
     {/* <div className='container flex gap-4 px-3 overflow-x-auto '></div> */}
            {
              productsList && productsList.length>0?
              productsList.map(productItem=>
                <ShoppingProductTile  product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} />
              ):null
            }
  </div>
</section>
    <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}  />
    </div>
  )
}

export default ShoppingHome