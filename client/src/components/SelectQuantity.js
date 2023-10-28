import React,{memo} from 'react'

const SelectQuantity = ({quantity,handleQuantity,handleChangeQuantity,handleBlur,handleForcus}) => {
  return (
    <div className='flex items-center'>
        <span onClick={() => handleChangeQuantity('minus')} className='p-2 h-[34px] cursor-pointer border-r border-black'>-</span>
        <input
        type='text'
        className='py-2 outline-none w-[50px] text-black text-center'
        value={quantity}
        onChange={handleQuantity}
        onBlur={handleBlur}
        onFocus={handleForcus}
        />
        <span onClick={() => handleChangeQuantity('plus')} className='p-2 h-[34px] cursor-pointer border-l border-black'>+</span>
    </div>
  )
}

export default memo(SelectQuantity)