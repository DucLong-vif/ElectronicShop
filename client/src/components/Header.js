import React from 'react'
import logo from '../assets/logo.png';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
const Header = () => {
  return (
    <div className=' w-main flex justify-between h-[110px] py-[35px]'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt='logo' className='w-[234px] object-contain'/>
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <icons.RiPhoneFill color='red'/>
            <span className='font-semibold'>0862 596 836</span>
          </span>
          <span>
            Mon-Sat 9:00AM - 8:00PM
          </span>
        </div>

        <div className='flex flex-col items-center px-6 border-r'>
          <span className='flex gap-4 items-center'>
            <icons.MdEmail color='red'/>
            <span className='font-semibold'>lothienvi245@gmail.com</span>
          </span>
          <span>
              Online Support 24/7
          </span>
        </div>

        <div className='flex items-center justify-center gap-2 px-6 border-r'>
          <icons.BsCartCheckFill color='red'/>
          <span>
            0 item(s)
          </span>
        </div>

        <div className='flex items-center justify-center px-6'>
          <icons.BiSolidUserPin size={24}/>
        </div>
      </div>
    </div>
  )
}

export default Header