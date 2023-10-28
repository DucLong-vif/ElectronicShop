import React,{useRef,useEffect} from 'react'
import {AiFillStar} from 'react-icons/ai';

const Votebar = ({number,ratingCount,ratingTotal}) => {
    const ref = useRef();
    const persent =  Math.round(ratingCount * 100/ratingTotal) || 0;
    useEffect(()=>{
        ref.current.style.cssText = `right: ${100 - persent}%`
    },[ratingCount,ratingTotal,persent])
  return (
    <div className='flex items-center gap-2 text-sm text-gray-500'>
        <div className='flex w-[10%] items-center justify-center gap-1 text-sm'>
            <span>{number}</span>
            <AiFillStar color='orange'/>
        </div>
        <div className='w-[70%]'>
            <div className='w-full relative h-[6px] bg-gray-300 rounded-l-full rounded-r-full'>
                <div ref={ref} className='absolute inset-0 bg-red-500 rounded-l-full rounded-r-full'></div>
            </div>
        </div>
        <div className='w-[20%] flex justify-end text-xs text-gray-400'>
            {`${ratingCount || 0} Người đánh giá`}
        </div>
    </div>
  )
}

export default Votebar