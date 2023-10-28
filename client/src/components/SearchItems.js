import React,{memo,useState,useEffect,useCallback} from 'react'
import icons from '../ultils/icons';
import { colors } from '../ultils/contants';
import {createSearchParams,useNavigate,useParams} from 'react-router-dom';
import { apiGetProduct } from '../apis';
import {Button} from './'
const {AiOutlineDown} = icons;

const SearchItems = ({name,activeClick,changeActiveFilter,type = 'checkbox'}) => {
   const navigate = useNavigate();
   const {category} = useParams();
  const [selected, setSelected] = useState([]);
  const [checkFormTo, setCheckFormTo] = useState('')
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from : '',
    to : ''
  })
  const handleSelecte = (e) => {
    const alreadyEl = selected.find(el => el === e.target.value)
    if(alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
    else setSelected(prev => [...prev,e.target.value])
    changeActiveFilter(null)
  }
  const fetchBestPriceProduct = async () =>{
    const response = await apiGetProduct({sort : '-price',limit : 1})
    if(response.success) setBestPrice(response.products[0]?.price)
  }
  useEffect(() =>{
    if(selected.length > 0){
      navigate({
        pathname : `/${category}`,
        search:createSearchParams({
          color : selected.join(',')
        }).toString(),
      });
    }else{
      navigate(`/${category}`)
    }
  },[selected,category,navigate]);
  useEffect(()=>{
    if(type === 'input') {
      fetchBestPriceProduct();
    }
  },[type])



  const hanleSubmit = useCallback(() => {
    if(price.from > price.to && price.to){
      setCheckFormTo('Không được để giá đấu lớn hơn giá cuối');
      return;
    }
    else{
      setCheckFormTo('')
      const data = {}
      if(Number(price.from) > 0) data.from = price.from;
      if(Number(price.to) > 0) data.to = price.to;
      navigate({
        pathname : `/${category}`,
        search : createSearchParams(data).toString(),
      })
    }
  },[price,navigate,category])
  return (
    <div 
    className='p-3 cursor-pointer text-gray-600 text-xs relative gap-6 border border-gray-800 flex justify-between items-center'
    onClick={() => changeActiveFilter(name)}
    >
        <span className='capitalize'>{name}</span>
        <AiOutlineDown/>
        {activeClick === name &&
        <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 bg-white border min-w-[250px]'>
          {type === 'checkbox' && 
            <div>
              <div className='p-4 items-center flex justify-between gap-8'>
                <span className='whitespace-nowrap'>{`Đã chọn : ${selected.length}`}</span>
                <span onClick={e => {
                  e.stopPropagation();
                  setSelected([])
                }} className='underline cursor-pointer hover:text-main'>Trở lại</span>
              </div>   
              <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3'>
                {colors.map((el,index)=>(
                  <div key={index} className='flex items-center gap-4'>
                    <input 
                      type='checkbox'
                      className='form-checkbox'
                      value={el}
                      onChange={handleSelecte}
                      id={el}
                      checked = {selected.some(selectedItem => selectedItem === el)}
                      />
                    <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                  </div>
                ))}
              </div>
            </div> 
          }
          {type === 'input' && 
            <div onClick={e => e.stopPropagation()} >
               <div className='p-4 items-center flex justify-between gap-8'>
                <span className='whitespace-nowrap'>{`GIÁ CAO NHẤT LÀ : ${Number(bestPrice).toLocaleString()} VND`}</span>
                <span onClick={e => {
                  e.stopPropagation();
                  setPrice({from : '',to : ''})
                  changeActiveFilter(null)
                }} className='underline cursor-pointer hover:text-main'>Trở lại</span>
              </div>  
              <div className='flex items-center p-2 gap-2'>
                <div className='flex items-center gap-2'>
                  <label htmlFor='Từ'>Từ</label>
                  <input 
                    className='form-input' 
                    type='number' id='form' 
                    placeholder='Từ'
                    value={price.from}
                    onChange={e => setPrice(prev => ({...prev,from : e.target.value}))}
                    />
                </div>
                <div className='flex items-center gap-2'>
                  <label htmlFor='Đến'>Đến</label>
                  <input 
                    className='form-input' 
                    type='number' id='to' 
                    placeholder='Đến'
                    value={price.to}
                    onChange={e => setPrice(prev => ({...prev,to : e.target.value}))}
                    />
                </div>
              </div>
              <div className='flex items-center justify-center flex-col'>
                <span className=' flex items-center justify-center gap-1 text-main'>{checkFormTo}</span>
                <Button
                  handlOnclick = {hanleSubmit}
                >
                  ÁP DỤNG
                </Button>
              </div>
            </div>

          }
        </div>
        }
    </div>
  )
}

export default memo(SearchItems)