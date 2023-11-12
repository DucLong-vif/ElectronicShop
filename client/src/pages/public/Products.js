import React,{useEffect,useState,useCallback} from 'react'
import {useParams,useSearchParams,useNavigate,createSearchParams} from 'react-router-dom'
import {Breadcrumbd,Product,SearchItems, InputSelect, Pagination} from '../../components';
import { apiGetProduct } from '../../apis';
import Masonry from 'react-masonry-css';
import { sorts } from '../../ultils/contants';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState('')
  const [params] = useSearchParams();

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProduct(queries)
    if(response.success) setProducts(response)
  }
  const {category } = useParams();
  useEffect(()=>{
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if(queries.to && queries.from){
      priceQuery = {
        $and : [
          {price : {gte : queries.from}},
          {price : {lte : queries.to}}
        ]
      }
      delete queries.price
    }else{
      if(queries.from) queries.price = {gte : queries.from};
      if(queries.to) queries.price = {lte : queries.to};
    }
    delete queries.from;
    delete queries.to;
    const q = {...priceQuery,...queries}

    fetchProductsByCategory(q);
    window.scrollTo(0,0)
  },[params])
  const changeActiveFilter = useCallback((name)=>{
    if(activeClick === name ) setActiveClick(null)
    else setActiveClick(name)
  },[activeClick])
  const changeValue = useCallback((value)=>{
    setSort(value)
  },[])
  useEffect(()=>{
    if(sort){
      navigate({
        pathname : `/${category}`,
        search : createSearchParams({sort}).toString(),
      })
    }
  },[sort,navigate,category])
  return (
    <div className='w-full'>
      <div className='h-[81px] flex flex-col justify-center bg-gray-100 pl-2'>
        <h3 className='font-semibold text-[18px] mb-1 uppercase'>{category}</h3>
        <Breadcrumbd  category = {category}/>
      </div>
      <div className='w-main flex border p-4 justify-between mt-7 m-auto'>
        <div className='w-4/5 flex-auto flex flex-col gap-3'>
          <span className='font-semibold text-sm'>BỘ LỌC TÌM KIẾM</span>
          <div className='flex items-center gap-4'>
            <SearchItems
              name = 'price'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type='input'
            />
            <SearchItems
              name = 'color'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-3'>
          <span className='font-semibold text-sm'>SẮP XẾP THEO</span>
          <div className='w-full '>
            <InputSelect
              value={sort}
              options={sorts}
              changeValue={changeValue}
            />
          </div>
        </div>
      </div> 


      <div className='mt-6 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column">
          {products?.products?.map(el => (
            <Product
              key={el._id}
              pid={el.id}
              productData={el}
              normal={true}
            />
          ))}
        </Masonry>
      </div>
      <div className=' my-4 flex justify-center'>
        <Pagination
          totalCount={products?.counts}   
        />
      </div>
      <div className='h-[500px]'></div>
    </div>
  )
}

export default Products