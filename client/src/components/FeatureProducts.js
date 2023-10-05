import React,{useState,useEffect} from 'react';
import {ProductCard} from './'
import { apiGetProduct } from '../apis/product';
import banner1 from '../assets/banner_1_bottom.png';
import banner2 from '../assets/banner_2_bottom.png';
import banner3 from '../assets/banner_3_bottom.png';
import banner4 from '../assets/banner_4_bottom.png';
const FeatureProducts = () => {
    const [products,setProducts] = useState(null);

    const fetchProduct = async () =>{
        const response = await apiGetProduct({limit : 9,page : Math.round(Math.random()),totalRatings : 5})
        if(response.success) setProducts(response.products)
    }
    useEffect(()=>{
        fetchProduct();
    },[])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURE PRODUCTS</h3>
            <div className='flex flex-wrap mt-[15px] px-[-10px]'>
                {products?.map(el => (
                    <ProductCard
                    key={el._id}
                    image={el.thumb}
                    title={el.title}
                    totalRatings={el.totalRatings}
                    price={el.price}
                    />
                ))}
            </div>
            <div className='flex justify-between'>
                <img src={banner1} alt='banner 1 bottom' className='w-[50%] object-cover'/>
                <div className='flex flex-col justify-between w-[24%] gap-4 object-cover'>
                <img src={banner2} alt='banner 2 bottom'/>  
                <img src={banner3} alt='banner 3 bottom'/>
                </div>
                <img src={banner4} alt='banner 4 bottom' className='w-[24%] object-cover'/>
            </div>
        </div>
    )
}

export default FeatureProducts