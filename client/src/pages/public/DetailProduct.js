import React,{useEffect,useState,useCallback,useRef} from 'react'
import {useParams} from 'react-router-dom';
import { apiGetOneProduct,apiGetProduct } from '../../apis'; 
import { Breadcrumbd,Button,SelectQuantity,ProductExtraInfo,Productinfortion,CustomSlider } from '../../components';
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import {formatMoney,formatPrice,renderStarFromNumber} from '../../ultils/helpers';
import {productExtraInformation} from '../../ultils/contants'
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {

  const {title,pid,category} = useParams();
  
  const [Product, setProduct] = useState(null);
  const ref = useRef();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null)
  const [currentImgae, setCurrentImgae] = useState(null)
  const [updateVote, setUpdateVote] = useState(false)
  const fetchProductData = async () => {
    const response = await apiGetOneProduct(pid)
    if(response.success){
      setProduct(response.productData)
      setCurrentImgae(response.productData?.thumb)
    }
  }
  const fetchProducts = async () => {
    const response = await apiGetProduct({category});
    if(response.success) setRelatedProducts(response.products)
  }
  useEffect(()=>{
    if(pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0,0);
  },[pid])


  useEffect(()=>{
    if(pid) fetchProductData();
  },[updateVote])

  const rerender = useCallback(()=>{
    setUpdateVote(!updateVote)
  },[updateVote])

  const handleQuantity = useCallback((number)=>{
    const value = number.target.value;
    if (!isNaN(value)) {
      if (Number(value) >= 0 && Number(value) <= Product?.quantity) {
          setQuantity(Number(value));
      }
  }
  },[setQuantity,Product])


  const handleChangeQuantity = useCallback((flag)=>{
    if(flag === 'minus' && quantity === 1) return;
    if(flag === 'minus') setQuantity(prev => +prev - 1)
    if(flag === 'plus') setQuantity(next => +next + 1)
  },[quantity])

  const handleBlur = useCallback((e)=>{
    if (Number(e.target.value) === 0) {
      setQuantity(1);
  }
    ref.current.style.border = 'none';
  },[])
  const handleForcus = ()=>{
    ref.current.style.border = '2px solid #ee3131';
  }

  const handleClickImage = (e,el) => {
    e.stopPropagation()
    setCurrentImgae(el)
  }
  return (
    <div className='w-full'>
      <div className='h-[81px] flex flex-col justify-center bg-gray-100'>
        <h3 className='font-semibold text-[18px] mb-1'>{title}</h3>
        <Breadcrumbd title = {title} category = {category}/>
      </div>
      <div className='w-main mt-4 flex'>
        <div className='w-2/5 flex-col gap-4'>
          <div className='w-[458px] h-[458px] border overflow-hidden'>
          {Product?.thumb && 
          <ReactImageMagnify {...{
            smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: currentImgae,
            },
            largeImage: {
                src: currentImgae,
                width: 1200,
                height: 1800
            }
           }} />
          }
          </div>
          <div className='w-[458px]'>
            <Slider className='image-slider mt-4' {...settings}>
              {Product?.images?.map((el,index) => (
                <div className='flex w-full gap-2' key={index}>
                  <img onClick={e => handleClickImage(e,el)} src={el} alt='ảnh sản phẩm' className='h-[143px] w-[143px] cursor-pointer border object-cover'/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
          <h2 className='text-[30px] font-semibold'>{`${formatMoney(formatPrice(Product?.price))} VND`}</h2>
          </div>
          <div className='flex items-center gap-1'>
            {renderStarFromNumber(Product?.totalRatings)?.map((el,index) => (
              <span key={index}>{el}</span>
            ))}
            <span className='text-sm text-main italic'>{`(Đã bán : ${Product?.sold})`}</span>
          </div>
          <ul className='pl-4 list-square text-sm text-gray-700'>
            {Product?.description?.map((el,index) => (
              <li className='leading-6' key={index}>{el}</li>
            ))}
          </ul>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center h-[34px]'>
              <span className='font-semibold mr-3'>Số lượng :</span>
              <div ref={ref}>
                <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
                handleBlur={handleBlur}
                handleForcus={handleForcus}
                />
              </div>
              <span className='text-sm text-main ml-3'>{`${Product?.quantity} Sản phẩm có sẵn`}</span>
            </div>
            <Button fw>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className='w-1/5'>
            {productExtraInformation.map((el,index)=>(
              <ProductExtraInfo 
                key={index.id}
                icon={el.icon}
                title={el.title}
                sub={el.sub}
              />
            ))}
        </div>
      </div>

      <div className='w-main mt-4'>
        <Productinfortion 
          totalRatings={Product?.totalRatings}
          ratings={Product?.ratings}
          nameProduct={Product?.title}
          pid={Product?._id}
          rerender={rerender}
         />
      </div>
      <div className='w-main mt-4'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>CÁC SẢN PHẨM LIÊN QUAN</h3>
        <CustomSlider
        normal={true}
        products={relatedProducts}
        />
      </div>
      <div className='h-[100px] w-full'></div>
    </div>
  )
}

export default DetailProduct