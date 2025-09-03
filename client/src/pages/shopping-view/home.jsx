import React, { useEffect, useState } from 'react'
import SampleImageOne from '../../assets/SampleImageOne.jpg'
import SampleImageTwo from '../../assets/SampleImageTwo.jpg'
import SampleImageThree from '../../assets/SampleImageThree.jpg'
import { Button } from '@/components/ui/button';
import { BabyIcon, ChartNoAxesColumnIncreasingIcon, ChevronsLeftIcon ,ChevronsRightIcon, CloudLightningIcon, FanIcon, FlowerIcon, FootprintsIcon, GemIcon, PandaIcon, ShirtIcon, SunIcon, UmbrellaIcon, WatchIcon} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/admin/products-slice';
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ShoppingProductTile from './shopping-Product-Tile';
import { useNavigate } from 'react-router-dom';
function ShoppingHome() {
  const slides=[ SampleImageTwo,SampleImageThree,SampleImageOne];
  const [currentSlide, setCurrentSlide]= useState(0);
  const dispatch=useDispatch()
  const {productsList}= useSelector(state=>state.shopProducts)
  const navigate = useNavigate()


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

  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide=>(prevSlide+1)%slides.length)
    },6000);
    return ()=>(clearInterval(timer));
  },[])



useEffect(()=>{
  dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:'price-lowtohigh'}));
},[])
console.log(productsList)



  return (
    <div className='flex flex-col min-h-screen  '>
      <div className='relative w-full h-[600px] overflow-hidden' >
        {
         slides.map((slide,index)=>
        <img 
        src={slide}
        key={index}
        className={`${index===currentSlide?'opacity-100':'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        />
        )
        }
<Button variant='outline' size='icon' className='absolute top-1/2 left-4 tansform -translate-y-1/2'  onClick={()=>{
  setCurrentSlide(preSlide=>(preSlide-1 + slides.length)%slides.length)
}}>
  <ChevronsLeftIcon className='w-4 h-4 '    />

</Button>
<Button variant='outline' size='icon' className='absolute top-1/2 right-4 tansform -translate-y-1/2'    onClick={()=>{
  setCurrentSlide(preSlide=>(preSlide+1)%slides.length)
   console.log("button pressed")
}} >
  <ChevronsRightIcon className='w-4 h-4 '    />

</Button>

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
            {
              productsList && productsList.length>0?
              productsList.map(productItem=>
                <ShoppingProductTile  product={productItem}  />
              ):null
            }
  </div>
</section>
    </div>
  )
}

export default ShoppingHome