import React,{memo} from 'react'
import icons from '../ultils/icons';
const {MdEmail,FiMapPin,BsTelephoneFill} = icons;
const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between'>
          <div className='flex flex-col flex-1'>
            <span className='text-[20xp] text-gray-100'>ĐĂNG KÝ BẢN TIN</span>
            <small className='text-[13px] text-gray-300'>Đăng ký ngay và nhận bản tin hàng tuần</small>
          </div>
          <div className='flex-1 flex items-center'>
          <input
            className='p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 
            placeholder:text-sm placeholder:text-gray-100 placeholder:italic placeholder:opacity-50'
            type='text'
            placeholder='Email adress'
          />
          <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white'>
              <MdEmail size={18}/>
          </div>
          </div>
        </div>
      </div>
      <div className='h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]'>
        <div className='w-main flex'>
          <div className='flex-2 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl[15px]'>ABOUT US</h3>
            <span className='flex'>
              <span className='pr-2'><FiMapPin/></span>
              <span className='pr-2'>Address:</span>
              <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>
            <span className='flex'>
              <span className='pr-2'><BsTelephoneFill/></span>
              <span className='pr-2'>Phone:</span>
              <span className='opacity-70'>0862.596.836</span>
            </span>
            <span className='flex'>
              <span className='pr-2'><MdEmail/></span>
              <span className='pr-2'>Mail: </span>
              <span className='opacity-70'>duclong56@gmail.com</span>
            </span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl[15px]'>ABOUT US</h3>
            <span className='opacity-70'>Typography</span>
            <span className='opacity-70'>Gallery</span>
            <span className='opacity-70'>Store Location</span>
            <span className='opacity-70'>Today's Deals</span>
            <span className='opacity-70'>Contact</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl[15px]'>WHO WE ARE</h3>
            <span className='opacity-70'>Help</span>
            <span className='opacity-70'>Free Shipping</span>
            <span className='opacity-70'>FAQs</span>
            <span className='opacity-70'>Return & Exchange</span>
            <span className='opacity-70'>Testimonials</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl[15px]'>#DIGITALWORLDSTORE</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Footer)