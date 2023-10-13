import React from 'react'
import {useParams} from 'react-router-dom';
// import { apiGetOneProduct } from '../../apis';

const DetailProduct = () => {

  const {title,pid} = useParams();


  // const fetchProductData = async()=>{
  //   const response = await apiGetOneProduct(pid)
  //   console.log(response)
  // }

  // useEffect(()=>{
  //   if(pid) fetchProductData();
  // },[pid,fetchProductData]);

  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center bg-gray-100'>
        <h3>{title}{pid}</h3>
      </div>
    </div>
  )
}

export default DetailProduct