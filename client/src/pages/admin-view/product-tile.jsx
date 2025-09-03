import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'

function AdminProductTile({ product,setOpenCreateProductsDialog, setCurrentEditedId,setFormData ,handleDelete}) {
     {console.log(product?._id)}
  return (
    <Card className={'w-full max-w-sm mx-auto'}>
      <div>
        <div className='relative'>
          <img src={product?.image}
            alt={product?.title}
            className='w-full h-[300px] object-cover rounded-t-lg'
          />

        </div>

        <CardContent>
          <h2 className='text-xl font-bold mb-2 mt-2' >{product?.title}</h2>
          <div className='flex justify-between items-center mb-2'>
            <span className={`  ${product?.salePrice > 0 ? 'line-through' : null} text-lg font-semibold text-primary `} >${product?.price}</span>
            <span className='text-lg font-bold'>{
            product?.salePrice>0?
           ` $${product?.salePrice}`:null}</span>
          </div>
        </CardContent>
        <CardFooter className={'flex justify-between items-center '} >
          <Button onClick={()=>{
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product);
          
            
          }}>
            Edit
          </Button>
          <Button   onClick={()=>{handleDelete(product?._id)}}>
            Delete
          </Button>

        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile