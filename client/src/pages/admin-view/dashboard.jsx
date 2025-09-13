import React, { useEffect } from 'react'
import { useState } from 'react';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from '@/store/common';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';
function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector(state => state.commonFeatureSlice)

  const dispatch = useDispatch()

  function handleDeleteFeatureImage(featureImageId) {
    console.log(featureImageId, 'feature Image Id')

    dispatch(deleteFeatureImage(featureImageId)).then(data => {
      if (data?.payload?.success) {
        toast("Image Deleted Successfully")
        dispatch(getFeatureImages())
      }
    })


  }

  function handleUploadFeatureImage() {

    if (!uploadedImageUrl) { toast("please add an Image", { style: { backgroundColor: 'red' } }); return; }
    dispatch(addFeatureImage(uploadedImageUrl)).then(data => {
      console.log(data, 'data')
      if (data?.payload?.success) {
        toast("Feature Image uploaded SuccessFully")
        dispatch(getFeatureImages())

      }
    }).catch(err => {
      console.log(err)
      toast("Error Occured", {
        style: {
          backgroundColor: "red"
        }
      })
    })
    setImageFile(null)
    setUploadedImageUrl(null)



  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])
  console.log(featureImageList, 'featureImageLIst')

  return (
    <div className='w-full '>


      <ProductImageUpload
        file={imageFile}
        setFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      //  isEditMode={currentEditedId!==null} setCurrentEditedId={setCurrentEditedId}
      />

      <Button className={'mt-5 w-full'} onClick={handleUploadFeatureImage} >
        Upload
      </Button>




      <div className='container overflow-x-auto  flex mt-4 gap-3'>
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImageItem, index) => (
            <Card
              key={featureImageItem.id ?? index}
              className="flex-shrink-0 w-[340px] h-[200px] my-2  hover:shadow-md relative"
            >
              <CardContent className="p-0 w-full h-full">
                <div className='w-full h-full'>
                  <img
                    src={featureImageItem.image}
                    alt={`feature-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className='bg-transparent opacity-0 flex flex-col justify-end items-end p-6 absolute hover:opacity-100   inset-0'>
                    <TrashIcon onClick={() => handleDeleteFeatureImage(featureImageItem._id)} />
                  </div>




                </div>
              </CardContent>
            </Card>
          ))
        ) : null}

      </div>





    </div >
  )
}

export default AdminDashboard 