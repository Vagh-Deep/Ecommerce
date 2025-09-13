import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

function StarRatingComponent({rating,setRating,disabled = false}) {
  
  return  [1,2,3,4,5].map((star)=>(
    <Button disabled={disabled} variant='outline' size='icon' className={`p-2 rounded-full transition-colors ${star<=rating?'text-yellow-500 hover:bg-black  hover:text-yellow-500':'text-black hover:bg-black hover:text-primary-foreground'}`}
    onClick={()=>setRating(rating==star?0:star)}>
      <StarIcon className={`w-6 h-6 ${star<=rating?'fill-yellow-500':'fill-white'}`}/>
    </Button>
  ))
}

export default StarRatingComponent