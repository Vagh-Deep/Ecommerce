import { filterOptions } from '@/config'
 
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

function Productfilter({filters,handleFilter}) {
  return (
    <div className='bg-background rounded-lg shadow-sm' >
        <div className='p-4 border-b' >
            <h2  className='text-lg font-semibold' >filters </h2>

        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map(keyItem=><Fragment>
                    <div>
                        <h3 className='text-base font-extrabold'>
                            {keyItem}
                        </h3>
                        <div className='grid gap-2 mt-2'>
                        {
                           filterOptions[keyItem].map(option=>(
                            <Label className='flex item-center font-medium gap-2'>
                                <Checkbox  className='border-1 border-gray-500'  onCheckedChange={()=>handleFilter(keyItem,option.id)} 
                                    // checked={JSON.parse(sessionStorage.getItem('filters'))?.[keyItem]?.includes(option.id)}

                                    checked={filters && Object.keys(filters).length>0 &&
                                        filters[keyItem] && 
                                        filters[keyItem].indexOf(option.id)>-1
                                    }
                                    />
                                {option.label}
                            </Label>
                           ))
                        }
                        </div>
                    </div>
                    <Separator/>
                </Fragment>)
            }
        </div>
    </div>
  )
}

export default Productfilter