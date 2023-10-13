import React from 'react'

const InputField = ({value,setValue,nameKey,type,invalidFields, setInvalidFields}) => {
  return (
    <div className='w-full flex flex-col relative'>
        {value.trim() !== '' && <label className='text-[14px]' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
        <input
        type={type||'text'}
        className='p-4 py-1 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic'
        placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={e => setValue(prev => ({...prev,[nameKey]:e.target.value}))}
        onFocus={() =>setInvalidFields([])}
        />
        {invalidFields?.some(el => el.name === nameKey) && <small className='text-main italic'>
        {invalidFields.find(el => el.name === nameKey)?.mes}  
        </small>}
    </div>
  )
}

export default InputField