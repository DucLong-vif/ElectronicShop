import React,{memo, Fragment, useState} from 'react'
import { adminSidebar } from '../../ultils/contants';
import {NavLink , Link} from 'react-router-dom'
import clsx from 'clsx';
import path from '../../ultils/path'
import { AiOutlineCaretDown , AiOutlineCaretRight} from 'react-icons/ai'
const activedStyle = 'flex px-4 py-2 items-center gap-2 bg-gray-500';
const notActivedStyle = 'flex px-4 py-2 items-center gap-2 hover:bg-gray-600 ';

const AdminSidebar = () => {
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabID) => {
        if(actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev,tabID])
    }
  return (
    <div className=' bg-zinc-700 h-full py-4'>
        <Link to={`/${path.HOME}`} className='flex flex-col justify-center items-center p-4 gap-2'>
            <img src='https://gudlogo.com/wp-content/uploads/2019/04/logo-L17.jpg' alt='logo'
                className='w-[200px] h-[80px] object-cover'
            />
            <small className='font-semibold'>Quản Trị Viên</small>
        </Link>
        <div className=''>
            {adminSidebar?.map(el=>(
                <Fragment key={el.id}>
                    {el.type === 'SINGLE' && 
                    <NavLink 
                        to={el.path}
                        className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                    >
                       <span>{el.icon}</span>
                       <span>{el.text}</span>
                    </NavLink>
                    }
                    {el.type === 'PARENT' && 
                       <div 
                            className='flex flex-col'
                            onClick={() => handleShowTabs(+el.id)}
                        >
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-600 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived.some(id => id === el.id) ? <AiOutlineCaretRight/> : <AiOutlineCaretDown/>}
                            </div>
                            {actived.some(id => +id === +el.id) && 
                                <div 
                                    className='flex flex-col'
                                >
                                {el.submenu?.map(item => (
                                    <NavLink 
                                        key={el.text} 
                                        to={item.path}
                                        onClick={e => e.stopPropagation()}
                                        className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle,'pl-10')}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>
                            }
                       </div>
                    }
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default memo(AdminSidebar)