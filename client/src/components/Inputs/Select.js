import React,{memo} from 'react';
import clsx from 'clsx'

const Select = ({lable,options=[],register,errors,id,validate,style,fullWidth,defaultValue}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
        {lable && <lable htmlFor={id}>{lable}</lable>}
        <select defaultValue={defaultValue} className={clsx('form-select m-auto text-gray-900 items-center',fullWidth && 'w-full',style)} 
          id={id} 
          {...register(id,validate)}>
            <option value="">---Chọn---</option>
            {options?.map(el => (
                <option value={el.code}>{el.value}</option>
            ))}
        </select>
        {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(Select)