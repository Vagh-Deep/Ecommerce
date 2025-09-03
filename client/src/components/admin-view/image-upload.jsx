import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { useRef } from 'react';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

function ProductImageUpload({ file, setFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState,isEditMode,   }) {
    const inputRef = useRef(null);
    const isFirstRun=useRef(true);
    function handleImageFileChange(event) {
        console.log("onChange fired")
        console.log(event.target.files)
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setFile(selectedFile);

    }
    function handleDragOver(event) {
        event.preventDefault();

    }
    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile)



    }

    function handleRemoveImage(event) {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = ''
        }





    }
    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', file);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data, { withCredentials: true });
        console.log(response, "response from upload image to cloudinary");
        if (response?.data?.success) {
            console.log(response.data.success)
            setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false);
        }
    }
    useEffect(() => {
         if(isFirstRun.current){
            isFirstRun.current=false;
           
         }
        else if (file !== null) { console.log(file ,'inside useEffect in the uplaod image ');uploadImageToCloudinary()}
        return () => {
          
    console.log("Unmounted");
  };
    }, [file])


    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className={` text-lg font-semibold mb-2 block px-6` }  > Upload Image  </Label>
            <div className='border-2 border-dashed rounded-lg p-4' onDragOver={handleDragOver} onDrop={handleDrop} >
                <Input id='image-upload' type='file'
                    className='hidden'
                    ref={inputRef} onChange={handleImageFileChange} 
                    disabled={isEditMode}/>
                {
                    !file ? <Label htmlFor="image-upload" className= {`${isEditMode?'cursor-not-allowed':' cursor-pointer'} flex flex-col items-center justify-center h-32 `}>
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                        <span> Drag and drop or click to upload image</span>
                    </Label> : ( 
                        imageLoadingState? 
                                 <Skeleton className={'h-10 w-10 bg-gray-400 animation-blink'} />:
                        <div className='flex items-center justify-between' >
                        <div className='flex items-center' >
                            <FileIcon className='w-7 h-8 text-primary mr-2' />
                        </div>
                        <p className='text-sm  font-medium' >{file.name}</p>
                        <Button onClick={handleRemoveImage} variant={'ghost'} size='icon' className={'text-muted-foreground hover:text-foreground'}>
                            <XIcon className='w-4 h-4' />
                            <span className='sr-only' >Remove Files</span>
                        </Button>
                    </div>)
                }

            </div>
        </div>
    )
}

export default ProductImageUpload