import React,{memo} from 'react'
import clsx from 'clsx';
import { useFormContext } from "react-hook-form";
const InputForm = ({lable,disabled, errors, id,validate, type = 'text',placeholder,fullWidth, defaultValue,style}) => {
  const { register } = useFormContext();
  return (
    <div className={clsx('flex flex-col h-[78px] gap-2',style)}>
      {lable && <lable htmlfor={id}>{lable}</lable>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx('form-input m-auto text-gray-900',fullWidth && 'w-full')}
        defaultValue={defaultValue}
      />
      {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message?.toString()}</small>}
    </div>
  )
}

export default memo(InputForm)