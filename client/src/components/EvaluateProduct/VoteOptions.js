import React,{memo,useRef,useEffect,useState} from 'react';
import { voteOptions } from '../../ultils/contants';
import {AiFillStar} from 'react-icons/ai';
import {Button} from '../'
const VoteOptions = ({nameProduct,handleSumitVoteOption}) => {
    const ref = useRef();
    const [chosenScore, setChosenScore] = useState(null);
    const [comment, setComment] = useState('');
    const [score, setScore] = useState(null)
    useEffect(() => {
        ref.current.scrollIntoView({block : 'center',bihavior : 'smooth'});
    },[]);
  return (
    <div onClick={e => e.stopPropagation()} ref={ref} className='bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center'>
        <img src={`https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/Voucher.gif`} alt='' 
            className='w-[300px] object-cover my-8'
        />
        <h2 className='text-center text-medium text-lg font-semibold'>{`Đánh giá sản phẩm : ${nameProduct}`}</h2>
        <textarea 
            className='form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm'
            placeholder='Gửi lại đánh giá'
            value={comment}
            onChange={e => setComment(e.target.value)}
        ></textarea>
        <div className='w-full flex flex-col gap-4'>
            <p className='text-center'>Bạn cảm thấy sản phẩm này như thế nào?</p>
            <div className='flex items-center justify-center gap-4'>
                {voteOptions.map(el => (
                    <div 
                        className='w-1/5 h-[80px] bg-gray-100 cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2' 
                        key={el.id}
                        onClick={() => {
                            setChosenScore(el.id)
                            setScore(el.id)
                        }}
                    >
                        {(Number(chosenScore) && chosenScore >= el.id) ? <AiFillStar color='orange'/> : <AiFillStar color='gray'/>}
                        <span className='text-center text-sm'>{el.text}</span>
                    </div>
                ))}
            </div>
        </div>
        <Button
            fw
            handlOnclick={() => handleSumitVoteOption({comment,score})}
         >
            Gửi đánh giá
        </Button>
    </div>
  )
}

export default memo(VoteOptions)