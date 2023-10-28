import React from 'react'
import usePagination from '../../Hooks/usePagination';
import PaginationItem from './PaginationItem';
const Pagination = ({totalCount}) => {
    const pagination = usePagination(totalCount,2);
  return (
    <div className='flex items-center'>
        {pagination?.map((el,index) => (
            <PaginationItem key={index}>
                {el}
            </PaginationItem>
        ))}
    </div>
  )
}

export default Pagination