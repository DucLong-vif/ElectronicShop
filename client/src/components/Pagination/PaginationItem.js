import React from "react";
import {useSearchParams , useNavigate, createSearchParams, useLocation} from 'react-router-dom'
import clsx from 'clsx'
const PaginationItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  //const ref = useRef();
  const hanlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if(Number(children)) queries.page = children;

    navigate({
      pathname : location.pathname,
      search : createSearchParams(queries).toString(),
    })
  }
  // const handleForcus = () => {
  //   ref.current.style.border = '2px solid #ee3131';
  //   //ref.current.style.border = 'border-radius';
  // }
  // const handleBlur = useCallback(()=>{
  //   ref.current.style.border = 'none';
  // },[])
  return (
    <button 
      className={clsx('w-10 h-10 flex justify-center',!Number(children) && 'items-end pb-2',
      Number(children) && 'items-center hover:rounded-full hover:bg-gray-300',
      +params.get('page') === +children && 'rounded-full bg-main border border-gray-800',
      !+params.get('page') && +children === 1 && 'rounded-full bg-main border border-gray-800'
      )}
      onClick={hanlePagination}
      type="button"
      disabled={!Number(children)}
      //ref={ref}
      // onFocus={handleForcus}
      // onBlur={handleBlur}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
