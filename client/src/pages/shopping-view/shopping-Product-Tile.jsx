import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { brandOptionMap, categoryOptionMap } from '@/config'
import React from 'react'

function ShoppingProductTile({product,handleGetProductDetails,handleAddtoCart}) {
  return (
     <Card className='w-full max-w-sm mx-auto'>
      <div onClick={()=>handleGetProductDetails(product?._id )}>
        <div className='relative'>
          <img src={product?.image} 
               alt={product?.title} 
               className='w-full h-[300px] object-cover rounded-t-lg'
          />
          {
          
          }
{
            product?.totalStock==0 ? 
            <Badge  className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>Out of Stock</Badge>:product?.totalStock<=10?  <Badge  className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>{product?.totalStock} Piece left</Badge> :  product?.salePrice>0 ? 
            <Badge  className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>sale</Badge>:null
          }


        </div>
        <CardContent className='p-4'>
            <h2 className='text-xl font-bold mb-2 w-[80%] whitespace-nowrap overflow-hidden text-ellipsis'>{product?.title}</h2>
            <div className='flex justify-between item-center mb-2' >
               <span className='text-md text-muted-foreground'>{categoryOptionMap[product?.category]
                }</span>
                <span  className='text-md text-muted-foreground'>{brandOptionMap[ product?.brand]
                }</span>
            </div>
              <div className='flex justify-between item-center mb-2' >
               <span className={`${product?.salePrice>0?'line-through':''} text-lg text-primary font-semibold`}>$ {product?.price}</span>
               {
                product?.salePrice>0? <span  className='text-lg text-primary font-semibold'>$ {product?.salePrice}</span> :null
               }
                
            </div>

        </CardContent>
        <CardFooter>


          {
            product?.totalStock===0?(
              <Button className='w-full cursor-not-allowed opacity-70 ' onClick={(e)=>{ e.stopPropagation()
               }}>
                Out of Stock
            </Button>
            ):<Button className='w-full ' onClick={(e)=>{ e.stopPropagation()
              handleAddtoCart(product?._id,product?.totalStock)}}>
                Add to Cart
            </Button>
          }
             
        </CardFooter>
      </div>
     </Card>
  )
}

export default ShoppingProductTile