import React,{useCallback, useRef} from "react";
import {useSearchParams , useNavigate, useParams, createSearchParams} from 'react-router-dom'
const PaginationItem = ({ children }) => {
  const navigate = useNavigate();
  const {category} = useParams();
  const [params] = useSearchParams();
  const ref = useRef();
  const hanlePagination = () => {
    let param = [];
    for(let i of params.entries()) param.push(i);
    const queries = {};
    for(let i of param) queries[i[0]] = i[1];
    if(Number(children)) queries.page = children;

    navigate({
      pathname : `/${category}`,
      search : createSearchParams(queries).toString(),
    })
  }
  const handleForcus = () => {
    ref.current.style.border = '2px solid #ee3131';
    //ref.current.style.border = 'border-radius';
  }
  const handleBlur = useCallback(()=>{
    ref.current.style.border = 'none';
  },[])
  return (
    <button 
      className={`w-10 h-10 flex items-center rounded-full justify-center hover:rounded-full hover:bg-gray-300`}
      onClick={hanlePagination}
      type="button"
      disabled={!Number(children)}
      ref={ref}
      onFocus={handleForcus}
      onBlur={handleBlur}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
