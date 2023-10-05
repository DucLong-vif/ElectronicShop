import React,{useState} from 'react'
import {formatMoney} from '../ultils/helpers'
import lable from '../assets/lable.png'
import trending from '../assets/trending_1.png';
import {renderStarFromNumber} from '../ultils/helpers';
import {SelectOption} from './'
import icon from '../ultils/icons';
import {Link} from 'react-router-dom';
import path from '../ultils/path'

const {AiFillEye,GiHamburgerMenu,BsSuitHeartFill} = icon;

const Product = ({productData, isNew}) => {
  const [isShowOption, setisShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link className='w-full border p-[15px] flex flex-col items-center'
      to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
      onMouseEnter={e => {
        e.stopPropagation();
        setisShowOption(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation();
        setisShowOption(false)
      }}
      >
        <div className='w-full relative'>
          {isShowOption &&
            <div className='absolute bottom-[-10px] flex left-0 right-0 justify-center gap-2 animate-slide-top'>
              <SelectOption icon={<BsSuitHeartFill/>}/>
              <SelectOption icon={<GiHamburgerMenu/>}/>
              <SelectOption icon={<AiFillEye/>}/>
          </div>
          }
        <img src={productData?.thumb || ' '} alt='images' className='w-[274px] h-[274px] object-contain'/>
        <img src={isNew ? lable : trending} alt='' className={`absolute 
        ${isNew ? 
        'top-[-15px] right-[-14px] w-[100px] h-[35px] object-cover' 
        : 'top-[-32px] right-[-14px] w-[100px] h-[85px]'}`}/>
        <span className={`absolute bold top-[-10px] right-[7px] text-white ${isNew ? '' : 'text-sm top-[-8px] right-[1px]'}`}>{isNew ? 'New' : 'Trending'}</span>
        </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span className='flex'>
                {renderStarFromNumber(productData?.totalRatings,14)?.map((el, index)=>(
                  <span key={index}>{el}</span>
                ))}  
          </span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product