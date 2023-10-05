import React,{memo} from 'react';
import { Product } from '.';
import Slider from "react-slick";


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
const CustomSlider = ({products,activedTab}) => {
  return (
    <>
        {Product &&<Slider {...settings}>
         {products?.map((el,index)=>(
          <Product
            key={index}
            pid={el.id}
            productData = {el}
            isNew={activedTab === 1 ? false : true}
          />
         ))}
        </Slider>}
    </>
  )
}

export default memo(CustomSlider)