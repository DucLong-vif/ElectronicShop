import React from 'react'
import {navigation} from '../ultils/contants';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-2 border-y mb-6 text-sm flex items-center'>
      {navigation.map(el => (
        <NavLink to={el.path} key={el.id}
         className={({isActive}) => isActive ? 'pr-12 hover:text-red-600 text-main' :'pr-12 hover:text-red-600'}
         >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default Navigation