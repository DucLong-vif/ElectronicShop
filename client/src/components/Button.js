import React,{memo} from 'react'

const Button = ({name,handlOnclick,style,iconBefore,iconAfter,fw}) => {
  return (
    <div className='w-full flex items-center justify-center'>
        <button
        type='button'
        className={style ? style : `px-4 py-2 rounded-md text-white my-2 bg-main text-semibold ${fw ? 'w-full' :'w-fit' }`}
        onClick={() =>{
            handlOnclick && handlOnclick();
        }}
        >
            {iconBefore}
            <span>{name}</span>
            {iconAfter}
        </button>
    </div>
  )
}

export default memo(Button)