import React from 'react'
import usePagination from '../../Hooks/usePagination';
import PaginationItem from './PaginationItem';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({totalCount}) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount,params.get('page') || 1);
  const range = () => {
    const currentPage = +params.get('page');
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const start = ((currentPage - 1) * pageSize) + 1;
    const end = Math.min(currentPage * pageSize,totalCount);
    return `${start} - ${end}`
  }
  return (
   <div className='flex w-full justify-between items-center'>
    {!+params.get('page') ? 
      <span className='flex justify-start text-sm italic'>{`Hiển thị sản phẩm từ : 1 - ${Math.min(+process.env.REACT_APP_PRODUCT_LIMIT,totalCount) || 10} của ${totalCount} sản phẩm`}</span>
      : ''
    }
    {+params.get('page') ? 
      <span className='flex justify-start text-sm italic'>{`Hiển thị sản phẩm từ : ${range()} của ${totalCount} sản phẩm`}</span> : ''
    }
    <div className='flex items-center'>
        {pagination?.map((el,index) => (
            <PaginationItem key={index}>
                {el}
            </PaginationItem>
        ))}
    </div>
  </div>
  )
}

export default Pagination