import React from 'react'
import clsx from 'clsx';
const InputField = ({value,setValue,nameKey,type,invalidFields, setInvalidFields,style,fullwidth ,placeholder ,isHideLable}) => {
  return (
    <div className={clsx('flex flex-col relative',fullwidth && 'w-full')}>
        {!isHideLable && value?.trim() !== '' && <label className='text-[14px]' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
        <input
        type={type||'text'}
        className={clsx('p-4 py-1 rounded-full border w-full my-2 placeholder:text-sm placeholder:italic',style)}
        placeholder={ placeholder || nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={e => setValue(prev => ({...prev,[nameKey]:e.target.value}))}
        onFocus={() =>setInvalidFields && setInvalidFields([])}
        />
        {invalidFields?.some(el => el.name === nameKey) && <small className='text-main italic'>
        {invalidFields.find(el => el.name === nameKey)?.mes}  
        </small>}
    </div>
  )
}

export default InputField