import React from 'react'
import {Sidebar,Banner,BestSeller,DealDaily,FeatureProducts,CustomSlider} from '../../components';
import {useSelector} from 'react-redux' ;
import icons from '../../ultils/icons';

const {IoIosArrowForward} = icons;
const Home = () => {
  const {newProducts} = useSelector(state => state.products)
  const {categories} = useSelector(state => state.app)
  // console.log(categories)
  return (
    <>
      <div className='w-main flex'>
          <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
              <Sidebar/>
              <DealDaily/>
          </div>
          <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
              <Banner/>
              <BestSeller/>
          </div>
      </div>
      <div className='my-8'>
        <FeatureProducts/>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
        <div className=' mt-4 mx-[-10px]'>
          <CustomSlider
            products={newProducts}
          />
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
        <div className='flex flex-wrap gap-4 mt-4'>
          {categories?.slice(0,6)?.map(el=>(
            <div
              key={el._id}
              className='w-[396px]'
            >
              <div className='border flex p-4 gap-4 min-h-[190px]'>
                <img src={el?.image} alt='' className=' flex-1 w-[144px] h-[129px] object-cover'/>
                <div className='flex-1 text-gray-800'>
                  <h4 className='font-semibold uppercase'>{el.title}</h4>
                  <ul className='text-sm'>
                    {el?.brand?.map(item=>(
                      <span key={item} className='flex gap-1 items-center text-gray-600'>
                        <IoIosArrowForward size={14}/>
                        <li key={item}>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className='w-full my-8'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>BLOG POST</h3>
      </div>
    </>
  )
}

export default Home