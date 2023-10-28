import { useMemo } from "react";
import { generateRange } from "../ultils/helpers";
import {BiDotsHorizontalRounded} from 'react-icons/bi';
const usePagination = (totalPrudctionCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const paginationCount = Math.ceil(totalPrudctionCount / pageSize);
    const totalPagination = siblingCount + 5;
    if (paginationCount <= totalPagination){
        return generateRange(1, paginationCount);
    }

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BiDotsHorizontalRounded/>, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BiDotsHorizontalRounded/>, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);
    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, <BiDotsHorizontalRounded/>, ...middleRange,<BiDotsHorizontalRounded/>, paginationCount];
    }
  }, [totalPrudctionCount, currentPage, siblingCount]);
  return paginationArray;
};

export default usePagination;

//firts + last + current  + sibling + 2*DOTS
// min = 6 => sibling + 5;
//totalPagination  : 58, limitProduct = 10 => 5.8  = 6
//totalPaginationITem  : sibling + 5 = 6;
//sibling  = 1;
//[1,2,3,4,5,6]
//[1,...,6,7,8,9,10]
//[1,2,3,4,...,10]
//[1,...,6,7,8,...,10]
