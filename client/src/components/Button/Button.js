import React,{memo} from 'react'

const Button = ({children,handlOnclick,style,fw, type = 'button'}) => {
  return (
    <div className='w-full flex items-center justify-center'>
        <button
        type={type}
        className={style ? style : `px-4 py-2 rounded-md text-white my-2 bg-main text-semibold ${fw ? 'w-full' :'w-fit' }`}
        onClick={() =>{
            handlOnclick && handlOnclick();
        }}
        >
            {children}   
        </button>
    </div>
  )
}

export default memo(Button)