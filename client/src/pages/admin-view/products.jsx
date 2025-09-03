import { Button } from '@/components/ui/button'
import React, { Fragment, useEffect, useState } from 'react'
import { CirclePlus ,Box} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CommonForm from '@/components/common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import { toast } from "sonner"
import AdminProductTile from './product-tile';
const initialFormData={
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:'',

}

function AdminProducts() {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]= useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile,setImageFile] =useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState(null);
  const [imageLoadingState,setImageLoadingState]= useState(false);
  const [currentEditedId,setCurrentEditedId]= useState(null)
  const {productsList}=useSelector(state=>state.adminProducts)


    const dispatch = useDispatch();
    
  function onSubmit(event){
  event.preventDefault()
  currentEditedId!==null ? 
  dispatch(editProduct({id:currentEditedId,formData})).then(data=>{
    console.log(data, 'edited')
    setOpenCreateProductsDialog(false)
     toast(`Product edited successfully`)
  }):
  dispatch(addNewProduct({...formData,image:uploadedImageUrl})).then((data)=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts());
      setImageFile(null)
      setFormData(initialFormData)
      toast(`Product added successfully`)
      setOpenCreateProductsDialog(false)

    }
  })
 

  }
 function handleDelete(getCurrentProductId){
  console.log(getCurrentProductId)
  dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
    if(data?.payload?.success){
      toast('Product deleted succesfully');
      dispatch(fetchAllProducts())

    }
    else {
       toast('there is some problem while delting the product');
    }
  })
 }
  function isFormValid(){
    return Object.keys(formData)
    .map(key=>(formData[key]!==''  ))
    .every((item)=>item) && imageFile!==null
  }
  useEffect(()=>{
    console.log('fetching all products in admin products')
    dispatch(fetchAllProducts())
     
  },[dispatch,openCreateProductsDialog])
   
  return (
    <Fragment>

      <div className='mb-5 w-full flex justify-end'>
        <Button className='cursor-pointer ' onClick={()=>setOpenCreateProductsDialog(true)}>
       
          Add new Product 
          
          <CirclePlus />
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2'>
        {
          productsList && productsList.length>0 ?
          productsList.map((productItem)=>(
            
            <AdminProductTile   product={productItem} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setFormData={setFormData} handleDelete={handleDelete}/> 
          )):null
        }

      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>{setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      } }> 
        <SheetContent side='right' className='overflow-auto'>
<SheetHeader className='border-b'>
  <SheetTitle className='flex gap-3 '>
    <Box /> 
    {currentEditedId==null?' Add New Product':'Edit'}
    
  </SheetTitle>
</SheetHeader>
<ProductImageUpload  file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState } imageLoadingState={imageLoadingState} isEditMode={currentEditedId!==null} setCurrentEditedId={setCurrentEditedId}/>
 <div className='py-6 px-6' >
  <CommonForm  formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={currentEditedId==null?'Add Product':"Save Details"}  onSubmit={onSubmit} isBtnDisabled={!isFormValid()}/>
 </div>
        </SheetContent>

      </Sheet>
    </Fragment> 
  )
}

export default AdminProducts